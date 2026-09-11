const db = require('../config/database')

// Dashboard stats
exports.stats = async (req, res) => {
  try {
    const [[{ total_orders }]]  = await db.query("SELECT COUNT(*) AS total_orders FROM orders")
    const [[{ total_revenue }]] = await db.query("SELECT COALESCE(SUM(total_price),0) AS total_revenue FROM orders WHERE payment_status='paid'")
    const [[{ total_events }]]  = await db.query("SELECT COUNT(*) AS total_events FROM events")
    const [[{ total_users }]]   = await db.query("SELECT COUNT(*) AS total_users FROM users WHERE role='user'")
    const [[{ pending }]]       = await db.query("SELECT COUNT(*) AS pending FROM orders WHERE payment_status='pending'")

    // Revenue last 7 days
    const [daily] = await db.query(`
      SELECT DATE(created_at) AS date, SUM(total_price) AS revenue, COUNT(*) AS orders
      FROM orders WHERE payment_status='paid' AND created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
      GROUP BY DATE(created_at) ORDER BY date ASC
    `)

    // Top events
    const [topEvents] = await db.query(`
      SELECT e.title, e.category, COUNT(o.id) AS total_orders, SUM(o.total_price) AS revenue
      FROM orders o JOIN events e ON e.id = o.event_id
      WHERE o.payment_status = 'paid'
      GROUP BY e.id ORDER BY revenue DESC LIMIT 5
    `)

    res.json({ success: true, data: { total_orders, total_revenue, total_events, total_users, pending, daily, topEvents } })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

// Users list
exports.getUsers = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id,name,email,phone,role,created_at FROM users ORDER BY created_at DESC')
    res.json({ success: true, data: rows })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

// Ticket types for an event
exports.getTicketTypes = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM ticket_types WHERE event_id = ?', [req.params.eventId])
    res.json({ success: true, data: rows })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

exports.createTicketType = async (req, res) => {
  try {
    const { event_id, name, price, quota, description } = req.body
    const [r] = await db.query(
      'INSERT INTO ticket_types (event_id,name,price,quota,description) VALUES (?,?,?,?,?)',
      [event_id, name, price, quota, description]
    )
    res.status(201).json({ success: true, data: { id: r.insertId } })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

exports.updateTicketType = async (req, res) => {
  try {
    const { name, price, quota, description } = req.body
    await db.query('UPDATE ticket_types SET name=?,price=?,quota=?,description=? WHERE id=?',
      [name, price, quota, description, req.params.id])
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}
