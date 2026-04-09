const Comment = require('../models/Comment');
const Complaint = require('../models/Complaint');

exports.addComment = async (req, res) => {
  try {
    const { comment } = req.body;
    const complaintId = req.params.id;
    const userId = req.user.id;

    const complaint = await Complaint.findById(complaintId);
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    if (complaint.user_id !== userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const commentId = await Comment.create(complaintId, userId, comment);
    res.status(201).json({ message: 'Comment added successfully', commentId });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getComments = async (req, res) => {
  try {
    const complaintId = req.params.id;
    const complaint = await Complaint.findById(complaintId);
    
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    if (complaint.user_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const comments = await Comment.findByComplaintId(complaintId);
    res.json({ comments });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
