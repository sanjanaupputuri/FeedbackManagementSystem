const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const upload = require('../middleware/upload');
const { validateComplaint, handleValidationErrors } = require('../middleware/validation');
const {
  createComplaint,
  getMyComplaints,
  getComplaintById,
  getHistory,
  getUserStats,
  getRecentComplaints
} = require('../controllers/complaintController');
const { addComment, getComments } = require('../controllers/commentController');

// User routes
router.post('/', authMiddleware, upload.single('image'), validateComplaint, handleValidationErrors, createComplaint);
router.get('/my', authMiddleware, getMyComplaints);
router.get('/stats', authMiddleware, getUserStats);
router.get('/recent', authMiddleware, getRecentComplaints);
router.get('/:id', authMiddleware, getComplaintById);
router.post('/:id/comments', authMiddleware, addComment);
router.get('/:id/comments', authMiddleware, getComments);
router.get('/:id/history', authMiddleware, getHistory);

module.exports = router;
