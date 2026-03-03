import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useNotification } from '../contexts/NotificationContext';
import { register } from '../services/api';

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    accountType: 'personal',
    terms: false
  });
  const showNotification = useNotification();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      showNotification('Passwords do not match!', 'error');
      return;
    }
    if (!formData.terms) {
      showNotification('You must agree to the terms', 'error');
      return;
    }
    try {
      const { data } = await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        accountType: formData.accountType
      });
      showNotification('Account created successfully! You can now login.', 'success');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      showNotification(err.response?.data?.message || 'Registration failed', 'error');
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-white rounded-2xl shadow-card p-8">
        <h2 className="text-3xl font-heading font-bold text-center text-secondary mb-8">Create New Account</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
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
            <input type="email" id="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 form-input focus:outline-none focus:border-primary" placeholder="Enter your email" required />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-secondary mb-2">Password</label>
              <input type="password" id="password" value={formData.password} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 form-input focus:outline-none focus:border-primary" placeholder="Create password" required />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-secondary mb-2">Confirm Password</label>
              <input type="password" id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 form-input focus:outline-none focus:border-primary" placeholder="Confirm password" required />
            </div>
          </div>

          <div>
            <label htmlFor="accountType" className="block text-sm font-medium text-secondary mb-2">Account Type</label>
            <select id="accountType" value={formData.accountType} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 form-input focus:outline-none focus:border-primary">
              <option value="personal">Personal Account</option>
              <option value="business">Business Account</option>
              <option value="premium">Premium Account</option>
            </select>
          </div>

          <div className="flex items-center">
            <input type="checkbox" id="terms" checked={formData.terms} onChange={handleChange} className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" required />
            <label htmlFor="terms" className="ml-2 text-sm text-secondary-light">
              I agree to the <a href="#" className="text-primary hover:text-primary-dark">Terms of Service</a> and <a href="#" className="text-primary hover:text-primary-dark">Privacy Policy</a>
            </label>
          </div>

          <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200">
            <i className="fas fa-user-plus mr-2"></i>Create Account
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-secondary-light">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:text-primary-dark font-medium">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}