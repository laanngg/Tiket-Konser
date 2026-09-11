const router = require('express').Router()
const eventCtrl  = require('../controllers/eventController')
const orderCtrl  = require('../controllers/orderController')
const authCtrl   = require('../controllers/authController')
const adminCtrl  = require('../controllers/adminController')
const { authenticate, adminOnly } = require('../middleware/auth')

// ── Auth ──────────────────────────────────────────────────────
router.post('/auth/register', authCtrl.register)
router.post('/auth/login',    authCtrl.login)
router.get( '/auth/me',       authenticate, authCtrl.me)

// ── Events (public) ──────────────────────────────────────────
router.get('/events',     eventCtrl.getAll)
router.get('/events/:id', eventCtrl.getOne)

// ── Orders (public — no login required) ──────────────────────
router.post('/orders',           orderCtrl.create)
router.get( '/orders/:code',     orderCtrl.getByCode)
router.post('/orders/:code/pay', orderCtrl.pay)

// ── Admin ─────────────────────────────────────────────────────
router.get('/admin/stats',                    authenticate, adminOnly, adminCtrl.stats)
router.get('/admin/users',                    authenticate, adminOnly, adminCtrl.getUsers)
router.get('/admin/orders',                   authenticate, adminOnly, orderCtrl.adminGetAll)
router.put('/admin/orders/:id/status',        authenticate, adminOnly, orderCtrl.adminUpdateStatus)
router.get('/admin/events/:eventId/tickets',  authenticate, adminOnly, adminCtrl.getTicketTypes)
router.post('/admin/ticket-types',            authenticate, adminOnly, adminCtrl.createTicketType)
router.put('/admin/ticket-types/:id',         authenticate, adminOnly, adminCtrl.updateTicketType)

// ── Admin events CRUD ─────────────────────────────────────────
router.post('/admin/events',      authenticate, adminOnly, eventCtrl.create)
router.put( '/admin/events/:id',  authenticate, adminOnly, eventCtrl.update)
router.delete('/admin/events/:id',authenticate, adminOnly, eventCtrl.remove)

module.exports = router
