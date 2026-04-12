import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Sidebar from './Sidebar';
import './AdminLayout.css';

const AdminLayout = () => {
  const { user, isAdmin } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

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
            <div className="d-flex align-items-center">
              <div className="avatar-circle me-2">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <span className="d-none d-md-inline">{user?.name}</span>
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