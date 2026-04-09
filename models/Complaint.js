const db = require('../config/database');

class Complaint {
  static async create(userId, title, description, category, priority) {
    const [result] = await db.execute(
      'INSERT INTO complaints (user_id, title, description, category, priority) VALUES (?, ?, ?, ?, ?)',
      [userId, title, description, category, priority]
    );
    return result.insertId;
  }

  static async findByUserId(userId) {
    const [rows] = await db.execute(
      'SELECT * FROM complaints WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.execute('SELECT * FROM complaints WHERE id = ?', [id]);
    return rows[0];
  }

  static async findAll() {
    const [rows] = await db.execute(
      'SELECT c.*, u.name as user_name, u.email as user_email FROM complaints c JOIN users u ON c.user_id = u.id ORDER BY c.created_at DESC'
    );
    return rows;
  }

  static async update(id, status, priority) {
    await db.execute(
      'UPDATE complaints SET status = ?, priority = ? WHERE id = ?',
      [status, priority, id]
    );
  }

  static async delete(id) {
    await db.execute('DELETE FROM complaints WHERE id = ?', [id]);
  }

  static async getStats() {
    const [rows] = await db.execute(
      'SELECT status, COUNT(*) as count FROM complaints GROUP BY status'
    );
    return rows;
  }
}

module.exports = Complaint;
