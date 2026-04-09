const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const { adminMiddleware } = require('../middleware/adminAuth');
const { validateComplaintUpdate, handleValidationErrors } = require('../middleware/validation');
const {
  getAllComplaints,
  updateComplaint,
  deleteComplaint,
  getStats
} = require('../controllers/complaintController');

router.use(authMiddleware, adminMiddleware);

router.get('/complaints', getAllComplaints);
router.get('/stats', getStats);
router.put('/complaints/:id', validateComplaintUpdate, handleValidationErrors, updateComplaint);
router.delete('/complaints/:id', deleteComplaint);

module.exports = router;
