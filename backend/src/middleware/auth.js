const jwt = require('jsonwebtoken')
const SECRET = process.env.JWT_SECRET || 'konserku_secret_2026'

exports.authenticate = (req, res, next) => {
  const header = req.headers.authorization
  if (!header || !header.startsWith('Bearer '))
    return res.status(401).json({ success: false, message: 'Token tidak ada' })
  try {
    req.user = jwt.verify(header.split(' ')[1], SECRET)
    next()
  } catch {
    res.status(401).json({ success: false, message: 'Token tidak valid' })
  }
}

exports.adminOnly = (req, res, next) => {
  if (req.user?.role !== 'admin')
    return res.status(403).json({ success: false, message: 'Akses ditolak' })
  next()
}
