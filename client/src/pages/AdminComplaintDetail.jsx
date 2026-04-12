import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { adminService, complaintService } from '../services/complaintService';
import { useToast } from '../context/ToastContext';
import { formatDate, formatRelativeTime } from '../utils/formatters';
import './AdminComplaintDetail.css';

const statusOptions = ['Pending', 'In Progress', 'Resolved'];
const priorityOptions = ['Low', 'Medium', 'High'];

const AdminComplaintDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [complaint, setComplaint] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  
  const [formData, setFormData] = useState({
    status: '',
    priority: ''
  });

  useEffect(() => {
    fetchComplaintData();
  }, [id]);

  const fetchComplaintData = async () => {
    try {
      const complaintData = await adminService.getAll({ id });
      const complaintArr = complaintData.complaints?.filter(c => c.id == id) || [];
      
      if (complaintArr.length > 0) {
        setComplaint(complaintArr[0]);
        setFormData({
          status: complaintArr[0].status,
          priority: complaintArr[0].priority
        });
      }
      
      const historyData = await complaintService.getHistory(id);
      setHistory(historyData.history || []);
    } catch (error) {
      toast.error('Failed to load complaint');
      navigate('/admin/complaints');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    setUpdating(true);
    try {
      await adminService.update(id, formData);
      toast.success('Complaint updated successfully');
      fetchComplaintData();
    } catch (error) {
      toast.error('Failed to update complaint');
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this complaint?')) return;
    
    try {
      await adminService.delete(id);
      toast.success('Complaint deleted');
      navigate('/admin/complaints');
    } catch (error) {
      toast.error('Failed to delete complaint');
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

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'High': return 'priority-high';
      case 'Medium': return 'priority-medium';
      case 'Low': return 'priority-low';
      default: return '';
    }
  };

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center py-5">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  return (
    <div className="admin-complaint-detail">
      <Link to="/admin/complaints" className="btn btn-link mb-3 ps-0">
        <i className="bi bi-arrow-left me-2"></i>
        Back to Complaints
      </Link>

      <div className="row g-4">
        {/* Main Content */}
        <div className="col-lg-8">
          {/* Complaint Info */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-header bg-white py-3">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <small className="text-muted">Complaint #{complaint?.id}</small>
                  <h4 className="mb-0">{complaint?.title}</h4>
                </div>
                <span className={`badge ${getStatusClass(complaint?.status)} fs-6`}>
                  {complaint?.status}
                </span>
              </div>
            </div>
            <div className="card-body">
              {/* User Info */}
              <div className="row g-3 mb-4">
                <div className="col-md-6">
                  <small className="text-muted">Submitted by</small>
                  <div className="fw-medium">{complaint?.user_name}</div>
                  <small className="text-muted">{complaint?.user_email}</small>
                </div>
                <div className="col-md-3">
                  <small className="text-muted">Category</small>
                  <div>{complaint?.category}</div>
                </div>
                <div className="col-md-3">
                  <small className="text-muted">Submitted</small>
                  <div>{formatDate(complaint?.created_at)}</div>
                </div>
              </div>

              <hr />

              {/* Description */}
              <div>
                <h6>Description</h6>
                <p className="mb-0" style={{ whiteSpace: 'pre-wrap' }}>
                  {complaint?.description}
                </p>
              </div>

              {/* Image */}
              {complaint?.image_path && (
                <div className="mt-4">
                  <h6>Attachment</h6>
                  <a 
                    href={`http://localhost:3000/${complaint.image_path}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="attachment-link"
                  >
                    <i className="bi bi-paperclip me-2"></i>
                    View Attachment
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* History */}
          {history.length > 0 && (
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-white py-3">
                <h6 className="mb-0">History</h6>
              </div>
              <div className="card-body">
                <div className="timeline">
                  {history.map((item, index) => (
                    <div key={index} className="timeline-item">
                      <div className="timeline-marker"></div>
                      <div className="timeline-content">
                        <div className="small">
                          <strong>{item.field_name}</strong> changed
                        </div>
                        <div className="small text-muted">
                          {item.old_value} → {item.new_value}
                        </div>
                        <div className="small text-muted">
                          {formatRelativeTime(item.changed_at)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar - Admin Actions */}
        <div className="col-lg-4">
          {/* Update Status */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-header bg-white py-3">
              <h6 className="mb-0">Update Status</h6>
            </div>
            <div className="card-body">
              <label className="form-label">Status</label>
              <div className="status-buttons mb-3">
                {statusOptions.map(status => (
                  <button
                    key={status}
                    className={`btn btn-sm ${formData.status === status ? 'btn-primary' : 'btn-outline-primary'} me-2 mb-2`}
                    onClick={() => setFormData(prev => ({ ...prev, status }))}
                  >
                    {status}
                  </button>
                ))}
              </div>

              <label className="form-label">Priority</label>
              <div className="priority-buttons mb-3">
                {priorityOptions.map(priority => (
                  <button
                    key={priority}
                    className={`btn btn-sm ${formData.priority === priority ? 'btn-danger' : 'btn-outline-secondary'} me-2 mb-2`}
                    onClick={() => setFormData(prev => ({ ...prev, priority }))}
                  >
                    {priority}
                  </button>
                ))}
              </div>

              <button 
                className="btn btn-primary w-100" 
                onClick={handleUpdate}
                disabled={updating}
              >
                {updating ? (
                  <span className="spinner-border spinner-border-sm me-2"></span>
                ) : (
                  <i className="bi bi-check-circle me-2"></i>
                )}
                Save Changes
              </button>
            </div>
          </div>

          {/* Delete */}
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white py-3">
              <h6 className="mb-0 text-danger">Danger Zone</h6>
            </div>
            <div className="card-body">
              <p className="small text-muted mb-3">
                Deleting a complaint is irreversible. The user will be notified.
              </p>
              <button 
                className="btn btn-outline-danger w-100"
                onClick={handleDelete}
              >
                <i className="bi bi-trash me-2"></i>
                Delete Complaint
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminComplaintDetail;