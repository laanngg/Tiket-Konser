const db   = require('../config/database')
const crypto = require('crypto')

// Generate order code
const genCode = () => 'KK' + Date.now().toString(36).toUpperCase() + crypto.randomBytes(2).toString('hex').toUpperCase()
// Generate ticket code
const genTicket = () => 'TKT-' + crypto.randomBytes(6).toString('hex').toUpperCase()

// POST /api/orders  — create order + tickets
exports.create = async (req, res) => {
  const conn = await db.getConnection()
  try {
    await conn.beginTransaction()
    const { user_name, user_email, user_phone, event_id, ticket_type_id, quantity, payment_method } = req.body

    // Validate ticket type & quota
    const [[tt]] = await conn.query('SELECT * FROM ticket_types WHERE id = ? AND event_id = ?', [ticket_type_id, event_id])
    if (!tt) { await conn.rollback(); return res.status(400).json({ success: false, message: 'Tipe tiket tidak ditemukan' }) }
    if (tt.quota - tt.sold < quantity) { await conn.rollback(); return res.status(400).json({ success: false, message: 'Kuota tiket tidak mencukupi' }) }

    const total = tt.price * quantity
    const order_code = genCode()

    const [oResult] = await conn.query(
      `INSERT INTO orders (order_code,user_name,user_email,user_phone,event_id,ticket_type_id,quantity,unit_price,total_price,payment_method)
       VALUES (?,?,?,?,?,?,?,?,?,?)`,
      [order_code, user_name, user_email, user_phone, event_id, ticket_type_id, quantity, tt.price, total, payment_method]
    )
    const order_id = oResult.insertId

    // Generate tickets
    const tickets = []
    for (let i = 0; i < quantity; i++) {
      const code = genTicket()
      await conn.query('INSERT INTO tickets (order_id, ticket_code, holder_name) VALUES (?,?,?)', [order_id, code, user_name])
      tickets.push(code)
    }

    // Update sold count
    await conn.query('UPDATE ticket_types SET sold = sold + ? WHERE id = ?', [quantity, ticket_type_id])

    await conn.commit()
    res.status(201).json({ success: true, data: { order_code, order_id, total_price: total, tickets } })
  } catch (err) {
    await conn.rollback()
    res.status(500).json({ success: false, message: err.message })
  } finally {
    conn.release()
  }
}

// GET /api/orders/:code  — get order by code
exports.getByCode = async (req, res) => {
  try {
    const [[order]] = await db.query(`
      SELECT o.*, e.title AS event_title, e.venue, e.city, e.event_date, e.image_url,
             t.name AS ticket_type_name
      FROM orders o
      JOIN events e ON e.id = o.event_id
      JOIN ticket_types t ON t.id = o.ticket_type_id
      WHERE o.order_code = ?
    `, [req.params.code])
    if (!order) return res.status(404).json({ success: false, message: 'Order tidak ditemukan' })
    const [tickets] = await db.query('SELECT * FROM tickets WHERE order_id = ?', [order.id])
    res.json({ success: true, data: { ...order, tickets } })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

// POST /api/orders/:code/pay  — mark as paid
exports.pay = async (req, res) => {
  try {
    const { payment_proof } = req.body
    await db.query(
      `UPDATE orders SET payment_status='paid', paid_at=NOW(), payment_proof=? WHERE order_code=?`,
      [payment_proof || null, req.params.code]
    )
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

// GET /api/admin/orders  — all orders (admin)
exports.adminGetAll = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT o.*, e.title AS event_title, t.name AS ticket_type_name
      FROM orders o
      JOIN events e ON e.id = o.event_id
      JOIN ticket_types t ON t.id = o.ticket_type_id
      ORDER BY o.created_at DESC
      LIMIT 200
    `)
    res.json({ success: true, data: rows })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

// PUT /api/admin/orders/:id/status  (admin)
exports.adminUpdateStatus = async (req, res) => {
  try {
    await db.query('UPDATE orders SET payment_status=? WHERE id=?', [req.body.status, req.params.id])
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}
