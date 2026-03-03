import { useState } from 'react';
import { useNotification } from '../../contexts/NotificationContext';
import { createUser } from '../../services/api';

export default function CreateUserTab() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'user',
    accountType: 'personal',
    initialDeposit: '',
    accountNumber: 'ACC-2024-00123', // placeholder, backend generates real one
    permissions: {
      transfer: false,
      withdraw: false,
      viewHistory: true
    }
  });
  const showNotification = useNotification();

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    if (id.startsWith('permission')) {
      const perm = id.replace('permission', '').toLowerCase();
      setFormData(prev => ({
        ...prev,
        permissions: { ...prev.permissions, [perm]: checked }
      }));
    } else {
      setFormData(prev => ({ ...prev, [id]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        accountType: formData.accountType,
        initialDeposit: parseFloat(formData.initialDeposit) || 0,
        permissions: formData.permissions
      });
      showNotification('User account created successfully!', 'success');
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: 'user',
        accountType: 'personal',
        initialDeposit: '',
        accountNumber: 'ACC-2024-00123',
        permissions: { transfer: false, withdraw: false, viewHistory: true }
      });
    } catch (err) {
      showNotification(err.response?.data?.message || 'Creation failed', 'error');
    }
  };

  return (
    <>
      <h3 className="text-xl font-heading font-semibold text-secondary mb-6">Create New User Account</h3>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-secondary mb-2">First Name</label>
            <input type="text" id="firstName" value={formData.firstName} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 form-input focus:outline-none focus:border-primary" placeholder="Enter first name" required />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-secondary mb-2">Last Name</label>
            <input type="text" id="lastName" value={formData.lastName} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 form-input focus:outline-none focus:border-primary" placeholder="Enter last name" required />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-secondary mb-2">Email Address</label>
          <input type="email" id="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 form-input focus:outline-none focus:border-primary" placeholder="Enter email address" required />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-secondary mb-2">Password</label>
          <input type="password" id="password" value={formData.password} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 form-input focus:outline-none focus:border-primary" placeholder="Enter password" required />
        </div>

        <div>
          <label htmlFor="role" className="block text-sm font-medium text-secondary mb-2">User Role</label>
          <select id="role" value={formData.role} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 form-input focus:outline-none focus:border-primary">
            <option value="user">Regular User</option>
            <option value="admin">Administrator</option>
            <option value="manager">Account Manager</option>
            <option value="auditor">Auditor</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="initialDeposit" className="block text-sm font-medium text-secondary mb-2">Initial Deposit</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">$</span>
              </div>
              <input type="number" id="initialDeposit" value={formData.initialDeposit} onChange={handleChange} className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-300 form-input focus:outline-none focus:border-primary" placeholder="0.00" min="0" step="0.01" />
            </div>
          </div>

          <div>
            <label htmlFor="accountNumber" className="block text-sm font-medium text-secondary mb-2">Account Number</label>
            <input type="text" id="accountNumber" value={formData.accountNumber} readOnly className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 form-input focus:outline-none" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary mb-2">Account Permissions</label>
          <div className="space-y-2">
            <div className="flex items-center">
              <input type="checkbox" id="permissionTransfer" checked={formData.permissions.transfer} onChange={handleChange} className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" />
              <label htmlFor="permissionTransfer" className="ml-2 text-sm text-secondary-light">Money Transfer</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="permissionWithdraw" checked={formData.permissions.withdraw} onChange={handleChange} className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" />
              <label htmlFor="permissionWithdraw" className="ml-2 text-sm text-secondary-light">Withdraw Funds</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="permissionViewHistory" checked={formData.permissions.viewHistory} onChange={handleChange} className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" />
              <label htmlFor="permissionViewHistory" className="ml-2 text-sm text-secondary-light">View Transaction History</label>
            </div>
          </div>
        </div>

        <div className="flex space-x-4">
          <button type="submit" className="bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200">
            <i className="fas fa-save mr-2"></i>Create User
          </button>
          <button type="reset" className="bg-white border border-gray-300 hover:border-primary text-secondary hover:text-primary font-semibold py-3 px-6 rounded-lg transition-all duration-200">
            <i className="fas fa-redo mr-2"></i>Reset Form
          </button>
        </div>
      </form>
    </>
  );
}