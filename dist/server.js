"use strict";

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const exphbs = require('express-handlebars');

const app = (0, _express.default)();

const productsRouter = require('../routes/productsRoute');

const randomProductRouter = require('../routes/randomProductRoute');

app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: false
}));
app.use(_express.default.static('public'));
const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set("view engine", "handlebars"); //set router

app.use('/api/products', productsRouter);
app.use('/api/randomProducts', randomProductRouter);
app.get('/', (req, res) => {
  res.render('home');
}); //set port  

app.set('port', process.env.PORT || 8080); //initialize server

app.listen(app.get('port'), () => {
  console.dir(`server listen`);
});