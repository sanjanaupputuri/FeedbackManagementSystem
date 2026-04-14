const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const { adminMiddleware } = require('../middleware/adminAuth');
const { validateComplaintUpdate, handleValidationErrors } = require('../middleware/validation');
const {
  getAllComplaints,
  updateComplaint,
  deleteComplaint,
  getStats,
  getCategoryStats,
  getComplaintById
} = require('../controllers/adminController');

router.use(authMiddleware, adminMiddleware);

router.get('/complaints', getAllComplaints);
router.get('/complaints/:id', getComplaintById);
router.get('/stats', getStats);
router.get('/category-stats', getCategoryStats);
router.put('/complaints/:id', validateComplaintUpdate, handleValidationErrors, updateComplaint);
router.delete('/complaints/:id', deleteComplaint);

module.exports = router;
