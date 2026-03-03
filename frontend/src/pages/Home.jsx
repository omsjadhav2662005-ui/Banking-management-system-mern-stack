export default function Home() {
  return (
    <div className="page-content page-transition active">
      {/* Hero Section */}
      <section className="text-center py-12 md:py-20">
        <h1 className="text-4xl md:text-6xl font-heading font-bold text-secondary mb-6">
          Modern <span className="text-primary">Banking</span> Management
        </h1>
        <p className="text-xl text-secondary-light max-w-3xl mx-auto mb-10">
          Experience secure, efficient, and intuitive banking management with our advanced platform. 
          Manage accounts, transfers, and transactions with ease.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105">
            <i className="fas fa-sign-in-alt mr-2"></i>Get Started
          </button>
          <button className="bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200">
            <i className="fas fa-play-circle mr-2"></i>Watch Demo
          </button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12">
        <h2 className="text-3xl font-heading font-bold text-center text-secondary mb-12">Powerful Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white rounded-xl p-8 shadow-card hover:shadow-card-hover transition-shadow duration-300">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-6">
              <i className="fas fa-user-plus text-primary text-2xl"></i>
            </div>
            <h3 className="text-xl font-heading font-semibold text-secondary mb-4">User Management</h3>
            <p className="text-secondary-light">Create and manage user accounts with different roles and permissions seamlessly.</p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-xl p-8 shadow-card hover:shadow-card-hover transition-shadow duration-300">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-6">
              <i className="fas fa-exchange-alt text-primary text-2xl"></i>
            </div>
            <h3 className="text-xl font-heading font-semibold text-secondary mb-4">Money Transfer</h3>
            <p className="text-secondary-light">Instant and secure money transfers between accounts with real-time tracking.</p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-xl p-8 shadow-card hover:shadow-card-hover transition-shadow duration-300">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-6">
              <i className="fas fa-history text-primary text-2xl"></i>
            </div>
            <h3 className="text-xl font-heading font-semibold text-secondary mb-4">Transaction History</h3>
            <p className="text-secondary-light">Complete audit trail with detailed transaction history and export capabilities.</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white rounded-2xl p-8 md:p-12 shadow-card my-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">10K+</div>
            <div className="text-secondary-light">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">$5B+</div>
            <div className="text-secondary-light">Total Transactions</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">99.9%</div>
            <div className="text-secondary-light">Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">256-bit</div>
            <div className="text-secondary-light">Encryption</div>
          </div>
        </div>
      </section>
    </div>
  );
}