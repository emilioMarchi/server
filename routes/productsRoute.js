const express = require('express')
const router = express.Router()

const fs = require('fs');
const fsp = fs.promises;

class Products {
    constructor() {
        this.db = []
    }
    
    getForId(id) {
        const item = this.db.filter(item => id == item.id)
        return item
    }
    
    async getProducts() {
        const data = await fsp.readFile('./products.json', 'utf8')
        const dataParse = JSON.parse(data);
        
        dataParse.map(item => this.db.push(item))
    }
    
    getHash() {
        const current_date = (new Date()).valueOf().toString()
        const random = Math.random().toString()
        const hash = current_date+random
        let checkID = 0
        
        this.db.map((item) => {
            if(item.id == random) {
                return checkID+=1
            }else { }
        })
        
        if(checkID==0){
            return hash
        } else{console.dir('error hash')}
        
    }
}

const productMlw = new Products()
productMlw.getProducts()

router.get('/', (req, res) => {
    res.json(productMlw.db)
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    res.json(productMlw.getForId(id))
});

router.post('/', (req, res) => {
    
    const {title, description, price} = req.body

    if(title && description && price) {
        const newItem = 
        {
            'id' : productMlw.getHash(),
            'title' : `${title}`,
            'description' : `${description}`,
            'price' : `${price}` 
        }
    
        productMlw.db.push(newItem);
    
        fsp.writeFile('./products.json', JSON.stringify(productMlw.db), (err) => {
            console.dir(err)
        } )
    
        res.json(newProduct)
    } else {res.json({err: 'error'})}
})

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
        id,
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