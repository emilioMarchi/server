const express = require('express')
const http = require('http')
const {Server} = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = new Server(server)
module.exports = {io}

app.use(express.static(__dirname + '/public'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const productsRouter = require('./routes/productsRoute');

//set router

app.set('port', process.env.PORT || 8080);

//initialize server
server.listen(app.get('port'), () => {
    console.dir(`server listen`)
})