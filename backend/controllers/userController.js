const User = require('../models/User');
const Account = require('../models/Account');

// @desc    Create a new user (admin function)
// @route   POST /api/users
exports.createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role, accountType, initialDeposit, permissions } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

    // Create user
    user = new User({ firstName, lastName, email, password, role: role || 'user' });
    await user.save();

    // Create account
    const accountNumber = 'ACC-' + Date.now() + Math.floor(Math.random() * 1000);
    const account = new Account({
      accountNumber,
      accountType: accountType || 'personal',
      userId: user._id,
      balance: initialDeposit || 0,
      permissions: permissions || { transfer: false, withdraw: false, viewHistory: true }
    });
    await account.save();

    res.status(201).json({ message: 'User created successfully', user, account });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all users (for admin)
// @route   GET /api/users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};