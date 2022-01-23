const express = require('express')

const app = express()

app.use('/', (req, res) => {
    res.send('todo ok')
})

app.listen(process.env.PORT || '3000', () => {
    console.log('Todo ok')
})