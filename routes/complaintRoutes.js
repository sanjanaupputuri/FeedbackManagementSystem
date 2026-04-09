const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const { adminMiddleware } = require('../middleware/adminAuth');
const {
  createComplaint,
  getMyComplaints,
  getComplaintById,
  getAllComplaints,
  updateComplaint,
  deleteComplaint,
  getStats
} = require('../controllers/complaintController');

// User routes
router.post('/', authMiddleware, createComplaint);
router.get('/my', authMiddleware, getMyComplaints);
router.get('/:id', authMiddleware, getComplaintById);

// Admin routes
router.get('/admin/all', authMiddleware, adminMiddleware, getAllComplaints);
router.get('/admin/stats', authMiddleware, adminMiddleware, getStats);
router.put('/admin/:id', authMiddleware, adminMiddleware, updateComplaint);
router.delete('/admin/:id', authMiddleware, adminMiddleware, deleteComplaint);

module.exports = router;
