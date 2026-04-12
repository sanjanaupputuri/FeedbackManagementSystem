import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import './About.css';

const About = () => {
  const features = {
    user: [
      'Submit complaints with image attachments',
      'Track complaint status in real-time',
      'View history of changes',
      'Add comments on complaints'
    ],
    admin: [
      'View and manage all complaints',
      'Update status and priority',
      'Analytics dashboards',
      'Bulk actions support'
    ]
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      
      <main className="flex-grow-1">
        <div className="container py-5">
          {/* Header */}
          <div className="text-center mb-5">
            <h1 className="mb-3">About Feedback Management System</h1>
            <p className="lead text-muted">
              A transparent, digital complaint management system for educational institutions
            </p>
          </div>

          {/* Project Overview */}
          <div className="row g-4 mb-5">
            <div className="col-lg-6">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <h4 className="mb-4">Project Overview</h4>
                  <p>
                    The Feedback Management System is a web-based application designed to streamline 
                    the complaint submission and resolution process for students and staff in educational institutions.
                  </p>
                  <p className="mb-0">
                    Built with React (frontend) and Node.js/Express (backend), this system provides a modern, 
                    responsive interface for managing complaints efficiently.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <h4 className="mb-4">Technology Stack</h4>
                  <div className="row g-3">
                    <div className="col-6">
                      <div className="tech-item">
                        <i className="bi bi-code-slash text-primary"></i>
                        <span>React 18</span>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="tech-item">
                        <i className="bi bi-node-plus text-success"></i>
                        <span>Node.js</span>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="tech-item">
                        <i className="bi bi-database text-info"></i>
                        <span>MySQL</span>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="tech-item">
                        <i className="bi bi-shield-check text-warning"></i>
                        <span>JWT Auth</span>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="tech-item">
                        <i className="bi bi-bootstrap text-purple"></i>
                        <span>Bootstrap 5</span>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="tech-item">
                        <i className="bi bi-bar-chart-line text-danger"></i>
                        <span>Chart.js</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="row g-4 mb-5">
            <div className="col-md-6">
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-white py-3">
                  <h5 className="mb-0"><i className="bi bi-person me-2"></i>User Features</h5>
                </div>
                <div className="card-body">
                  <ul className="list-unstyled mb-0">
                    {features.user.map((feature, index) => (
                      <li key={index} className="mb-2">
                        <i className="bi bi-check-circle text-success me-2"></i>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-white py-3">
                  <h5 className="mb-0"><i className="bi bi-shield-check me-2"></i>Admin Features</h5>
                </div>
                <div className="card-body">
                  <ul className="list-unstyled mb-0">
                    {features.admin.map((feature, index) => (
                      <li key={index} className="mb-2">
                        <i className="bi bi-check-circle text-success me-2"></i>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="card border-0 shadow-sm mb-5">
            <div className="card-header bg-white py-3">
              <h5 className="mb-0">Complaint Categories</h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-6 col-md-3">
                  <div className="category-box">
                    <i className="bi bi-lightning-charge"></i>
                    <span>Electrical</span>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="category-box">
                    <i className="bi bi-wifi"></i>
                    <span>Network</span>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="category-box">
                    <i className="bi bi-tools"></i>
                    <span>Maintenance</span>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="category-box">
                    <i className="bi bi-folder"></i>
                    <span>Others</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h4 className="mb-3">Ready to get started?</h4>
            <div className="d-flex justify-content-center gap-3">
              <Link to="/register" className="btn btn-primary btn-lg">Register Now</Link>
              <Link to="/contact" className="btn btn-outline-primary btn-lg">Contact Us</Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;