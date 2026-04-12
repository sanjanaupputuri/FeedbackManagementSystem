import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import CommentThread from '../components/complaints/CommentThread';
import { complaintService } from '../services/complaintService';
import { useToast } from '../context/ToastContext';
import { formatDate, formatRelativeTime } from '../utils/formatters';
import './ComplaintDetail.css';

const categoryIcons = {
  Electrical: 'bi-lightning-charge',
  Network: 'bi-wifi',
  Maintenance: 'bi-tools',
  Others: 'bi-folder'
};

const statusSteps = ['Pending', 'In Progress', 'Resolved'];

const ComplaintDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [complaint, setComplaint] = useState(null);
  const [comments, setComments] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComplaintData();
  }, [id]);

  const fetchComplaintData = async () => {
    try {
      const [complaintData, commentsData, historyData] = await Promise.all([
        complaintService.getById(id),
        complaintService.getComments(id),
        complaintService.getHistory(id)
      ]);
      setComplaint(complaintData.complaint);
      setComments(commentsData.comments || []);
      setHistory(historyData.history || []);
    } catch (error) {
      toast.error('Failed to load complaint');
      navigate('/my-complaints');
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async (comment) => {
    try {
      await complaintService.addComment(id, comment);
      const commentsData = await complaintService.getComments(id);
      setComments(commentsData.comments || []);
      toast.success('Comment added');
    } catch (error) {
      toast.error('Failed to add comment');
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

  const getCurrentStep = () => statusSteps.indexOf(complaint?.status);

  if (loading) {
    return (
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1 d-flex align-items-center justify-content-center">
          <div className="spinner-border text-primary" role="status"></div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      
      <main className="flex-grow-1 bg-light">
        <div className="container py-4">
          <Link to="/my-complaints" className="btn btn-link mb-3 ps-0">
            <i className="bi bi-arrow-left me-2"></i>
            Back to My Complaints
          </Link>

          <div className="row g-4">
            {/* Main Content */}
            <div className="col-lg-8">
              {/* Complaint Info */}
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body p-4">
                  {/* Header */}
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div className="d-flex align-items-center">
                      <i className={`bi ${categoryIcons[complaint?.category]} category-icon me-3`}></i>
                      <div>
                        <span className="text-muted small">{complaint?.category}</span>
                        <h4 className="mb-0">{complaint?.title}</h4>
                      </div>
                    </div>
                    <span className={`badge ${getStatusClass(complaint?.status)} fs-6`}>
                      {complaint?.status}
                    </span>
                  </div>

                  {/* Status Timeline */}
                  <div className="status-timeline mb-4">
                    {statusSteps.map((step, index) => (
                      <div 
                        key={step} 
                        className={`timeline-step ${index <= getCurrentStep() ? 'completed' : ''} ${index === getCurrentStep() ? 'current' : ''}`}
                      >
                        <div className="step-dot">
                          {index < getCurrentStep() ? (
                            <i className="bi bi-check"></i>
                          ) : (
                            <span>{index + 1}</span>
                          )}
                        </div>
                        <span className="step-label">{step}</span>
                        {index < statusSteps.length - 1 && <div className="step-line"></div>}
                      </div>
                    ))}
                  </div>

                  {/* Details */}
                  <div className="row g-3 mb-4">
                    <div className="col-6">
                      <small className="text-muted">Priority</small>
                      <div>
                        <span className={`badge ${getPriorityClass(complaint?.priority)}`}>
                          {complaint?.priority}
                        </span>
                      </div>
                    </div>
                    <div className="col-6">
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

              {/* Comments */}
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4">
                  <CommentThread 
                    comments={comments} 
                    onAddComment={handleAddComment} 
                  />
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-lg-4">
              {/* Status Card */}
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-header bg-white py-3">
                  <h6 className="mb-0">Status</h6>
                </div>
                <div className="card-body text-center">
                  <div className={`status-indicator ${getStatusClass(complaint?.status)} mb-3`}>
                    <i className={`bi ${
                      complaint?.status === 'Resolved' ? 'bi-check-circle' :
                      complaint?.status === 'In Progress' ? 'bi-arrow-repeat' :
                      'bi-clock'
                    }`}></i>
                  </div>
                  <h5>{complaint?.status}</h5>
                  <small className="text-muted">
                    Last updated {formatRelativeTime(complaint?.updated_at)}
                  </small>
                </div>
              </div>

              {/* History */}
              {history.length > 0 && (
                <div className="card border-0 shadow-sm">
                  <div className="card-header bg-white py-3">
                    <h6 className="mb-0">History</h6>
                  </div>
                  <div className="card-body p-0">
                    <div className="history-list">
                      {history.map((item, index) => (
                        <div key={index} className="history-item">
                          <div className="history-dot"></div>
                          <div>
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
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ComplaintDetail;