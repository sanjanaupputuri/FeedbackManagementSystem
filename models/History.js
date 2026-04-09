const db = require('../config/database');

class History {
  static async create(complaintId, changedBy, fieldName, oldValue, newValue) {
    await db.execute(
      'INSERT INTO complaint_history (complaint_id, changed_by, field_name, old_value, new_value) VALUES (?, ?, ?, ?, ?)',
      [complaintId, changedBy, fieldName, oldValue, newValue]
    );
  }

  static async findByComplaintId(complaintId) {
    const [rows] = await db.execute(
      'SELECT h.*, u.name as changed_by_name FROM complaint_history h JOIN users u ON h.changed_by = u.id WHERE h.complaint_id = ? ORDER BY h.changed_at DESC',
      [complaintId]
    );
    return rows;
  }
}

module.exports = History;
