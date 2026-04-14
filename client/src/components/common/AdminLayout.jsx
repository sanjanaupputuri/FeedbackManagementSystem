import React, { useState } from 'react';
import { Outlet, Navigate, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Sidebar from './Sidebar';
import './AdminLayout.css';

const AdminLayout = () => {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="admin-layout">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      <main className={`admin-main ${sidebarCollapsed ? 'expanded' : ''}`}>
        <header className="admin-header">
          <div>
            <h4 className="mb-0">Admin Dashboard</h4>
            <small className="text-muted">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            </small>
          </div>
          <div className="d-flex align-items-center gap-3">
            <div className="dropdown">
              <button 
                className="btn btn-link dropdown-toggle d-flex align-items-center text-decoration-none"
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
                  <Link to="/profile" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                    <i className="bi bi-person me-2"></i> My Profile
                  </Link>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <button className="dropdown-item text-danger" onClick={handleLogout}>
                    <i className="bi bi-box-arrow-right me-2"></i> Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </header>
        <div className="admin-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;