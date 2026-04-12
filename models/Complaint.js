const db = require('../config/database');

class Complaint {
  static async create(userId, title, description, category, priority, imagePath = null) {
    const [result] = await db.execute(
      'INSERT INTO complaints (user_id, title, description, category, priority, image_path) VALUES (?, ?, ?, ?, ?, ?)',
      [userId, title, description, category, priority, imagePath]
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

  static async findAllPaginated(page = 1, limit = 20, filters = {}) {
    const offset = (page - 1) * limit;
    const whereClauses = ['1=1'];
    const params = [];

    if (filters.status) {
      whereClauses.push('c.status = ?');
      params.push(filters.status);
    }
    if (filters.category) {
      whereClauses.push('c.category = ?');
      params.push(filters.category);
    }
    if (filters.priority) {
      whereClauses.push('c.priority = ?');
      params.push(filters.priority);
    }

    const whereSql = ` WHERE ${whereClauses.join(' AND ')}`;
    const dataQuery =
      'SELECT c.*, u.name as user_name, u.email as user_email FROM complaints c JOIN users u ON c.user_id = u.id' +
      whereSql +
      ` ORDER BY c.created_at DESC LIMIT ${parseInt(limit)} OFFSET ${parseInt(offset)}`;
    const countQuery = 'SELECT COUNT(*) as total FROM complaints c' + whereSql;

    const [rows] = await db.execute(dataQuery, params);
    const [countResult] = await db.execute(countQuery, params);
    
    return {
      complaints: rows,
      total: countResult[0].total,
      page,
      totalPages: Math.ceil(countResult[0].total / limit)
    };
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
