import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import { adminService } from '../services/complaintService';
import './AdminAnalytics.css';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminAnalytics = () => {
  const [stats, setStats] = useState({ total: 0, Pending: 0, 'In Progress': 0, Resolved: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await adminService.getStats();
      setStats(data.stats);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statusChartData = {
    labels: ['Pending', 'In Progress', 'Resolved'],
    datasets: [{
      data: [stats.Pending || 1, stats['In Progress'] || 1, stats.Resolved || 1],
      backgroundColor: ['#F59E0B', '#3B82F6', '#10B981'],
      borderWidth: 0
    }]
  };

  const categoryData = {
    labels: ['Electrical', 'Network', 'Maintenance', 'Others'],
    datasets: [{
      label: 'Complaints by Category',
      data: [15, 25, 10, 5],
      backgroundColor: ['#F59E0B', '#3B82F6', '#10B981', '#6B7280']
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' }
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
    <div className="admin-analytics">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="mb-0">Analytics</h4>
          <p className="text-muted mb-0 small">View complaint statistics and trends</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="row g-3 mb-4">
        <div className="col-6 col-md-3">
          <div className="summary-card">
            <div className="summary-value">{stats.total}</div>
            <div className="summary-label">Total Complaints</div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="summary-card">
            <div className="summary-value text-warning">{stats.Pending}</div>
            <div className="summary-label">Pending</div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="summary-card">
            <div className="summary-value text-info">{stats['In Progress']}</div>
            <div className="summary-label">In Progress</div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="summary-card">
            <div className="summary-value text-success">{stats.Resolved}</div>
            <div className="summary-label">Resolved</div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="row g-4 mb-4">
        <div className="col-md-6">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white py-3">
              <h6 className="mb-0">Complaints by Status</h6>
            </div>
            <div className="card-body" style={{ height: '300px' }}>
              <Doughnut data={statusChartData} options={chartOptions} />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white py-3">
              <h6 className="mb-0">Complaints by Category</h6>
            </div>
            <div className="card-body" style={{ height: '300px' }}>
              <Bar data={categoryData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <div className="row g-3">
        <div className="col-md-4">
          <div className="info-card">
            <i className="bi bi-clock-history text-warning fs-4 mb-2"></i>
            <div className="h4 mb-1">{stats.total > 0 ? Math.round((stats.Resolved / stats.total) * 100) : 0}%</div>
            <div className="text-muted small">Resolution Rate</div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="info-card">
            <i className="bi bi-arrow-repeat text-info fs-4 mb-2"></i>
            <div className="h4 mb-1">{stats['In Progress']}</div>
            <div className="text-muted small">In Progress</div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="info-card">
            <i className="bi bi-exclamation-triangle text-danger fs-4 mb-2"></i>
            <div className="h4 mb-1">{stats.Pending}</div>
            <div className="text-muted small">Pending</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;