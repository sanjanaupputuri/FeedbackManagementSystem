import React from 'react';
import { Link } from 'react-router-dom';
import './StatsCard.css';

const StatsCard = ({ 
  title, 
  value, 
  icon = 'bi bi-collection', 
  color = 'primary',
  trend = null,
  link = null,
  loading = false
}) => {
  const colorClass = `stats-card-${color}`;

  const cardContent = (
    <div className={`stats-card card border-0 shadow-sm ${colorClass}`}>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <p className="stats-title text-muted mb-1">{title}</p>
            <h2 className="stats-value mb-0">
              {loading ? (
                <span className="skeleton-loader d-inline-block" style={{width: '60px', height: '32px'}}></span>
              ) : (
                value
              )}
            </h2>
            {trend && (
              <p className={`stats-trend mb-0 ${trend > 0 ? 'trend-up' : trend < 0 ? 'trend-down' : ''}`}>
                {trend > 0 ? <i className="bi bi-arrow-up"></i> : trend < 0 ? <i className="bi bi-arrow-down"></i> : ''}
                {' '}{Math.abs(trend)}% {trend > 0 ? 'increase' : 'decrease'}
              </p>
            )}
          </div>
          <div className={`stats-icon ${color}`}>
            <i className={icon}></i>
          </div>
        </div>
      </div>
    </div>
  );

  if (link) {
    return (
      <Link to={link} className="text-decoration-none">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
};

export default StatsCard;