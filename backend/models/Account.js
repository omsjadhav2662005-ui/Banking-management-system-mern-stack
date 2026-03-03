const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
  accountNumber: { type: String, required: true, unique: true },
  accountType: { type: String, enum: ['personal', 'business', 'premium'], default: 'personal' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  balance: { type: Number, default: 0 },
  permissions: {
    transfer: { type: Boolean, default: false },
    withdraw: { type: Boolean, default: false },
    viewHistory: { type: Boolean, default: true }
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Account', AccountSchema);