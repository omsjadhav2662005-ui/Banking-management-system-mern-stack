const Transaction = require('../models/Transaction');
const Account = require('../models/Account');
const mongoose = require('mongoose');

// @desc    Transfer money between accounts
// @route   POST /api/transactions/transfer
exports.transferMoney = async (req, res) => {
  try {
    const { fromAccountId, toAccountNumber, amount, description } = req.body;

    // 1. Find destination account by account number
    const toAccount = await Account.findOne({ accountNumber: toAccountNumber });
    if (!toAccount) {
      return res.status(404).json({ message: 'Destination account not found' });
    }

    // 2. Atomically deduct from source account if balance is sufficient
    const fromAccount = await Account.findOneAndUpdate(
      {
        _id: fromAccountId,
        userId: req.user,               // ensure ownership
        balance: { $gte: amount }        // only update if enough balance
      },
      { $inc: { balance: -amount } },   // deduct
      { new: true }                      // return updated document
    );

    if (!fromAccount) {
      // Check why it failed
      const existing = await Account.findById(fromAccountId);
      if (!existing) {
        return res.status(404).json({ message: 'Source account not found' });
      }
      if (existing.userId.toString() !== req.user) {
        return res.status(403).json({ message: 'Unauthorized' });
      }
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    // 3. Add amount to destination account
    toAccount.balance += amount;
    await toAccount.save();

    // 4. Create transaction records
    const debitTransaction = new Transaction({
      fromAccount: fromAccount._id,
      toAccount: toAccount._id,
      amount,
      description,
      type: 'debit',
      status: 'completed'
    });
    const creditTransaction = new Transaction({
      fromAccount: fromAccount._id,
      toAccount: toAccount._id,
      amount,
      description,
      type: 'credit',
      status: 'completed'
    });

    await debitTransaction.save();
    await creditTransaction.save();

    res.json({
      message: 'Transfer successful',
      transaction: debitTransaction
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
// @desc    Get transaction history for a specific account
// @route   GET /api/transactions/history/:accountId
exports.getTransactionHistory = async (req, res) => {
  try {
    const accountId = req.params.accountId;
    // Verify account belongs to user
    const account = await Account.findById(accountId);
    if (!account) return res.status(404).json({ message: 'Account not found' });
    if (account.userId.toString() !== req.user) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const transactions = await Transaction.find({
      $or: [{ fromAccount: accountId }, { toAccount: accountId }]
    })
      .populate('fromAccount', 'accountNumber accountType')
      .populate('toAccount', 'accountNumber accountType')
      .sort({ date: -1 })
      .limit(50); // pagination could be added

    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};