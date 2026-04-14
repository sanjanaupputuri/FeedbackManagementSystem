const Complaint = require('../models/Complaint');
const History = require('../models/History');

exports.createComplaint = async (req, res) => {
  try {
    const { title, description, category, priority } = req.body;
    const userId = req.user.id;
    const imagePath = req.file ? req.file.path : null;

    const complaintId = await Complaint.create(userId, title, description, category, priority || 'Low', imagePath);
    res.status(201).json({ message: 'Complaint submitted successfully', complaintId });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getMyComplaints = async (req, res) => {
  try {
    const filters = {
      status: req.query.status,
      category: req.query.category
    };
    const complaints = await Complaint.findByUserId(req.user.id, filters);
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
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const filters = {
      status: req.query.status,
      category: req.query.category,
      priority: req.query.priority
    };

    const result = await Complaint.findAllPaginated(page, limit, filters);
    res.json(result);
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

    // Log changes to history
    if (status && status !== complaint.status) {
      await History.create(req.params.id, req.user.id, 'status', complaint.status, status);
    }
    if (priority && priority !== complaint.priority) {
      await History.create(req.params.id, req.user.id, 'priority', complaint.priority, priority);
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

exports.getUserStats = async (req, res) => {
  try {
    const userId = req.user.id;
    const stats = await Complaint.getUserStats(userId);
    res.json({ stats });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getRecentComplaints = async (req, res) => {
  try {
    const userId = req.user.id;
    const limit = parseInt(req.query.limit) || 5;
    const complaints = await Complaint.getRecentByUser(userId, limit);
    res.json({ complaints });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    if (complaint.user_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const history = await History.findByComplaintId(req.params.id);
    res.json({ history });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
