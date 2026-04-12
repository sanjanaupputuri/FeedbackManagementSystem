import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="min-vh-100 bg-light">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">
          <Link className="navbar-brand fw-bold text-primary" to="/">FeedbackMS</Link>
          <div className="d-flex gap-2">
            <Link to="/login" className="btn btn-outline-primary">Login</Link>
            <Link to="/register" className="btn btn-primary">Register</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container py-5">
        <div className="row align-items-center min-vh-75">
          <div className="col-lg-6">
            <h1 className="display-4 fw-bold mb-4">Manage Complaints.<br/>Track Progress.<br/>Get Results.</h1>
            <p className="lead text-secondary mb-4">
              A transparent, digital complaint management system for students and staff.
            </p>
            <div className="d-flex gap-3">
              <Link to="/register" className="btn btn-primary btn-lg">Get Started →</Link>
              <Link to="/about" className="btn btn-outline-secondary btn-lg">Learn More</Link>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="bg-white p-5 rounded shadow">
              <h3 className="mb-4">Quick Stats</h3>
              <div className="row g-3">
                <div className="col-6">
                  <div className="text-center p-3 bg-light rounded">
                    <h2 className="text-primary mb-0">500+</h2>
                    <small className="text-muted">Users</small>
                  </div>
                </div>
                <div className="col-6">
                  <div className="text-center p-3 bg-light rounded">
                    <h2 className="text-success mb-0">1200+</h2>
                    <small className="text-muted">Resolved</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
