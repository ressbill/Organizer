const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')
const keys = require('./utils/keys')
const app = express()
mongoose.connect(keys.mongoURI,{useUnifiedTopology: true , useNewUrlParser: true})
    .then(() => {
        console.log('DB Connected')
    }).catch(e => console.log(e))


const authRoutes = require('./routes/auth')
const tasksRoutes = require('./routes/tasks')
const costsRoutes = require('./routes/costs')
const incomeRoutes = require('./routes/income')
const analyticsRoutes = require('./routes/analytics')


app.use(require('cors')())
app.use(require('morgan')('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())




app.use('/api/auth', authRoutes)
app.use('/api/organizer/tasks', tasksRoutes)
app.use('/api/wallet/costs', costsRoutes)
app.use('/api/wallet/income', incomeRoutes)
app.use('/api/analytics/overview', analyticsRoutes)

app.use( (error, req, res, next) => {
    if(!error.status){
        error.status = 500
    }
    res.status(error.status).json({message: error.message})
})

if (process.env.NODE_ENV === 'production'){
    app.use(express.static('client/dist/client'))

    app.get('*', (req, res) => {
        res.sendFile(
            path.resolve(
                __dirname,'client', 'dist', 'client', 'index.html'
            )
        )
    })
}

module.exports = app
