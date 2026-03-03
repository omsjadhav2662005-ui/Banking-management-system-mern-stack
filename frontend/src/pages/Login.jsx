import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import { login } from '../services/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const { login: authLogin } = useAuth();
  const showNotification = useNotification();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login({ email, password });
      authLogin(data.user, data.token);
      showNotification('Login successful! Redirecting to dashboard...', 'success');
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      showNotification(err.response?.data?.message || 'Login failed', 'error');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-card p-8">
        <h2 className="text-3xl font-heading font-bold text-center text-secondary mb-8">Welcome Back</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="loginEmail" className="block text-sm font-medium text-secondary mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="loginEmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 form-input focus:outline-none focus:border-primary"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="loginPassword" className="block text-sm font-medium text-secondary mb-2">
              Password
            </label>
            <input
              type="password"
              id="loginPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 form-input focus:outline-none focus:border-primary"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label htmlFor="rememberMe" className="ml-2 text-sm text-secondary-light">Remember me</label>
            </div>
            <Link to="/forgot-password" className="text-sm text-primary hover:text-primary-dark font-medium">
              Forgot password?
            </Link>
          </div>

          <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200">
            <i className="fas fa-sign-in-alt mr-2"></i>Sign In
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-secondary-light">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary hover:text-primary-dark font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}