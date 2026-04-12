import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import SubmitComplaint from './pages/SubmitComplaint';
import MyComplaints from './pages/MyComplaints';
import ComplaintDetail from './pages/ComplaintDetail';
import AdminDashboard from './pages/AdminDashboard';
import AdminComplaints from './pages/AdminComplaints';
import AdminComplaintDetail from './pages/AdminComplaintDetail';
import AdminAnalytics from './pages/AdminAnalytics';
import Profile from './pages/Profile';
import About from './pages/About';
import Contact from './pages/Contact';

// Components
import PrivateRoute from './components/auth/PrivateRoute';
import AdminRoute from './components/auth/AdminRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            {/* User Routes */}
            <Route path="/dashboard" element={<PrivateRoute><UserDashboard /></PrivateRoute>} />
            <Route path="/submit" element={<PrivateRoute><SubmitComplaint /></PrivateRoute>} />
            <Route path="/my-complaints" element={<PrivateRoute><MyComplaints /></PrivateRoute>} />
            <Route path="/complaints/:id" element={<PrivateRoute><ComplaintDetail /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            <Route path="/admin/complaints" element={<AdminRoute><AdminComplaints /></AdminRoute>} />
            <Route path="/admin/complaints/:id" element={<AdminRoute><AdminComplaintDetail /></AdminRoute>} />
            <Route path="/admin/analytics" element={<AdminRoute><AdminAnalytics /></AdminRoute>} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
