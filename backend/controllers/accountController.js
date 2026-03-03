const User = require('../models/User');
const Account = require('../models/Account');
const Transaction = require('../models/Transaction');
const bcrypt = require('bcryptjs');

// @desc    Get all accounts for logged-in user
// @route   GET /api/accounts
exports.getMyAccounts = async (req, res) => {
  try {
    const accounts = await Account.find({ userId: req.user });
    res.json(accounts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get a single account by ID (ensure it belongs to user)
// @route   GET /api/accounts/:id
exports.getAccountById = async (req, res) => {
  try {
    const account = await Account.findById(req.params.id);
    if (!account) return res.status(404).json({ message: 'Account not found' });
    if (account.userId.toString() !== req.user) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    res.json(account);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Deposit money into user's account (password required)
// @route   POST /api/accounts/deposit
exports.deposit = async (req, res) => {
  try {
    const { amount, password } = req.body;
    const userId = req.user;

    // Find user to verify password
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid password' });

    // Find user's primary account (first account)
    const account = await Account.findOne({ userId });
    if (!account) return res.status(404).json({ message: 'No account found for this user' });

    // Update balance
    account.balance += amount;
    await account.save();

    // Create a credit transaction
    const transaction = new Transaction({
      fromAccount: account._id,
      toAccount: account._id,
      amount,
      description: 'Cash Deposit',
      type: 'credit',
      status: 'completed'
    });
    await transaction.save();

    res.json({ message: 'Deposit successful', balance: account.balance });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};