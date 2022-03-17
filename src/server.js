const express = require('express');
const exphbs  = require('express-handlebars');
const app = express();
const path = require('path')

const productsRouter = require('../routes/productsRoute');
const randomProductRouter = require('../routes/randomProductRoute')
const formRouter = require('../routes/formRoute')


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('hbs', exphbs.engine({
    layoutsDir: 'views/layouts',
    defaultLayout: '../main',
    extname: '.hbs'
  })
);

app.set('view engine', 'hbs');
app.set("views", "views");

//set router
app.use('/api/products', productsRouter);
app.use('/api/randomProducts', randomProductRouter);
app.use('/form', formRouter);


app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
    res.render('./layouts/home')
})

//set port  
app.set('port', process.env.PORT || 8080);

//initialize server
app.listen(app.get('port'), () => {
    console.dir(`server listen`)
})