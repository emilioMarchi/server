const express = require('express')
const router = express.Router()

const fs = require('fs');
const productMlw = require('../mdlw/productModule');
const fsp = fs.promises;

const {io} = require('../server')


io.on('connection', async (socket) => {
    socket.emit('server:loadProducts', productMlw.db)
    console.log('user connected')
    

    socket.on('client:newProduct', async (data) => {
        try{
            const product = {
                id : productMlw.getHash(),
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

router.get('/', async (req, res) => {
    try{

        const products =  productMlw.getProducts()
        
        if(products.length === 0){
            const data = {state: 'negative', msj: 'There are no products loaded'}
            res.render('index', {data})
        } else {
            const data = {state: 'satisfactory', db:productMlw.db}
            res.render('index', {data})
        }

    }
    catch{
        const data = {state:'negative'}
        res.render('productsList', {data})
    }
});

router.get('/form', (req, res) => {
    res.render('form')
})


router.post('/form', (req, res) => {
    
    const {title, description, price} = req.body

    if(title && description && price) {
        const newItem = 
        {
            'id' : productMlw.getHash(),
            title,
            description,
            price 
        }
    
        productMlw.db.push(newItem);
    
        fsp.writeFile('./products.json', JSON.stringify(productMlw.db), (err) => {
            console.dir(err)
        } )
        const data = {state: 'satisfactory', msj: 'New product added'}
        res.render('form', {data})
    } 
    else {
        const data = { state: 'negative', msj: 'The product could not be loaded. Try again'}
        res.render('form', {data})
        }
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const item = productMlw.getForId(id)
    if(item[0]){
        res.json(productMlw.getForId(id))
    } else{res.json({err:'The product does not exist'})}
});



router.delete('/:id', (req, res)=>{
    
    const id = req.params.id
    const item = productMlw.getForId(id)

    
    if(item[0]){

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
    
})

router.put('/:id', (req, res) => {

    const id = req.params.id
    const { title, description, price } = req.body
    const newItem = {
        'id' : productMlw.getHash(),
        title,
        description,
        price
    }

    const item = productMlw.getForId(id)

    
    if(item[0]){

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

})

module.exports = router