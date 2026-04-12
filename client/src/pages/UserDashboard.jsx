import React from 'react';
import { useAuth } from '../context/AuthContext';

const UserDashboard = () => {
  const { user } = useAuth();
  
  return (
    <div className="container py-4">
      <h1>Welcome, {user?.name}!</h1>
      <p>User Dashboard - Coming Soon</p>
    </div>
  );
};

export default UserDashboard;
