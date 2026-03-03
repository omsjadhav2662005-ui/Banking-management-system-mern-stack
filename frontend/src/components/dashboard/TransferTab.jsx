import { useState, useEffect } from 'react';
import { useNotification } from '../../contexts/NotificationContext';
import { getMyAccounts, transferMoney } from '../../services/api';

export default function TransferTab() {
  const [accounts, setAccounts] = useState([]);
  const [formData, setFormData] = useState({
    fromAccount: '',
    toAccount: '',
    amount: '',
    description: '',
    transferDate: '',
    transferType: 'instant',
    saveAsTemplate: false
  });
  const showNotification = useNotification();

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    try {
      const { data } = await getMyAccounts();
      setAccounts(data);
      if (data.length > 0) {
        setFormData(prev => ({ ...prev, fromAccount: data[0]._id }));
      }
    } catch (err) {
      showNotification('Failed to load accounts', 'error');
    }
  };

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fromAccount || !formData.toAccount || !formData.amount) {
      showNotification('Please fill all required fields', 'error');
      return;
    }
    try {
      await transferMoney({
        fromAccountId: formData.fromAccount,
        toAccountNumber: formData.toAccount,
        amount: parseFloat(formData.amount),
        description: formData.description,
        type: formData.transferType
      });
      showNotification(`Transfer of $${formData.amount} initiated successfully!`, 'success');
      // Reset amount and description, keep accounts
      setFormData(prev => ({
        ...prev,
        amount: '',
        description: '',
        transferDate: '',
        saveAsTemplate: false
      }));
    } catch (err) {
      showNotification(err.response?.data?.message || 'Transfer failed', 'error');
    }
  };

  const calculateFee = () => {
    const amount = parseFloat(formData.amount);
    if (amount && amount > 0) {
      const fee = amount * 0.01;
      showNotification(`Transfer fee: $${fee.toFixed(2)}`, 'info');
    } else {
      showNotification('Enter an amount first', 'warning');
    }
  };

  return (
    <>
      <h3 className="text-xl font-heading font-semibold text-secondary mb-6">Transfer Funds</h3>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="fromAccount" className="block text-sm font-medium text-secondary mb-2">From Account</label>
            <select id="fromAccount" value={formData.fromAccount} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 form-input focus:outline-none focus:border-primary">
              {accounts.map(acc => (
                <option key={acc._id} value={acc._id}>
                  {acc.accountType} (***{acc.accountNumber.slice(-4)}) - ${acc.balance.toFixed(2)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="toAccount" className="block text-sm font-medium text-secondary mb-2">To Account</label>
            <div className="relative">
              <input type="text" id="toAccount" value={formData.toAccount} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 form-input focus:outline-none focus:border-primary" placeholder="Enter account number" required />
              <button type="button" className="absolute right-3 top-3 text-primary hover:text-primary-dark">
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-secondary mb-2">Amount</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <input type="number" id="amount" value={formData.amount} onChange={handleChange} className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-300 form-input focus:outline-none focus:border-primary" placeholder="0.00" min="1" step="0.01" required />
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-secondary mb-2">Description</label>
          <input type="text" id="description" value={formData.description} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 form-input focus:outline-none focus:border-primary" placeholder="Enter transaction description" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="transferDate" className="block text-sm font-medium text-secondary mb-2">Transfer Date</label>
            <input type="date" id="transferDate" value={formData.transferDate} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 form-input focus:outline-none focus:border-primary" />
          </div>

          <div>
            <label htmlFor="transferType" className="block text-sm font-medium text-secondary mb-2">Transfer Type</label>
            <select id="transferType" value={formData.transferType} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 form-input focus:outline-none focus:border-primary">
              <option value="instant">Instant Transfer</option>
              <option value="scheduled">Scheduled Transfer</option>
              <option value="recurring">Recurring Transfer</option>
            </select>
          </div>
        </div>

        <div className="flex items-center">
          <input type="checkbox" id="saveAsTemplate" checked={formData.saveAsTemplate} onChange={handleChange} className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" />
          <label htmlFor="saveAsTemplate" className="ml-2 text-sm text-secondary-light">Save as template for future transfers</label>
        </div>

        <div className="flex space-x-4">
          <button type="submit" className="bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200">
            <i className="fas fa-paper-plane mr-2"></i>Transfer Now
          </button>
          <button type="button" onClick={calculateFee} className="bg-white border border-gray-300 hover:border-primary text-secondary hover:text-primary font-semibold py-3 px-6 rounded-lg transition-all duration-200">
            <i className="fas fa-calculator mr-2"></i>Calculate Fee
          </button>
        </div>
      </form>
    </>
  );
}