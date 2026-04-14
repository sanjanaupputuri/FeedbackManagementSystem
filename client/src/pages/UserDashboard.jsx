import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import StatsCard from '../components/dashboard/StatsCard';
import ComplaintCard from '../components/complaints/ComplaintCard';
import { complaintService } from '../services/complaintService';
import './UserDashboard.css';

const UserDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ total: 0, Pending: 0, 'In Progress': 0, Resolved: 0 });
  const [recentComplaints, setRecentComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, recentData] = await Promise.all([
          complaintService.getStats(),
          complaintService.getRecent(5)
        ]);
        setStats(statsData.stats);
        setRecentComplaints(recentData.complaints || []);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      
      <main className="flex-grow-1">
        <div className="container py-4">
          {/* Welcome Banner */}
          <div className="welcome-banner bg-white rounded-3 p-4 mb-4 shadow-sm">
            <div className="row align-items-center">
              <div className="col-md-8">
                <h4 className="mb-1">Welcome back, {user?.name}!</h4>
                <p className="text-muted mb-0">{today}</p>
              </div>
              <div className="col-md-4 text-md-end">
                <Link to="/submit" className="btn btn-primary">
                  <i className="bi bi-plus-circle me-2"></i>
                  Submit Complaint
                </Link>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="row g-3 mb-4">
            <div className="col-6 col-lg-3">
              <StatsCard
                title="Total"
                value={stats.total}
                icon="bi bi-journal-text"
                color="primary"
                link="/my-complaints"
                loading={loading}
              />
            </div>
            <div className="col-6 col-lg-3">
              <StatsCard
                title="Pending"
                value={stats.Pending}
                icon="bi bi-clock"
                color="warning"
                link="/my-complaints?status=Pending"
                loading={loading}
              />
            </div>
            <div className="col-6 col-lg-3">
              <StatsCard
                title="In Progress"
                value={stats['In Progress']}
                icon="bi bi-arrow-repeat"
                color="info"
                link="/my-complaints?status=In Progress"
                loading={loading}
              />
            </div>
            <div className="col-6 col-lg-3">
              <StatsCard
                title="Resolved"
                value={stats.Resolved}
                icon="bi bi-check-circle"
                color="success"
                link="/my-complaints?status=Resolved"
                loading={loading}
              />
            </div>
          </div>

          <div className="row g-4">
            {/* Recent Complaints */}
            <div className="col-lg-8">
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-white d-flex justify-content-between align-items-center py-3">
                  <h5 className="mb-0">Recent Complaints</h5>
                  <Link to="/my-complaints" className="btn btn-sm btn-outline-primary">
                    View All <i className="bi bi-arrow-right ms-1"></i>
                  </Link>
                </div>
                <div className="card-body p-3">
                  {loading ? (
                    <div className="text-center py-4">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  ) : recentComplaints.length > 0 ? (
                    <div className="row g-3">
                      {recentComplaints.map((complaint, index) => (
                        <div className="col-12" key={complaint.id} style={{ animationDelay: `${index * 50}ms` }}>
                          <ComplaintCard complaint={complaint} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <i className="bi bi-inbox text-muted fs-1 d-block mb-3"></i>
                      <p className="text-muted mb-3">No complaints yet</p>
                      <Link to="/submit" className="btn btn-primary">
                        Submit Your First Complaint
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="col-lg-4">
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-header bg-white py-3">
                  <h5 className="mb-0">Quick Actions</h5>
                </div>
                <div className="card-body p-0">
                  <div className="list-group list-group-flush">
                    <Link to="/submit" className="list-group-item list-group-item-action d-flex align-items-center py-3">
                      <div className="quick-action-icon me-3">
                        <i className="bi bi-plus-circle"></i>
                      </div>
                      <div>
                        <div className="fw-medium">Submit New Complaint</div>
                        <small className="text-muted">File a new complaint</small>
                      </div>
                    </Link>
                    <Link to="/my-complaints" className="list-group-item list-group-item-action d-flex align-items-center py-3">
                      <div className="quick-action-icon me-3">
                        <i className="bi bi-journal-text"></i>
                      </div>
                      <div>
                        <div className="fw-medium">My Complaints</div>
                        <small className="text-muted">View all complaints</small>
                      </div>
                    </Link>
                    <Link to="/profile" className="list-group-item list-group-item-action d-flex align-items-center py-3">
                      <div className="quick-action-icon me-3">
                        <i className="bi bi-person"></i>
                      </div>
                      <div>
                        <div className="fw-medium">My Profile</div>
                        <small className="text-muted">Know your information</small>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Tips */}
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-white py-3">
                  <h5 className="mb-0">Tips</h5>
                </div>
                <div className="card-body">
                  <div className="tip-item mb-3">
                    <i className="bi bi-lightbulb text-warning me-2"></i>
                    <span className="small">Use specific titles for faster resolution</span>
                  </div>
                  <div className="tip-item mb-3">
                    <i className="bi bi-lightbulb text-warning me-2"></i>
                    <span className="small">Add images to describe the issue better</span>
                  </div>
                  <div className="tip-item">
                    <i className="bi bi-lightbulb text-warning me-2"></i>
                    <span className="small">Check your dashboard regularly for updates</span>
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

export default UserDashboard;