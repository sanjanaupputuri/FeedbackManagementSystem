const Complaint = require('../models/Complaint');
const logger = require('../utils/logger');

exports.getAllComplaints = async (req, res) => {
  try {
    const { page = 1, limit = 20, status, category, priority, search } = req.query;
    console.log('Admin complaints request:', { page, limit, status, category, priority, search });

    const filters = {};
    if (status) filters.status = status;
    if (category) filters.category = category;
    if (priority) filters.priority = priority;

    const result = await Complaint.findAllPaginated(parseInt(page), parseInt(limit), filters);
    console.log('Query result:', { complaintsCount: result.complaints.length, total: result.total });
    
    let complaints = result.complaints;
    
    // Apply search filter if provided
    if (search) {
      const searchLower = search.toLowerCase();
      complaints = complaints.filter(c => 
        c.title.toLowerCase().includes(searchLower) ||
        c.description.toLowerCase().includes(searchLower) ||
        c.user_name.toLowerCase().includes(searchLower) ||
        c.user_email.toLowerCase().includes(searchLower)
      );
    }
    
    res.json({
      complaints,
      pagination: {
        total: result.total,
        page: result.page,
        limit: parseInt(limit),
        pages: result.totalPages
      }
    });
  } catch (error) {
    console.error('Get all complaints error:', error);
    logger.error('Get all complaints error:', error);
    res.status(500).json({ message: 'Error fetching complaints', error: error.message });
  }
};

exports.updateComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, priority } = req.body;
    const adminId = req.user.id;

    const complaint = await Complaint.findById(id);
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    await Complaint.update(id, status || complaint.status, priority || complaint.priority);
    res.json({ message: 'Complaint updated successfully' });
  } catch (error) {
    logger.error('Update complaint error:', error);
    res.status(500).json({ message: 'Error updating complaint' });
  }
};

exports.deleteComplaint = async (req, res) => {
  try {
    const { id } = req.params;

    const complaint = await Complaint.findById(id);
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    await Complaint.delete(id);
    res.json({ message: 'Complaint deleted successfully' });
  } catch (error) {
    logger.error('Delete complaint error:', error);
    res.status(500).json({ message: 'Error deleting complaint' });
  }
};

exports.getStats = async (req, res) => {
  try {
    const stats = await Complaint.getStats();
    const statsObj = { total: 0 };
    
    stats.forEach(stat => {
      statsObj[stat.status] = stat.count;
      statsObj.total += stat.count;
    });
    
    res.json({ stats: statsObj });
  } catch (error) {
    logger.error('Get stats error:', error);
    res.status(500).json({ message: 'Error fetching statistics' });
  }
};
