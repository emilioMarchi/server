const express = require('express')
const router = express.Router()
const dayjs = require('dayjs')

const fs = require('fs');
const productMlw = require('../mdlw/productModule');
const fsp = fs.promises;

const {io} = require('../server');
const usersControler = require('../mdlw/userControler');


io.on('connection', async (socket) => {
    socket.emit('server:loadProducts', productMlw.db)
    console.log('user connected', socket.id)
    
    socket.on('client:newProduct', async (data) => {
        try{
            const hs = dayjs().format(`HH:mm:ss`)
            const day = dayjs().format(`DD/MM/YYYY`)
            const fecha = `${hs + ' hs ' +  day}`
            const product = {
                id : productMlw.getHash(),
                date: fecha,
                ...data
            }
            await productMlw.addProduct(product)
            io.emit('server:newProduct', product)
        }
        catch{
            console.log('error addProduct')
        }
    })
})

router.get('/:id?', async (req, res) => {
    try{
        const email = req.query.email
        console.log(email)
        const userChek = await usersControler.checkUsers(`${email}`)
        
        if(userChek === true){
            const products =  productMlw.getProducts()
            const id = req.query.id
            
            if(products.length === 0){
                const data = {state: 'negative', msj: 'There are no products loaded'}
                res.send(data)
            } else {
                const data = {state: 'satisfactory', db:productMlw.db}
                if(!id) {
                    res.send(data)
                } else {
                    const product = productMlw.getForId(id)
                    if(!product){
                        const data = {state: 'negative', msj:'product not found'}
                        res.send(data)
                    } else {
                        res.send(product)
                    }
                }
            }
        } else {
            res.send({state:'negative', msj:'no acces'})
        }
        

    }
    catch{
        const data = {state:'negative'}
        res.send(data)
    }
});


router.post('/', async (req, res) => {

    const email = req.body.email        
    const userChek = await usersControler.checkUsers(email)

    if(userChek === true) {
        
        const {title, description, price} = req.body.obj
    
        if(title && description && price) {
            const newItem = 
            {
                'id' : productMlw.getHash(),
                title,
                description,
                price,
                date: new Date() 
            }
        
            productMlw.db.push(newItem);
        
            fsp.writeFile('./products.json', JSON.stringify(productMlw.db), (err) => {
                console.dir(err)
            } )
            const data = {state: 'satisfactory', msj: 'New product added'}
            res.send(data)
        } 
        else {
            const data = { state: 'negative', msj: 'The product could not be loaded. Try again'}
            res.send(data)
            }

    } else {
        res.send({state:'negative', msj:'no acces'})
    }
})


router.delete('/:id?', async (req, res)=>{
    
    const email = req.body.email        
    const userChek = await usersControler.checkUsers(email)

    if(userChek === true) {

        const id = req.query.id
        const item = productMlw.getForId(id)
    
        
        if(item){
    
            const itemPosition = productMlw.db.map((item) => {
                if(id == item.id) {
                    return true
                } else{return false}
            })
            const itemIndex = itemPosition.indexOf(true)
            productMlw.db.splice(itemIndex, 1)
    
            fsp.writeFile('./products.json', JSON.stringify(productMlw.db), (err) => {
                console.dir(err)
            } )
            
            res.json({msj:'Successful operation'})
            
        } else {
            res.json({error : 'The product does not exist'})
        }

    } else {
        res.send({state:'negative', msj:'no acces'})
    }


    
})

router.put('/:id?', async (req, res) => {

    const email = req.body.email        
    const userChek = await usersControler.checkUsers(email)

    if(userChek === true) {
        const id = req.query.id
        const { title, description, price, date } = req.body.obj
        
        
        const newItem = {
            id,
            title,
            description,
            price,
            date,
            modificationDate: new Date()
        }
        
        
        const item = productMlw.getForId(id)
        
        if(item){
    
            const itemPosition = productMlw.db.map((item) => {
                if(id == item.id) {
                    return true
                } else{return false}
            })
            const itemIndex = itemPosition.indexOf(true)
            productMlw.db.splice(itemIndex, 1, newItem)
    
            fsp.writeFile('./products.json', JSON.stringify(productMlw.db), (err) => {
                console.dir(err)
            } )
            
            res.json({msj:'Successful operation'})
            
        } else {
            res.json({error : 'The product does not exist'})
        }

    } else {
        res.send({state:'negative', msj:'no acces'})
    }


})

module.exports = router