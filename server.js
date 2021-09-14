const express = require('express')
const path = require('path')
const users = require('./routes/users')
const connectDB = require('./db/connect')
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(__dirname))

app.get('/', function (req, res) {
    res.render(path.resolve(__dirname + '/index.ejs'))
})

app.use('/', users)
app.use('/login', users)

const port = 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => console.log(`Listening on port ${port}`))
    } catch(error) {
        console.log(error)
    }
}
start()