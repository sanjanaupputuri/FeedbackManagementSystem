import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowDropdown(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <i className="bi bi-briefcase-fill text-primary me-2"></i>
          <span className="fw-bold">Feedback System</span>
        </Link>

        <button 
          className="navbar-toggler border-0" 
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`navbar-collapse ${mobileMenuOpen ? 'show' : ''}`}>
          {isAuthenticated ? (
            <>
              <ul className="navbar-nav ms-auto me-4">
                {isAdmin ? (
                  <>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link 
                        to="/dashboard" 
                        className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <i className="bi bi-speedometer2 me-1"></i> Dashboard
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link 
                        to="/my-complaints" 
                        className={`nav-link ${isActive('/my-complaints') ? 'active' : ''}`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <i className="bi bi-journal-text me-1"></i> My Complaints
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link 
                        to="/submit" 
                        className={`nav-link ${isActive('/submit') ? 'active' : ''}`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <i className="bi bi-plus-circle me-1"></i> Submit
                      </Link>
                    </li>
                  </>
                )}
              </ul>

              <div className="nav-item dropdown">
                <button 
                  className="btn btn-link nav-link dropdown-toggle d-flex align-items-center text-decoration-none"
                  onClick={() => setShowDropdown(!showDropdown)}
                  style={{ color: 'var(--text-primary)' }}
                >
                  <div className="avatar-circle me-2">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="d-none d-md-inline">{user?.name}</span>
                </button>
                <ul className={`dropdown-menu dropdown-menu-end ${showDropdown ? 'show' : ''}`}>
                  <li>
                    <Link 
                      to="/profile" 
                      className="dropdown-item"
                      onClick={() => { setShowDropdown(false); setMobileMenuOpen(false); }}
                    >
                      <i className="bi bi-person me-2"></i> My Profile
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to={isAdmin ? "/admin" : "/dashboard"} 
                      className="dropdown-item"
                      onClick={() => { setShowDropdown(false); setMobileMenuOpen(false); }}
                    >
                      <i className="bi bi-house me-2"></i> Dashboard
                    </Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button 
                      className="dropdown-item text-danger" 
                      onClick={handleLogout}
                    >
                      <i className="bi bi-box-arrow-right me-2"></i> Logout
                    </button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link 
                  to="/about" 
                  className={`nav-link ${isActive('/about') ? 'active' : ''}`}
                >
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  to="/contact" 
                  className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
                >
                  Contact
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/login" className="btn btn-outline-primary ms-2">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="btn btn-primary ms-2">
                  Register
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;