const express = require('express')
const router = express.Router()

const fs = require('fs');
const fsp = fs.promises;
const db = []


const getProducts = new Promise(async (res, err) => {
    
    const data = await fsp.readFile('./products.json', 'utf8')
    const dataParse = JSON.parse(data);
    res(dataParse);
})
getProducts.then((res) => {
    res.map((item) => { db.push(item) })
})

    function hash() {
        const current_date = (new Date()).valueOf().toString()
        const random = Math.random().toString()
        let hash
        let checkID = 0

        db.map((item) => {
            if(item.id == random) {
                checkID++
            }else { }
        })

        if(checkID==0){
            return ( 
            {
                'hash':`${current_date}_${random}`
            } 
            )
        } else{console.dir('error hash')}

    }



router.get('/', (req, res) => {
    res.json(db)
});

router.get('/:id', (req, res) => {
    
    const id = req.params.id;
    const item = db.filter(item => item.id == id)
    
    res.json(item)
});

router.post('/add', (req, res) => {
    
    
    const {title, description, price} = req.body
    const newProduct = 
    {
        'id' : hash().hash,
        'title' : `${title}`,
        'description' : `${description}`,
        'price' : `${price}` 
    }
    
    db.push(newProduct);

    fsp.writeFile('./products.json', JSON.stringify(db), (err) => {
        console.dir(err)
    } )
})

module.exports = router