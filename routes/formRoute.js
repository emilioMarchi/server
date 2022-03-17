const express = require('express')
const router = express.Router()


const fs = require('fs');
const fsp = fs.promises;

router.get('/add', (req, res) => {
    res.render('layouts/form')
})
router.post('/add', (req, res) => {
    const {title, description, price} = req.body
    res.send(data)
    })

module.exports = router