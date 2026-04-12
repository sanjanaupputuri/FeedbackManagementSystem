import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import ComplaintCard from '../components/complaints/ComplaintCard';
import { complaintService } from '../services/complaintService';
import './MyComplaints.css';

const statusOptions = ['All', 'Pending', 'In Progress', 'Resolved'];
const categoryOptions = ['All', 'Electrical', 'Network', 'Maintenance', 'Others'];

const MyComplaints = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');

  const [filters, setFilters] = useState({
    status: searchParams.get('status') || 'All',
    category: searchParams.get('category') || 'All',
    search: searchParams.get('search') || ''
  });

  useEffect(() => {
    fetchComplaints();
  }, [filters.status, filters.category]);

  const fetchComplaints = async () => {
    setLoading(true);
    try {
      const params = {};
      if (filters.status !== 'All') params.status = filters.status;
      if (filters.category !== 'All') params.category = filters.category;
      
      const data = await complaintService.getMine(params);
      setComplaints(data.complaints || []);
    } catch (error) {
      console.error('Error fetching complaints:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    if (value === 'All') {
      searchParams.delete(key);
    } else {
      searchParams.set(key, value);
    }
    setSearchParams(searchParams);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = complaints.filter(c => 
      c.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      c.description.toLowerCase().includes(filters.search.toLowerCase())
    );
    setComplaints(filtered);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      
      <main className="flex-grow-1 bg-light">
        <div className="container py-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h4 className="mb-0">My Complaints</h4>
              <p className="text-muted mb-0 small">View and manage your complaints</p>
            </div>
            <Link to="/submit" className="btn btn-primary">
              <i className="bi bi-plus-circle me-2"></i>
              New Complaint
            </Link>
          </div>

          {/* Filters */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body">
              <div className="row g-3 align-items-center">
                <div className="col-md-4">
                  <form onSubmit={handleSearch}>
                    <div className="input-group">
                      <span className="input-group-text bg-white">
                        <i className="bi bi-search"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search complaints..."
                        value={filters.search}
                        onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                      />
                    </div>
                  </form>
                </div>
                <div className="col-md-2">
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
                <div className="col-md-2">
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
                <div className="col-md-4 d-flex justify-content-end gap-2">
                  <div className="btn-group">
                    <button
                      className={`btn btn-sm ${viewMode === 'grid' ? 'btn-primary' : 'btn-outline-primary'}`}
                      onClick={() => setViewMode('grid')}
                    >
                      <i className="bi bi-grid-3x3-gap"></i>
                    </button>
                    <button
                      className={`btn btn-sm ${viewMode === 'list' ? 'btn-primary' : 'btn-outline-primary'}`}
                      onClick={() => setViewMode('list')}
                    >
                      <i className="bi bi-list-ul"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="card border-0 shadow-sm">
            <div className="card-body p-3">
              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : complaints.length > 0 ? (
                viewMode === 'grid' ? (
                  <div className="row g-3">
                    {complaints.map((complaint, index) => (
                      <div className="col-md-6 col-lg-4" key={complaint.id}>
                        <div style={{ animationDelay: `${index * 50}ms` }}>
                          <ComplaintCard complaint={complaint} />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Title</th>
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
                              <Link to={`/complaints/${complaint.id}`} className="text-decoration-none">
                                {complaint.title}
                              </Link>
                            </td>
                            <td>{complaint.category}</td>
                            <td>
                              <span className={`badge priority-${complaint.priority.toLowerCase()}`}>
                                {complaint.priority}
                              </span>
                            </td>
                            <td>
                              <span className={`badge status-${complaint.status.toLowerCaseCase?.().replace(' ', '-')}`}>
                                {complaint.status}
                              </span>
                            </td>
                            <td>{new Date(complaint.created_at).toLocaleDateString()}</td>
                            <td>
                              <Link to={`/complaints/${complaint.id}`} className="btn btn-sm btn-outline-primary">
                                View
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )
              ) : (
                <div className="text-center py-5">
                  <i className="bi bi-inbox text-muted fs-1 d-block mb-3"></i>
                  <h5>No complaints found</h5>
                  <p className="text-muted mb-3">
                    {filters.search || filters.status !== 'All' || filters.category !== 'All'
                      ? 'Try adjusting your filters'
                      : "You haven't submitted any complaints yet"}
                  </p>
                  <Link to="/submit" className="btn btn-primary">
                    Submit Your First Complaint
                  </Link>
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

export default MyComplaints;