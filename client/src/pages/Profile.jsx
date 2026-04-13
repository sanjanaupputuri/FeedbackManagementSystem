import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { complaintService } from '../services/complaintService';
import './Profile.css';

const Profile = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ total: 0, Pending: 0, 'In Progress': 0, Resolved: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await complaintService.getUserStats();
        setStats(response.data.stats);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      
      <main className="flex-grow-1 bg-light">
        <div className="container py-4">
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-white py-3">
                  <h5 className="mb-0">Profile Information</h5>
                </div>
                <div className="card-body">
                  <div className="text-center mb-4">
                    <div className="profile-avatar mx-auto mb-3">
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <h5>{user?.name}</h5>
                    <span className="badge bg-primary">{user?.role}</span>
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label fw-bold">Name</label>
                    <p className="form-control-plaintext">{user?.name}</p>
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label fw-bold">Email</label>
                    <p className="form-control-plaintext">{user?.email}</p>
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label fw-bold">Role</label>
                    <p className="form-control-plaintext text-capitalize">{user?.role}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-6">
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-white py-3">
                  <h5 className="mb-0">Your Statistics</h5>
                </div>
                <div className="card-body">
                  <div className="row text-center">
                    <div className="col-6 mb-3">
                      <div className="h4 mb-0">{stats.total}</div>
                      <small className="text-muted">Total</small>
                    </div>
                    <div className="col-6 mb-3">
                      <div className="h4 mb-0 text-warning">{stats.Pending}</div>
                      <small className="text-muted">Pending</small>
                    </div>
                    <div className="col-6">
                      <div className="h4 mb-0 text-info">{stats['In Progress']}</div>
                      <small className="text-muted">In Progress</small>
                    </div>
                    <div className="col-6">
                      <div className="h4 mb-0 text-success">{stats.Resolved}</div>
                      <small className="text-muted">Resolved</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
