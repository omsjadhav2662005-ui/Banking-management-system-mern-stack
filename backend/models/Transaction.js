const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  fromAccount: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
  toAccount: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
  amount: { type: Number, required: true },
  description: { type: String, default: '' },
  type: { type: String, enum: ['credit', 'debit'], required: true },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'completed' },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', TransactionSchema);