import { useState } from 'react';
import { useNotification } from '../contexts/NotificationContext';
import { depositMoney } from '../services/api';
import DepositModal from '../components/DepositModal';

export default function LoanFacilities() {
  const [showDepositModal, setShowDepositModal] = useState(false);

  const showNotification = useNotification();

  const handleDeposit = async (amount, password) => {
    try {
      // Assume we deposit into the user's first account
      // In a real app, you might let the user select an account
      const { data } = await depositMoney({ amount, password });
      showNotification(`Successfully deposited $${amount}`, 'success');
      setShowDepositModal(false);
    } catch (err) {
      showNotification(err.response?.data?.message || 'Deposit failed', 'error');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-heading font-bold text-secondary mb-8">Loan Facilities</h1>

      {/* Deposit Button */}


      {/* Loan Information */}
      <div className="bg-white rounded-2xl shadow-card p-8 mb-8">
        <h2 className="text-2xl font-heading font-semibold text-secondary mb-6">Personal Loans</h2>
        <p className="text-secondary-light mb-4">
          Our personal loans are designed to meet your individual needs – whether it's a dream vacation, home renovation, or unexpected expenses.
        </p>
        <ul className="list-disc pl-6 text-secondary-light space-y-2">
          <li>Loan amount: $1,000 – $50,000</li>
          <li>Interest rate: Starting at 6.99% APR</li>
          <li>Repayment tenure: 1 – 5 years</li>
          <li>No prepayment penalties</li>
          <li>Quick approval within 24 hours</li>
        </ul>
      </div>

      <div className="bg-white rounded-2xl shadow-card p-8 mb-8">
        <h2 className="text-2xl font-heading font-semibold text-secondary mb-6">Home Loans</h2>
        <p className="text-secondary-light mb-4">
          Make your dream home a reality with our competitive home loan options.
        </p>
        <ul className="list-disc pl-6 text-secondary-light space-y-2">
          <li>Loan amount: Up to $1,000,000</li>
          <li>Interest rate: Starting at 5.50% APR</li>
          <li>Repayment tenure: 5 – 30 years</li>
          <li>Flexible EMI options</li>
          <li>Minimal documentation</li>
        </ul>
      </div>

      <div className="bg-white rounded-2xl shadow-card p-8 mb-8">
        <h2 className="text-2xl font-heading font-semibold text-secondary mb-6">Business Loans</h2>
        <p className="text-secondary-light mb-4">
          Fuel your business growth with our tailored business loan solutions.
        </p>
        <ul className="list-disc pl-6 text-secondary-light space-y-2">
          <li>Loan amount: $10,000 – $500,000</li>
          <li>Interest rate: Starting at 8.25% APR</li>
          <li>Repayment tenure: 1 – 7 years</li>
          <li>Collateral-free options available</li>
          <li>Dedicated relationship manager</li>
        </ul>
      </div>

      <div className="bg-white rounded-2xl shadow-card p-8">
        <h2 className="text-2xl font-heading font-semibold text-secondary mb-6">Education Loans</h2>
        <p className="text-secondary-light mb-4">
          Invest in your future with our education loans for studies in India and abroad.
        </p>
        <ul className="list-disc pl-6 text-secondary-light space-y-2">
          <li>Loan amount: Up to $100,000</li>
          <li>Interest rate: Starting at 7.25% APR</li>
          <li>Moratorium period available</li>
          <li>Cover tuition, accommodation, books</li>
          <li>Easy repayment options</li>
        </ul>
      </div>

      {/* Deposit Modal */}
      <DepositModal
        isOpen={showDepositModal}
        onClose={() => setShowDepositModal(false)}
        onDeposit={handleDeposit}
      />
    </div>
  );
}