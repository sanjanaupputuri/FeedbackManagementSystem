const Complaint = require('../models/Complaint');

exports.createComplaint = async (req, res) => {
  try {
    const { title, description, category, priority } = req.body;
    const userId = req.user.id;

    const complaintId = await Complaint.create(userId, title, description, category, priority || 'Low');
    res.status(201).json({ message: 'Complaint submitted successfully', complaintId });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.findByUserId(req.user.id);
    res.json({ complaints });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }
    
    if (complaint.user_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json({ complaint });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.findAll();
    res.json({ complaints });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateComplaint = async (req, res) => {
  try {
    const { status, priority } = req.body;
    const complaint = await Complaint.findById(req.params.id);
    
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    await Complaint.update(req.params.id, status || complaint.status, priority || complaint.priority);
    res.json({ message: 'Complaint updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deleteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    await Complaint.delete(req.params.id);
    res.json({ message: 'Complaint deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getStats = async (req, res) => {
  try {
    const stats = await Complaint.getStats();
    const formattedStats = {
      total: 0,
      Pending: 0,
      'In Progress': 0,
      Resolved: 0
    };

    stats.forEach(stat => {
      formattedStats[stat.status] = stat.count;
      formattedStats.total += stat.count;
    });

    res.json({ stats: formattedStats });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
