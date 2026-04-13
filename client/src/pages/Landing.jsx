import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Footer from '../components/common/Footer';
import './Landing.css';

const Landing = () => {
  const { isAuthenticated, isAdmin } = useAuth();

  const features = [
    { icon: 'bi-briefcase-fill', title: 'Submit Easily', desc: 'File complaints with detailed information and attachments' },
    { icon: 'bi-graph-up', title: 'Track Status', desc: 'Monitor your complaint status in real-time' },
    { icon: 'bi-bar-chart-line', title: 'Analytics', desc: 'Admins get powerful analytics and reports' }
  ];

  const categories = [
    { icon: 'bi-lightning-charge', name: 'Electrical', color: '#F59E0B' },
    { icon: 'bi-wifi', name: 'Network', color: '#3B82F6' },
    { icon: 'bi-tools', name: 'Maintenance', color: '#10B981' },
    { icon: 'bi-folder', name: 'Others', color: '#6B7280' }
  ];

  const howItWorks = [
    { step: 1, title: 'Register', desc: 'Create your account' },
    { step: 2, title: 'Submit', desc: 'File your complaint' },
    { step: 3, title: 'Track', desc: 'Monitor progress' },
    { step: 4, title: 'Resolve', desc: 'Get solutions' }
  ];

  return (
    <div className="landing-page">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <i className="bi bi-briefcase-fill text-primary me-2"></i>
            <span className="fw-bold">FeedbackMS</span>
          </Link>
          <div className="d-flex gap-2">
            {isAuthenticated ? (
              <Link to={isAdmin ? '/admin' : '/dashboard'} className="btn btn-primary">
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline-primary">Login</Link>
                <Link to="/register" className="btn btn-primary">Register</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center min-vh-75">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-4 animate-fade-in">
                Manage Complaints.<br/>
                <span className="text-primary">Track Progress.</span><br/>
                Get Results.
              </h1>
              <p className="lead text-secondary mb-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                A transparent, digital complaint management system for students and staff. 
                Submit, track, and resolve issues efficiently.
              </p>
              <div className="d-flex gap-3 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <Link to="/register" className="btn btn-primary btn-lg">
                  Get Started <i className="bi bi-arrow-right ms-2"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2>Features</h2>
            <p className="text-muted">Everything you need to manage complaints effectively</p>
          </div>
          <div className="row g-4">
            {features.map((feature, index) => (
              <div className="col-md-6 col-lg-4" key={index}>
                <div className="feature-card card border-0 shadow-sm h-100">
                  <div className="card-body text-center p-4">
                    <div className="feature-icon mb-3">
                      <i className={`bi ${feature.icon}`}></i>
                    </div>
                    <h5>{feature.title}</h5>
                    <p className="text-muted mb-0">{feature.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2>Complaint Categories</h2>
            <p className="text-muted">Choose from various categories for your complaints</p>
          </div>
          <div className="row justify-content-center g-4">
            {categories.map((cat, index) => (
              <div className="col-6 col-md-3" key={index}>
                <div className="category-tile text-center p-4 rounded">
                  <i className={`bi ${cat.icon}`} style={{ color: cat.color }}></i>
                  <div className="mt-2 fw-medium">{cat.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2>How It Works</h2>
            <p className="text-muted">Get your issues resolved in 4 simple steps</p>
          </div>
          <div className="row g-4">
            {howItWorks.map((item, index) => (
              <div className="col-6 col-md-3" key={index}>
                <div className="step-card text-center">
                  <div className="step-number">{item.step}</div>
                  <h5>{item.title}</h5>
                  <p className="text-muted small">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section py-5">
        <div className="container text-center">
          <h2 className="mb-3">Ready to get started?</h2>
          <p className="mb-4">Join thousands of users managing their complaints efficiently</p>
          <div className="d-flex justify-content-center gap-3">
            <Link to="/register" className="btn btn-light btn-lg">
              Register Now <i className="bi bi-arrow-right ms-2"></i>
            </Link>
            <Link to="/contact" className="btn btn-outline-light btn-lg">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;