const express = require('express')
const path = require('path')
const users = require('./routes/users')
const connectDB = require('./db/connect')
const flash = require('express-flash')
const session = require('express-session')
const passport = require('passport')
require('dotenv').config()

const app = express()

//Passport config
require('./config/passport')(passport)

app.use(express.static(__dirname))

// Bodyparser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// EJS
app.set('view engine', 'ejs');

// Express Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Connect flash
app.use(flash())

//Global variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    next()
})

// Homepage
app.get('/', function (req, res) {
    res.render(path.resolve(__dirname + '/routes/index.ejs'))
})

// Routes
app.use('/', users)
app.use('/login', users)
app.use('/user', users)
app.use('/bookings', users)

const port = 3000

// Connect to MongoDB
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => console.log(`Listening on port ${port}`))
    } catch(error) {
        console.log(error)
    }
}
start()