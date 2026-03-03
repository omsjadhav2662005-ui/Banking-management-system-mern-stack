import { useState, useEffect } from 'react';
import { useNotification } from '../contexts/NotificationContext';
import CreateUserTab from '../components/dashboard/CreateUserTab';
import TransferTab from '../components/dashboard/TransferTab';
import TransactionHistoryTab from '../components/dashboard/TransactionHistoryTab';
import { getDashboardSummary } from '../services/api';
import DepositTab from '../components/dashboard/DepositTab';


export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('create-user');
  const [summary, setSummary] = useState({ balance: 0, expenses: 0, transactions: 0 });
  const showNotification = useNotification();

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      const { data } = await getDashboardSummary();
      setSummary(data);
    } catch (err) {
      showNotification('Failed to load dashboard summary', 'error');
    }
  };

  const tabs = [
    { id: 'create-user', label: 'Create User', icon: 'fa-user-plus' },
    { id: 'transfer-money', label: 'Transfer Money', icon: 'fa-exchange-alt' },
    { id: 'transaction-history', label: 'Transaction History', icon: 'fa-history' },
    { id: 'deposit', label: 'Deposit', icon: 'fa-money-bill-wave' } // new tab
  ];

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-secondary">Dashboard</h1>
        <p className="text-secondary-light">Welcome back! Here's your banking overview.</p>
      </div>

      {/* Account Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm text-secondary-light">Total Balance</div>
              <div className="text-2xl font-bold text-secondary">${summary.balance.toFixed(2)}</div>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
              <i className="fas fa-wallet text-success text-xl"></i>
            </div>
          </div>
          <div className="text-sm text-secondary-light">+2.5% from last month</div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm text-secondary-light">Monthly Expenses</div>
              <div className="text-2xl font-bold text-secondary">${summary.expenses.toFixed(2)}</div>
            </div>
            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">
              <i className="fas fa-arrow-up text-danger text-xl"></i>
            </div>
          </div>
          <div className="text-sm text-secondary-light">+1.2% from last month</div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm text-secondary-light">Recent Transactions</div>
              <div className="text-2xl font-bold text-secondary">{summary.transactions}</div>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
              <i className="fas fa-exchange-alt text-info text-xl"></i>
            </div>
          </div>
          <div className="text-sm text-secondary-light">This month</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-card mb-8">
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 font-medium transition-colors duration-200 ${activeTab === tab.id
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-secondary hover:text-primary'
                  }`}
              >
                <i className={`fas ${tab.icon} mr-2`}></i>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'create-user' && <CreateUserTab />}
          {activeTab === 'transfer-money' && <TransferTab />}
          {activeTab === 'transaction-history' && <TransactionHistoryTab />}
          {activeTab === 'deposit' && <DepositTab />}

        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-card p-6">
        <h3 className="text-xl font-heading font-semibold text-secondary mb-6">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center justify-center p-4 rounded-lg border border-gray-200 hover:border-primary hover:bg-red-50 transition-all duration-200">
            <i className="fas fa-qrcode text-primary text-2xl mb-2"></i>
            <span className="text-sm font-medium text-secondary">QR Pay</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 rounded-lg border border-gray-200 hover:border-primary hover:bg-red-50 transition-all duration-200">
            <i className="fas fa-file-invoice-dollar text-primary text-2xl mb-2"></i>
            <span className="text-sm font-medium text-secondary">Pay Bills</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 rounded-lg border border-gray-200 hover:border-primary hover:bg-red-50 transition-all duration-200">
            <i className="fas fa-chart-pie text-primary text-2xl mb-2"></i>
            <span className="text-sm font-medium text-secondary">Analytics</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 rounded-lg border border-gray-200 hover:border-primary hover:bg-red-50 transition-all duration-200">
            <i className="fas fa-cog text-primary text-2xl mb-2"></i>
            <span className="text-sm font-medium text-secondary">Settings</span>
          </button>
        </div>
      </div>
    </>
  );
}