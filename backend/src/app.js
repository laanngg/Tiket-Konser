const express = require('express')
const cors    = require('cors')
require('dotenv').config()

const app = express()

app.use(cors({ origin: '*' }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', require('./routes/index'))

app.get('/', (_, res) => res.json({ success: true, message: 'KonserKu API 🚀' }))

module.exports = app
