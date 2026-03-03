const User = require('../models/User');
const Account = require('../models/Account');
const jwt = require('jsonwebtoken');
const Transaction = require('../models/Transaction');
const bcrypt = require('bcryptjs');


// @desc    Register a new user
// @route   POST /api/auth/register
exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, accountType } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

    user = new User({ firstName, lastName, email, password });
    await user.save();

    // Create a default account for the user
    const accountNumber = 'ACC-' + Date.now() + Math.floor(Math.random() * 1000);
    const account = new Account({
      accountNumber,
      accountType: accountType || 'personal',
      userId: user._id,
      balance: 0,
      permissions: { transfer: true, withdraw: true, viewHistory: true } // default permissions
    });
    await account.save();

    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

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
      fromAccount: account._id,   // self
      toAccount: account._id,     // self
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