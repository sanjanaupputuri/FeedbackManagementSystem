import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { adminService } from '../services/complaintService';
import './AdminComplaints.css';

const statusOptions = ['All', 'Pending', 'In Progress', 'Resolved'];
const categoryOptions = ['All', 'Electrical', 'Network', 'Maintenance', 'Others'];
const priorityOptions = ['All', 'High', 'Medium', 'Low'];

const AdminComplaints = () => {
  const [searchParams] = useSearchParams();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });

  const [filters, setFilters] = useState({
    status: searchParams.get('status') || 'All',
    category: searchParams.get('category') || 'All',
    priority: searchParams.get('priority') || 'All',
    search: ''
  });

  useEffect(() => {
    fetchComplaints();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.status, filters.category, filters.priority, pagination.page]);

  const fetchComplaints = async () => {
    setLoading(true);
    try {
      const params = { page: pagination.page, limit: 20 };
      if (filters.status !== 'All') params.status = filters.status;
      if (filters.category !== 'All') params.category = filters.category;
      if (filters.priority !== 'All') params.priority = filters.priority;
      
      const data = await adminService.getAll(params);
      setComplaints(data.complaints || []);
      setPagination(data.pagination || { page: 1, pages: 1, total: 0 });
    } catch (error) {
      console.error('Error fetching complaints:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, page: 1 }));
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
    <div className="admin-complaints">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="mb-0">All Complaints</h4>
          <p className="text-muted mb-0 small">Manage and respond to all complaints</p>
        </div>
      </div>

      {/* Filters */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3 align-items-center">
            <div className="col-md-3">
              <select
                className="form-select"
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                {statusOptions.map(opt => (
                  <option key={opt} value={opt}>{opt === 'All' ? 'All Status' : opt}</option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <select
                className="form-select"
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
              >
                {categoryOptions.map(opt => (
                  <option key={opt} value={opt}>{opt === 'All' ? 'All Category' : opt}</option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <select
                className="form-select"
                value={filters.priority}
                onChange={(e) => handleFilterChange('priority', e.target.value)}
              >
                {priorityOptions.map(opt => (
                  <option key={opt} value={opt}>{opt === 'All' ? 'All Priority' : opt}</option>
                ))}
              </select>
            </div>
            <div className="col-md-3 text-end">
              <small className="text-muted">
                Showing {complaints.length} of {pagination.total}
              </small>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status"></div>
            </div>
          ) : complaints.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>User</th>
                    <th>Category</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {complaints.map(complaint => (
                    <tr key={complaint.id}>
                      <td>#{complaint.id}</td>
                      <td>
                        <Link to={`/admin/complaints/${complaint.id}`} className="text-decoration-none fw-medium">
                          {complaint.title?.substring(0, 40)}
                          {complaint.title?.length > 40 && '...'}
                        </Link>
                      </td>
                      <td>
                        <div>{complaint.user_name}</div>
                        <small className="text-muted">{complaint.user_email}</small>
                      </td>
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
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-5">
              <i className="bi bi-inbox text-muted fs-1 d-block mb-3"></i>
              <h5>No complaints found</h5>
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <nav>
            <ul className="pagination mb-0">
              <li className={`page-item ${pagination.page === 1 ? 'disabled' : ''}`}>
                <button 
                  className="page-link" 
                  onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                  disabled={pagination.page === 1}
                >
                  <i className="bi bi-chevron-left"></i>
                </button>
              </li>
              {[...Array(pagination.pages)].map((_, i) => (
                <li key={i} className={`page-item ${pagination.page === i + 1 ? 'active' : ''}`}>
                  <button 
                    className="page-link"
                    onClick={() => setPagination(prev => ({ ...prev, page: i + 1 }))}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
              <li className={`page-item ${pagination.page === pagination.pages ? 'disabled' : ''}`}>
                <button 
                  className="page-link"
                  onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                  disabled={pagination.page === pagination.pages}
                >
                  <i className="bi bi-chevron-right"></i>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default AdminComplaints;