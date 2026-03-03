const Account = require('../models/Account');
const Transaction = require('../models/Transaction');

// @desc    Get dashboard summary for logged-in user
// @route   GET /api/dashboard/summary
exports.getDashboardSummary = async (req, res) => {
  try {
    const accounts = await Account.find({ userId: req.user });
    const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

    // Get current month's expenses (debits)
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const transactions = await Transaction.find({
      fromAccount: { $in: accounts.map(a => a._id) },
      type: 'debit',
      date: { $gte: startOfMonth }
    });

    const monthlyExpenses = transactions.reduce((sum, t) => sum + t.amount, 0);
    const transactionCount = transactions.length;

    res.json({
      balance: totalBalance,
      expenses: monthlyExpenses,
      transactions: transactionCount
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};