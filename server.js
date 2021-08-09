const express = require('express')
const app = express()


//OPEN HTML USING NODE
const port = 3000

app.use('/css', express.static(__dirname + '/css'))
app.use('/js', express.static(__dirname + '/js'))
app.use('/img', express.static(__dirname + '/img'))

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
});

app.listen(port, () => `Listening on port ${port}` )