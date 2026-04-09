const db = require('../config/database');

class Comment {
  static async create(complaintId, userId, comment) {
    const [result] = await db.execute(
      'INSERT INTO complaint_comments (complaint_id, user_id, comment) VALUES (?, ?, ?)',
      [complaintId, userId, comment]
    );
    return result.insertId;
  }

  static async findByComplaintId(complaintId) {
    const [rows] = await db.execute(
      'SELECT c.*, u.name as user_name, u.role FROM complaint_comments c JOIN users u ON c.user_id = u.id WHERE c.complaint_id = ? ORDER BY c.created_at ASC',
      [complaintId]
    );
    return rows;
  }
}

module.exports = Comment;
