const express = require('express')
const app = express()

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }));


const port = 3000

app.use('/css', express.static(__dirname + '/css'))
app.use('/js', express.static(__dirname + '/js'))
app.use('/img', express.static(__dirname + '/img'))

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
});

app.post('/', function(req, res) {

    console.log(req.body.first_name)
    console.log(req.body.last_name)
    console.log(req.body.email)
    console.log(req.body.password)

    res.end()
})

app.listen(port, () => `Listening on port ${port}` )
