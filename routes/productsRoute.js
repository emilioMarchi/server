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



router.get('/', (req, res) => {
    res.send(db)
});

router.get('/:id', (req, res) => {

    const id = req.params.id;
    const item = db.filter(item => item.id == id)

    res.json(item)
});

router.post('/', (req, res) => {
    res.send('value')
})
module.exports = router