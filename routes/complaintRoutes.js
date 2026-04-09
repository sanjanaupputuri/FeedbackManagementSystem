const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const { adminMiddleware } = require('../middleware/adminAuth');
const upload = require('../middleware/upload');
const { validateComplaint, validateComplaintUpdate, handleValidationErrors } = require('../middleware/validation');
const {
  createComplaint,
  getMyComplaints,
  getComplaintById,
  getAllComplaints,
  updateComplaint,
  deleteComplaint,
  getStats,
  getHistory
} = require('../controllers/complaintController');
const { addComment, getComments } = require('../controllers/commentController');

// User routes
router.post('/', authMiddleware, upload.single('image'), validateComplaint, handleValidationErrors, createComplaint);
router.get('/my', authMiddleware, getMyComplaints);
router.get('/:id', authMiddleware, getComplaintById);
router.post('/:id/comments', authMiddleware, addComment);
router.get('/:id/comments', authMiddleware, getComments);
router.get('/:id/history', authMiddleware, getHistory);

// Admin routes
router.get('/admin/complaints', authMiddleware, adminMiddleware, getAllComplaints);
router.get('/admin/stats', authMiddleware, adminMiddleware, getStats);
router.put('/admin/complaints/:id', authMiddleware, adminMiddleware, validateComplaintUpdate, handleValidationErrors, updateComplaint);
router.delete('/admin/complaints/:id', authMiddleware, adminMiddleware, deleteComplaint);

module.exports = router;
