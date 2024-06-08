const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const path = require('path');
const app = express();
const methodOverride = require('method-override');
const route = require('./routes');
const db = require('./config/db');
const sortMiddleware = require('./app/middlewares/SortMiddleware');

// config dotenv
require('dotenv').config();
const PORT = process.env.port || 5000;

// HTTP logger
app.use(morgan('combined'));

// handle static files
app.use(express.static(path.join(__dirname, 'public')));

// Apply middleware
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(methodOverride('_method'));

// Custom middlewares
app.use(sortMiddleware);

// Templste engine
app.engine('hbs', handlebars.engine({
  extname: '.hbs',
  helpers: {
    sum: (a, b) => a + b,
    softable: require('./helpers/handlebars'),
  }
}))
// console.log(sortType)
  
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resourses', 'views'));

// Routes init
route(app);

// Connect to DB
db.connect();

app.listen(PORT , () => {
  console.log(`listening at http://localhost:${PORT}`)
});
