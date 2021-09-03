const express = require('express')
const path = require('path')

const app = express()

app.use(express.urlencoded({ extended: false }))

const port = 3000

app.use(express.static(__dirname))
/* app.use('/css', express.static(__dirname + '/css'))
app.use('/js', express.static(__dirname + '/js'))
app.use('/img', express.static(__dirname + '/img')) */

app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname + '/index.html'))
})

/* app.all('*', function (req, res) {
    res.status(404).send('resource not found')
}) */

app.post('/', function(req, res) {

    console.log(req.body)
})

app.listen(port, () => `Listening on port ${port}` )
