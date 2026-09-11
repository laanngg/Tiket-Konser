const db = require('../config/database')

// GET /api/events
exports.getAll = async (req, res) => {
  try {
    const { category, city, search, limit = 20, page = 1 } = req.query
    let sql = `
      SELECT e.*,
        MIN(t.price) AS min_price,
        SUM(t.quota) AS total_quota,
        SUM(t.sold)  AS total_sold
      FROM events e
      LEFT JOIN ticket_types t ON t.event_id = e.id
      WHERE 1=1
    `
    const params = []
    if (category) { sql += ' AND e.category = ?'; params.push(category) }
    if (city)     { sql += ' AND e.city = ?';     params.push(city) }
    if (search)   { sql += ' AND e.title LIKE ?';  params.push(`%${search}%`) }
    sql += ' GROUP BY e.id ORDER BY e.event_date ASC LIMIT ? OFFSET ?'
    params.push(Number(limit), (Number(page) - 1) * Number(limit))
    const [rows] = await db.query(sql, params)
    res.json({ success: true, data: rows })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

// GET /api/events/:id
exports.getOne = async (req, res) => {
  try {
    const [[event]] = await db.query('SELECT * FROM events WHERE id = ?', [req.params.id])
    if (!event) return res.status(404).json({ success: false, message: 'Event tidak ditemukan' })
    const [types] = await db.query('SELECT * FROM ticket_types WHERE event_id = ?', [req.params.id])
    res.json({ success: true, data: { ...event, ticket_types: types } })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

// POST /api/events  (admin)
exports.create = async (req, res) => {
  try {
    const { title, description, category, venue, city, event_date, organizer, image_url } = req.body
    const [result] = await db.query(
      'INSERT INTO events (title,description,category,venue,city,event_date,organizer,image_url) VALUES (?,?,?,?,?,?,?,?)',
      [title, description, category, venue, city, event_date, organizer, image_url]
    )
    res.status(201).json({ success: true, data: { id: result.insertId } })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

// PUT /api/events/:id  (admin)
exports.update = async (req, res) => {
  try {
    const { title, description, category, venue, city, event_date, organizer, image_url, status } = req.body
    await db.query(
      'UPDATE events SET title=?,description=?,category=?,venue=?,city=?,event_date=?,organizer=?,image_url=?,status=? WHERE id=?',
      [title, description, category, venue, city, event_date, organizer, image_url, status, req.params.id]
    )
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

// DELETE /api/events/:id  (admin)
exports.remove = async (req, res) => {
  try {
    await db.query('DELETE FROM events WHERE id = ?', [req.params.id])
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}
