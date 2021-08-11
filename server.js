const express = require('express')
const app = express()


<<<<<<< HEAD

=======
>>>>>>> 3a52bb2332f29fd1bd74be590a6cbe57aee62179
const port = 3000

app.use('/css', express.static(__dirname + '/css'))
app.use('/js', express.static(__dirname + '/js'))
app.use('/img', express.static(__dirname + '/img'))

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
});

app.listen(port, () => `Listening on port ${port}` )
