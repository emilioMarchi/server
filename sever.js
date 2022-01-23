const express = require('express')

const productsRoute = require('./routes/productsRoute')

const app = express()

app.use('/', (req, res) => {
    res.send('todo ok')
})

app.use('products', productsRoute)

app.listen(process.env.PORT || '8080', () => {
    console.log('Todo ok')
})