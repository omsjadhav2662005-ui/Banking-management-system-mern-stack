import { useState } from 'react';
import { useNotification } from '../../contexts/NotificationContext';
import { depositMoney } from '../../services/api';

export default function DepositTab() {
  const [amount, setAmount] = useState('');
  const [password, setPassword] = useState('');
  const showNotification = useNotification();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) {
      showNotification('Please enter a valid amount', 'error');
      return;
    }
    if (!password) {
      showNotification('Please enter your password', 'error');
      return;
    }

    try {
      const { data } = await depositMoney({
        amount: parseFloat(amount),
        password
      });
      showNotification(`Successfully deposited $${amount}`, 'success');
      setAmount('');
      setPassword('');
    } catch (err) {
      showNotification(err.response?.data?.message || 'Deposit failed', 'error');
    }
  };

  return (
    <div>
      <h3 className="text-xl font-heading font-semibold text-secondary mb-6">Deposit Funds</h3>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
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
            placeholder="Enter your registration password"
            required
          />
          <p className="text-xs text-secondary-light mt-1">
            Use the same password you created during registration.
          </p>
        </div>

        <button
          type="submit"
          className="bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
        >
          <i className="fas fa-check-circle mr-2"></i>Confirm Deposit
        </button>
      </form>
    </div>
  );
}