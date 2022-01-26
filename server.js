const express = require('express');

const app = express();
const productsRouter = require('./routes/productsRoute');

app.set('port', process.env.PORT || 8080);

app.use('/products', productsRouter);

app.get('/', (req, res) => {
    res.send('Server listen')
});
app.post('/', (req, res) => {
    res.send('todo ok')
})

app.listen(app.get('port'), () => {
    console.dir(`server listen`)
})