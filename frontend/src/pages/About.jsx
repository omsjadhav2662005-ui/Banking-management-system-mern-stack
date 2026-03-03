export default function About() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-heading font-bold text-secondary mb-4">About SecureBank Pro</h1>
        <p className="text-xl text-secondary-light">Revolutionizing banking management since 2010</p>
      </div>

      <div className="bg-white rounded-2xl shadow-card p-8 mb-8">
        <h2 className="text-2xl font-heading font-semibold text-secondary mb-6">Our Mission</h2>
        <p className="text-secondary-light mb-4">
          At SecureBank Pro, we're committed to providing secure, efficient, and user-friendly banking management solutions. 
          Our platform combines cutting-edge technology with robust security measures to deliver exceptional banking experiences.
        </p>
        <p className="text-secondary-light">
          With over a decade of experience in financial technology, we've helped thousands of users manage their finances 
          with confidence and ease.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-card p-8">
          <h3 className="text-xl font-heading font-semibold text-secondary mb-4">Our Values</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <i className="fas fa-shield-alt text-primary mt-1 mr-3"></i>
              <span className="text-secondary-light">Security First - Bank-level encryption and protection</span>
            </li>
            <li className="flex items-start">
              <i className="fas fa-bolt text-primary mt-1 mr-3"></i>
              <span className="text-secondary-light">Efficiency - Fast transactions and real-time updates</span>
            </li>
            <li className="flex items-start">
              <i className="fas fa-users text-primary mt-1 mr-3"></i>
              <span className="text-secondary-light">User-Centric - Intuitive interface and 24/7 support</span>
            </li>
            <li className="flex items-start">
              <i className="fas fa-chart-line text-primary mt-1 mr-3"></i>
              <span className="text-secondary-light">Innovation - Continuous improvement and new features</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl shadow-card p-8">
          <h3 className="text-xl font-heading font-semibold text-secondary mb-4">Leadership Team</h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <img src="https://picsum.photos/60?random=101" alt="CEO Sarah Johnson" className="w-12 h-12 rounded-full mr-4" />
              <div>
                <div className="font-medium text-secondary">Sarah Johnson</div>
                <div className="text-sm text-secondary-light">CEO & Founder</div>
              </div>
            </div>
            <div className="flex items-center">
              <img src="https://picsum.photos/60?random=102" alt="CTO Michael Chen" className="w-12 h-12 rounded-full mr-4" />
              <div>
                <div className="font-medium text-secondary">Michael Chen</div>
                <div className="text-sm text-secondary-light">Chief Technology Officer</div>
              </div>
            </div>
            <div className="flex items-center">
              <img src="https://picsum.photos/60?random=103" alt="CSO David Wilson" className="w-12 h-12 rounded-full mr-4" />
              <div>
                <div className="font-medium text-secondary">David Wilson</div>
                <div className="text-sm text-secondary-light">Chief Security Officer</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}