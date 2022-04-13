const express = require('express')
const http = require('http')
const {Server} = require('socket.io')
const cors = require('cors')


const User = require('./mdlw/userModel')
const usersControler = require('./mdlw/userControler')

const productMlw = require('./mdlw/productModule')

require('dotenv').config()

const app = express()
const server = http.createServer(app)
const io = new Server(server)
module.exports = {io}

app.use(express.static(__dirname + '/public'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

const productsRouter = require('./routes/productsRoute');

//set router

app.set('port', process.env.PORT || 8080);



app.use('/products', productsRouter)


app.post('/signIn',  async (req, res) => {

    const data = req.body.email
    const user = await usersControler.getUser(data)
    const checkUser = await usersControler.checkUsers(data)
    
    if(checkUser === false) {
        res.send({state:'negative', msj:'User no exist'})
    }
    else if(checkUser === true) {
        res.send({state:'satisfactory', msj:'User signup', email:`${user.email}`})
    }
    else {
        res.send({state:'negative'})
    }
})
app.post('/logIn', async (req, res) => {

    const data = req.body.email
    
    if(data) {
        const checkUser = await usersControler.checkUsers(data)
        if(checkUser === false){
            const userSigIn = new User(true, data)
            usersControler.addUser(userSigIn.getObjet())
            
            res.send({state: 'satisfactory', msj:'user logged', email:`${userSigIn.email}`})
            
        } else if (checkUser === true) {
            res.send({state: 'negative', msj: 'user already exists'})
        } else {
            res.send(checkUser)
        }
    } else {
        res.send({state: 'negative'})
    }
    
})

app.get('/cart', async (req, res) => {
    const email = req.query.email
    
    const user = await usersControler.getUser(email)

    if(user){
        res.send({state:'satisfactory', user})
    } else {
        res.send({state:'negative'})
    }
})

//initialize server
server.listen(app.get('port'), () => {
    console.dir(`server listen`)
})