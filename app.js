const express = require('express')
const app = express()
const authRoutes = require('./routes/auth')
const tasksRoutes = require('./routes/tasks')
const costsRoutes = require('./routes/costs')
const incomeRoutes = require('./routes/income')
const analyticsRoutes = require('./routes/analytics')

app.use(require('cors')())
app.use(require('morgan')('dev'))


app.use('/api/auth', authRoutes)
app.use('/api/organizer', tasksRoutes)
app.use('/api/wallet/costs', costsRoutes)
app.use('/api/wallet/income', incomeRoutes)
app.use('/api/analytics/overview', analyticsRoutes)
module.exports = app
