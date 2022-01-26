const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const productsRouter = require('./routes/productsRoute');

app.set('port', process.env.PORT || 8080);


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/products', productsRouter);

app.get('/', (req, res) => {
    res.send('Server listen')
});

app.listen(app.get('port'), () => {
    console.dir(`server listen`)
})