import { useState, useEffect } from 'react';
import { useNotification } from '../../contexts/NotificationContext';
import { getMyAccounts, getTransactionHistory } from '../../services/api';

export default function TransactionHistoryTab() {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const showNotification = useNotification();

  useEffect(() => {
    loadAccounts();
  }, []);

  useEffect(() => {
    if (selectedAccount) {
      loadHistory(selectedAccount);
    }
  }, [selectedAccount]);

  const loadAccounts = async () => {
    try {
      const { data } = await getMyAccounts();
      setAccounts(data);
      if (data.length > 0) {
        setSelectedAccount(data[0]._id);
      }
    } catch (err) {
      showNotification('Failed to load accounts', 'error');
    }
  };

  const loadHistory = async (accountId) => {
    setLoading(true);
    try {
      const { data } = await getTransactionHistory(accountId);
      setTransactions(data);
    } catch (err) {
      showNotification('Failed to load transaction history', 'error');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getStatusClass = (status) => {
    switch(status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return '';
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h3 className="text-xl font-heading font-semibold text-secondary">Transaction History</h3>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <select
            value={selectedAccount}
            onChange={(e) => setSelectedAccount(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary"
          >
            {accounts.map(acc => (
              <option key={acc._id} value={acc._id}>
                {acc.accountType} (***{acc.accountNumber.slice(-4)})
              </option>
            ))}
          </select>
          <button className="bg-white border border-gray-300 hover:border-primary text-secondary hover:text-primary font-semibold py-2 px-4 rounded-lg transition-all duration-200 text-sm">
            <i className="fas fa-download mr-2"></i>Export
          </button>
          <button className="bg-white border border-gray-300 hover:border-primary text-secondary hover:text-primary font-semibold py-2 px-4 rounded-lg transition-all duration-200 text-sm">
            <i className="fas fa-filter mr-2"></i>Filter
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading transactions...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-secondary">Date</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-secondary">Description</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-secondary">Account</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-secondary">Amount</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-secondary">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(tx => {
                const amount = tx.type === 'debit' ? -tx.amount : tx.amount;
                const amountClass = amount >= 0 ? 'text-success' : 'text-danger';
                const accountDisplay = tx.fromAccount?.accountNumber ? `***${tx.fromAccount.accountNumber.slice(-4)}` : '';
                return (
                  <tr key={tx._id} className="border-b border-gray-100 table-row-hover">
                    <td className="py-3 px-4 text-sm text-secondary-light">{formatDate(tx.date)}</td>
                    <td className="py-3 px-4 text-sm text-secondary">{tx.description || 'Transfer'}</td>
                    <td className="py-3 px-4 text-sm text-secondary-light">{accountDisplay}</td>
                    <td className={`py-3 px-4 text-sm font-medium ${amountClass}`}>
                      {amount >= 0 ? '+' : '-'}${Math.abs(amount).toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(tx.status)}`}>
                        {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                );
              })}
              {transactions.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-secondary-light">No transactions found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-6 flex justify-center">
        <button className="bg-white border border-primary text-primary hover:bg-primary hover:text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200">
          <i className="fas fa-sync-alt mr-2"></i>Load More Transactions
        </button>
      </div>
    </>
  );
}