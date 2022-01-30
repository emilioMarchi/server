const express = require('express');
const app = express();

//routes
const productsRouter = require('./routes/productsRoute');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//set port
app.set('port', process.env.PORT || 8080);

app.use(express.static(__dirname + '/public'))

//set router
app.use('/api/products', productsRouter);



app.get('/', (req, res) => {
    res.send('Server listen')
});
app.post('/', (req, res) => {
    const msj = req.body.msj

    res.send(msj)
})

//initialize server
app.listen(app.get('port'), () => {
    console.dir(`server listen`)
})