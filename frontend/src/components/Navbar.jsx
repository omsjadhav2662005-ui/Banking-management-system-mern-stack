import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/login', label: 'Login', hideWhenAuth: true },
    { to: '/register', label: 'Register', hideWhenAuth: true },
    { to: '/about', label: 'About' },
    { to: '/loans', label: 'Loan Facilities' },
    { to: '/dashboard', label: 'Dashboard', requireAuth: true },
  ];

  const filteredNavItems = navItems.filter(item => {
    if (item.requireAuth && !user) return false;
    if (item.hideWhenAuth && user) return false;
    return true;
  });

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <i className="fas fa-university text-white text-xl"></i>
            </div>
            <span className="text-xl font-heading font-bold text-secondary">
              Secure<span className="text-primary">Bank</span> Pro
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {filteredNavItems.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `nav-link transition-colors duration-200 font-medium ${
                    isActive ? 'text-primary' : 'text-secondary hover:text-primary'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            {user && (
              <button
                onClick={handleLogout}
                className="text-secondary hover:text-primary font-medium"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-secondary hover:text-primary"
          >
            <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-3">
              {filteredNavItems.map(item => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `nav-link transition-colors duration-200 font-medium py-2 ${
                      isActive ? 'text-primary' : 'text-secondary hover:text-primary'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              {user && (
                <button
                  onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                  className="text-left text-secondary hover:text-primary font-medium py-2"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}