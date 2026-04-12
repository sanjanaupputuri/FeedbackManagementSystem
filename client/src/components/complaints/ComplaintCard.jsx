import React from 'react';
import { Link } from 'react-router-dom';
import { formatRelativeTime } from '../../utils/formatters';
import './ComplaintCard.css';

const categoryIcons = {
  Electrical: 'bi-lightning-charge',
  Network: 'bi-wifi',
  Maintenance: 'bi-tools',
  Others: 'bi-folder'
};

const categoryColors = {
  Electrical: '#F59E0B',
  Network: '#3B82F6',
  Maintenance: '#10B981',
  Others: '#6B7280'
};

const ComplaintCard = ({ complaint, onDelete, showUser = false }) => {
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

  return (
    <div className="complaint-card card border-0 shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <div className="d-flex align-items-center">
            <span 
              className="category-icon me-2"
              style={{ color: categoryColors[complaint.category] }}
            >
              <i className={`bi ${categoryIcons[complaint.category]}`}></i>
            </span>
            <span className="text-muted small">{complaint.category}</span>
          </div>
          <div className="d-flex gap-2">
            <span className={`badge ${getPriorityClass(complaint.priority)}`}>
              {complaint.priority}
            </span>
            <span className={`badge ${getStatusClass(complaint.status)}`}>
              {complaint.status === 'In Progress' ? 'In Progress' : complaint.status}
            </span>
          </div>
        </div>

        <Link to={`/complaints/${complaint.id}`} className="text-decoration-none">
          <h6 className="complaint-title mb-2">{complaint.title}</h6>
        </Link>

        <p className="complaint-desc text-muted mb-3">
          {complaint.description?.substring(0, 100)}
          {complaint.description?.length > 100 && '...'}
        </p>

        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center text-muted small">
            {showUser && (
              <span className="me-3">
                <i className="bi bi-person me-1"></i>
                {complaint.user_name}
              </span>
            )}
            <span>
              <i className="bi bi-calendar3 me-1"></i>
              {formatRelativeTime(complaint.created_at)}
            </span>
          </div>
          <Link 
            to={`/complaints/${complaint.id}`} 
            className="btn btn-sm btn-outline-primary"
          >
            View <i className="bi bi-arrow-right ms-1"></i>
          </Link>
        </div>

        {complaint.image_path && (
          <div className="mt-3 pt-3 border-top">
            <small className="text-muted">
              <i className="bi bi-paperclip me-1"></i>
              Attachment included
            </small>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComplaintCard;