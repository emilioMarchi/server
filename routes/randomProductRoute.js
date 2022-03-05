const express = require('express')
const router = express.Router()

const fs = require('fs');
const fsp = fs.promises;

class RandomProduct {
    constructor(){
        this.random = []
    }

    randomNumber = (min, max) => {
        return Math.round(Math.random() * (max - min) + min);
      }

    getRandomProoduct = async () => {
        const data = await fsp.readFile('./products.json', 'utf-8')
        const dataParse = JSON.parse(data)
        
        
        const index = this.randomNumber(0, (dataParse.length - 1))
        const productRandom = dataParse[index]

        this.random.push(productRandom)
        return dataParse[index]
    }
}
const randomProduct = new RandomProduct()

router.get('/', async (req, res) => {

    const data = await randomProduct.getRandomProoduct()
    res.json(data)
})

module.exports = router