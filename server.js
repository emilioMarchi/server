import express from 'express'
const exphbs  = require('express-handlebars');
const app = express();


const productsRouter = require('../routes/productsRoute');
const randomProductRouter = require('../routes/randomProductRoute')


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(express.static('public'));
const hbs = exphbs.create({
})

app.engine('handlebars', hbs.engine);
app.set("view engine", "handlebars");

//set router
app.use('/api/products', productsRouter);
app.use('/api/randomProducts', randomProductRouter);



app.get('/', (req, res) => {
    res.render('home')
})
//set port  
app.set('port', process.env.PORT || 8080);

//initialize server
app.listen(app.get('port'), () => {
    console.dir(`server listen`)
})