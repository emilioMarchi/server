const express = require('express');


const app = express();
const productsRouter = require('./routes/productsRoute');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.set('port', process.env.PORT || 8080);

app.use('/products', productsRouter);

app.get('/', (req, res) => {
    res.send('Server listen')
});
app.post('/', (req, res) => {
    const msj = req.body.msj

    res.send(msj)
})

app.listen(app.get('port'), () => {
    console.dir(`server listen`)
})