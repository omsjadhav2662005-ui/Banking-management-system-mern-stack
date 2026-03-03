import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <i className="fas fa-university text-white"></i>
              </div>
              <span className="text-lg font-heading font-bold text-secondary">Secure<span className="text-primary">Bank</span> Pro</span>
            </div>
            <p className="text-secondary-light text-sm">
              Secure online banking platform with advanced management features for modern financial needs.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-secondary mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-secondary-light hover:text-primary text-sm transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-secondary-light hover:text-primary text-sm transition-colors">About Us</Link></li>
              <li><Link to="/login" className="text-secondary-light hover:text-primary text-sm transition-colors">Login</Link></li>
              <li><Link to="/register" className="text-secondary-light hover:text-primary text-sm transition-colors">Register</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-semibold text-secondary mb-4">Services</h4>
            <ul className="space-y-2">
              <li><Link to="/dashboard" className="text-secondary-light hover:text-primary text-sm transition-colors">Personal Banking</Link></li>
              <li><Link to="/dashboard" className="text-secondary-light hover:text-primary text-sm transition-colors">Business Accounts</Link></li>
              <li><Link to="/dashboard" className="text-secondary-light hover:text-primary text-sm transition-colors">Money Transfers</Link></li>
              <li><Link to="/dashboard" className="text-secondary-light hover:text-primary text-sm transition-colors">Transaction History</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-secondary mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li className="flex items-center text-secondary-light text-sm">
                <i className="fas fa-map-marker-alt text-primary mr-2"></i>
                123 Finance Street, Banking City
              </li>
              <li className="flex items-center text-secondary-light text-sm">
                <i className="fas fa-phone text-primary mr-2"></i>
                +1 (555) 123-4567
              </li>
              <li className="flex items-center text-secondary-light text-sm">
                <i className="fas fa-envelope text-primary mr-2"></i>
                support@securebankpro.com
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-secondary-light text-sm mb-4 md:mb-0">
            © 2024 SecureBank Pro. All rights reserved.
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-secondary-light hover:text-primary transition-colors"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="text-secondary-light hover:text-primary transition-colors"><i className="fab fa-twitter"></i></a>
            <a href="#" className="text-secondary-light hover:text-primary transition-colors"><i className="fab fa-linkedin-in"></i></a>
            <a href="#" className="text-secondary-light hover:text-primary transition-colors"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
}