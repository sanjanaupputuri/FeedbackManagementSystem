import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { useToast } from '../context/ToastContext';
import './Profile.css';

const Profile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordErrors, setPasswordErrors] = useState({});

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePasswordChange = async () => {
    const errors = {};
    if (!formData.currentPassword) errors.currentPassword = 'Current password required';
    if (!formData.newPassword) errors.newPassword = 'New password required';
    if (formData.newPassword.length < 4) errors.newPassword = 'Minimum 4 characters';
    if (formData.newPassword !== formData.confirmPassword) errors.confirmPassword = 'Passwords do not match';
    
    if (Object.keys(errors).length > 0) {
      setPasswordErrors(errors);
      return;
    }
    
    setLoading(true);
    setTimeout(() => {
      toast.success('Password updated successfully');
      setFormData(prev => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }));
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      
      <main className="flex-grow-1 bg-light">
        <div className="container py-4">
          <div className="row g-4">
            <div className="col-lg-6">
              {/* Profile Info */}
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
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.name}
                      onChange={handleChange}
                      name="name"
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={user?.email || ''}
                      disabled
                    />
                    <small className="text-muted">Email cannot be changed</small>
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Role</label>
                    <input
                      type="text"
                      className="form-control"
                      value={user?.role || 'user'}
                      disabled
                    />
                  </div>
                  
                  <button className="btn btn-primary w-100">
                    <i className="bi bi-check-circle me-2"></i>
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
            
            <div className="col-lg-6">
              {/* Change Password */}
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-header bg-white py-3">
                  <h5 className="mb-0">Change Password</h5>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <label className="form-label">Current Password</label>
                    <input
                      type="password"
                      className={`form-control ${passwordErrors.currentPassword ? 'is-invalid' : ''}`}
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleChange}
                    />
                    {passwordErrors.currentPassword && (
                      <div className="invalid-feedback">{passwordErrors.currentPassword}</div>
                    )}
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">New Password</label>
                    <input
                      type="password"
                      className={`form-control ${passwordErrors.newPassword ? 'is-invalid' : ''}`}
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleChange}
                    />
                    {passwordErrors.newPassword && (
                      <div className="invalid-feedback">{passwordErrors.newPassword}</div>
                    )}
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Confirm New Password</label>
                    <input
                      type="password"
                      className={`form-control ${passwordErrors.confirmPassword ? 'is-invalid' : ''}`}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                    {passwordErrors.confirmPassword && (
                      <div className="invalid-feedback">{passwordErrors.confirmPassword}</div>
                    )}
                  </div>
                  
                  <button 
                    className="btn btn-primary w-100" 
                    onClick={handlePasswordChange}
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="spinner-border spinner-border-sm me-2"></span>
                    ) : (
                      <i className="bi bi-key me-2"></i>
                    )}
                    Update Password
                  </button>
                </div>
              </div>
              
              {/* Account Stats */}
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-white py-3">
                  <h5 className="mb-0">Your Statistics</h5>
                </div>
                <div className="card-body">
                  <div className="row text-center">
                    <div className="col-4">
                      <div className="h4 mb-0">0</div>
                      <small className="text-muted">Total</small>
                    </div>
                    <div className="col-4">
                      <div className="h4 mb-0 text-warning">0</div>
                      <small className="text-muted">Pending</small>
                    </div>
                    <div className="col-4">
                      <div className="h4 mb-0 text-success">0</div>
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