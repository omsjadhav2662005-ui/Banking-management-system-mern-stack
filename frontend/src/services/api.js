import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// Attach token to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers['x-auth-token'] = token;
  }
  return req;
});

// Auth
export const login = (formData) => API.post('/auth/login', formData);
export const register = (formData) => API.post('/auth/register', formData);

// Users
export const createUser = (formData) => API.post('/users', formData);
export const getUsers = () => API.get('/users');

// Accounts
export const getMyAccounts = () => API.get('/accounts');

// Transactions
export const transferMoney = (data) => API.post('/transactions/transfer', data);
export const getTransactionHistory = (accountId) => API.get(`/transactions/history/${accountId}`);
export const depositMoney = (data) => API.post('/accounts/deposit', data);
// Dashboard
export const getDashboardSummary = () => API.get('/dashboard/summary');