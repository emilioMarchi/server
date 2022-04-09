const express = require('express')
const http = require('http')
const {Server} = require('socket.io')

const User = require('./mdlw/userModel')
const usersControler = require('./mdlw/userControler')

const productMlw = require('./mdlw/productModule')

require('dotenv').config()

const app = express()
const server = http.createServer(app)
const io = new Server(server)
module.exports = {io}

const user = new User(true, 'casilda@hotmail.com', productMlw.db)
const user2 = new User(true, 'otro@hotmail.com', productMlw.db)

setTimeout(()=>{
    usersControler.addUser(user.getObjet())
}, 1000)

app.use(express.static(__dirname + '/public'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const productsRouter = require('./routes/productsRoute');

//set router

app.set('port', process.env.PORT || 8080);



app.use('/products', productsRouter)

app.post('/', (req, res) => {
    
})

//initialize server
server.listen(app.get('port'), () => {
    console.dir(`server listen`)
})