import { useState } from 'react';

export default function DepositModal({ isOpen, onClose, onDeposit }) {
  const [amount, setAmount] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    if (!password) {
      alert('Please enter your password');
      return;
    }
    onDeposit(parseFloat(amount), password);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-heading font-semibold text-secondary mb-6">Deposit Money</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="depositAmount" className="block text-sm font-medium text-secondary mb-2">
              Amount to Deposit
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">$</span>
              </div>
              <input
                type="number"
                id="depositAmount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-300 form-input focus:outline-none focus:border-primary"
                placeholder="0.00"
                min="1"
                step="0.01"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="depositPassword" className="block text-sm font-medium text-secondary mb-2">
              Account Password
            </label>
            <input
              type="password"
              id="depositPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 form-input focus:outline-none focus:border-primary"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200"
            >
              <i className="fas fa-check mr-2"></i>Confirm Deposit
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-white border border-gray-300 hover:border-primary text-secondary hover:text-primary font-semibold py-3 px-4 rounded-lg transition-all duration-200"
            >
              <i className="fas fa-times mr-2"></i>Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}