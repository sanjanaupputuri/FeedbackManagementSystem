import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer bg-white border-top">
      <div className="container py-4">
        <div className="row g-4">
          <div className="col-lg-4 col-md-6">
            <div className="d-flex align-items-center mb-3">
              <i className="bi bi-briefcase-fill text-primary fs-4 me-2"></i>
              <span className="h5 mb-0">Feedback System</span>
            </div>
            <p className="text-muted small mb-0">
              A transparent, digital complaint management system for students and staff to track and resolve issues efficiently.
            </p>
          </div>

          <div className="col-lg-2 col-md-3 col-6">
            <h6 className="mb-3">Quick Links</h6>
            <ul className="list-unstyled mb-0">
              <li className="mb-2">
                <Link to="/dashboard" className="footer-link">Dashboard</Link>
              </li>
              <li className="mb-2">
                <Link to="/submit" className="footer-link">Submit Complaint</Link>
              </li>
              <li className="mb-2">
                <Link to="/my-complaints" className="footer-link">My Complaints</Link>
              </li>
              <li className="mb-2">
                <Link to="/contact" className="footer-link">Contact</Link>
              </li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-3 col-6">
            <h6 className="mb-3">Categories</h6>
            <ul className="list-unstyled mb-0">
              <li className="mb-2">
                <span className="footer-link">Electrical</span>
              </li>
              <li className="mb-2">
                <span className="footer-link">Network</span>
              </li>
              <li className="mb-2">
                <span className="footer-link">Maintenance</span>
              </li>
              <li className="mb-2">
                <span className="footer-link">Others</span>
              </li>
            </ul>
          </div>

          <div className="col-lg-4 col-md-6">
            <h6 className="mb-3">Contact Us</h6>
            <ul className="list-unstyled text-muted small mb-0">
              <li className="mb-2">
                <i className="bi bi-geo-alt me-2"></i>
                Computer Science Dept.
              </li>
              <li className="mb-2">
                <i className="bi bi-envelope me-2"></i>
                admin@feedback.com
              </li>
              <li className="mb-2">
                <i className="bi bi-clock me-2"></i>
                Mon - Fri: 9AM - 5PM
              </li>
            </ul>
            <div className="mt-3">
              <button type="button" className="footer-social me-3 btn btn-link">
                <i className="bi bi-facebook"></i>
              </button>
              <button type="button" className="footer-social me-3 btn btn-link">
                <i className="bi bi-twitter-x"></i>
              </button>
              <button type="button" className="footer-social me-3 btn btn-link">
                <i className="bi bi-linkedin"></i>
              </button>
              <button type="button" className="footer-social btn btn-link">
                <i className="bi bi-github"></i>
              </button>
            </div>
          </div>
        </div>

        <hr className="my-4" />

        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <p className="text-muted small mb-0">
              &copy; {currentYear} Feedback Management System. All rights reserved.
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <Link to="/about" className="footer-link small me-3">About</Link>
            <Link to="/contact" className="footer-link small me-3">Contact</Link>
            <Link to="/privacy" className="footer-link small">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;