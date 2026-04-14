import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ collapsed, onToggle }) => {
  const location = useLocation();
  
  const menuItems = [
    { path: '/admin', label: 'Dashboard', icon: 'bi-speedometer2', exact: true },
    { path: '/admin/complaints', label: 'All Complaints', icon: 'bi-journal-text' },
    { path: '/admin/analytics', label: 'Analytics', icon: 'bi-bar-chart-line' },
  ];

  const isActive = (path, exact = false) => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  return (
    <aside className={`admin-sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <Link to="/admin" className="d-flex align-items-center text-decoration-none">
          <i className="bi bi-shield-check fs-4 text-primary me-2"></i>
          {!collapsed && <span className="fw-bold">Admin Panel</span>}
        </Link>
        <button className="btn btn-link toggle-btn" onClick={onToggle}>
          <i className={`bi ${collapsed ? 'bi-chevron-right' : 'bi-chevron-left'}`}></i>
        </button>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-item ${isActive(item.path, item.exact) ? 'active' : ''}`}
          >
            <i className={`bi ${item.icon}`}></i>
            {!collapsed && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;