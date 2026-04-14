import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import StatsCard from '../components/dashboard/StatsCard';
import { adminService } from '../services/complaintService';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ total: 0, Pending: 0, 'In Progress': 0, Resolved: 0 });
  const [recentComplaints, setRecentComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [statsData, complaintsData] = await Promise.all([
        adminService.getStats(),
        adminService.getAll({ limit: 10 })
      ]);
      setStats(statsData.stats);
      setRecentComplaints(complaintsData.complaints || []);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Pending': return 'status-pending';
      case 'In Progress': return 'status-in-progress';
      case 'Resolved': return 'status-resolved';
      default: return '';
    }
  };

  return (
    <div className="admin-dashboard">
      {/* Stats Cards */}
      <div className="row g-3 mb-4">
        <div className="col-6 col-lg-3">
          <StatsCard
            title="Total"
            value={stats.total}
            icon="bi bi-journal-text"
            color="primary"
            link="/admin/complaints"
            loading={loading}
          />
        </div>
        <div className="col-6 col-lg-3">
          <StatsCard
            title="Pending"
            value={stats.Pending}
            icon="bi bi-clock"
            color="warning"
            link="/admin/complaints?status=Pending"
            loading={loading}
          />
        </div>
        <div className="col-6 col-lg-3">
          <StatsCard
            title="In Progress"
            value={stats['In Progress']}
            icon="bi bi-arrow-repeat"
            color="info"
            link="/admin/complaints?status=In Progress"
            loading={loading}
          />
        </div>
        <div className="col-6 col-lg-3">
          <StatsCard
            title="Resolved"
            value={stats.Resolved}
            icon="bi bi-check-circle"
            color="success"
            link="/admin/complaints?status=Resolved"
            loading={loading}
          />
        </div>
      </div>

      {/* Recent Complaints Table */}
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white d-flex justify-content-between align-items-center py-3">
          <h5 className="mb-0">Recent Complaints</h5>
          <Link to="/admin/complaints" className="btn btn-sm btn-outline-primary">
            View All <i className="bi bi-arrow-right ms-1"></i>
          </Link>
        </div>
        <div className="card-body p-0">
          {loading ? (
            <div className="text-center py-4">
              <div className="spinner-border text-primary" role="status"></div>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>User</th>
                    <th>Category</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentComplaints.map(complaint => (
                    <tr key={complaint.id}>
                      <td>#{complaint.id}</td>
                      <td>
                        <Link to={`/admin/complaints/${complaint.id}`} className="text-decoration-none">
                          {complaint.title}
                        </Link>
                      </td>
                      <td className="text-muted" style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {complaint.description?.substring(0, 50)}{complaint.description?.length > 50 && '...'}
                      </td>
                      <td>{complaint.user_name}</td>
                      <td>{complaint.category}</td>
                      <td>
                        <span className={`badge priority-${complaint.priority.toLowerCase()}`}>
                          {complaint.priority}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${getStatusClass(complaint.status)}`}>
                          {complaint.status}
                        </span>
                      </td>
                      <td>{new Date(complaint.created_at).toLocaleDateString()}</td>
                      <td>
                        <Link to={`/admin/complaints/${complaint.id}`} className="btn btn-sm btn-outline-primary">
                          Manage
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Quick Filters */}
      <div className="row g-3 mt-4">
        <div className="col-md-4">
          <Link to="/admin/complaints?status=Pending" className="btn btn-outline-warning w-100">
            <i className="bi bi-clock me-2"></i>
            View Pending ({stats.Pending})
          </Link>
        </div>
        <div className="col-md-4">
          <Link to="/admin/complaints?priority=High" className="btn btn-outline-danger w-100">
            <i className="bi bi-flag me-2"></i>
            High Priority
          </Link>
        </div>
        <div className="col-md-4">
          <Link to="/admin/analytics" className="btn btn-outline-primary w-100">
            <i className="bi bi-bar-chart me-2"></i>
            View Analytics
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;