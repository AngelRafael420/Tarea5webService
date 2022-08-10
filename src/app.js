const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const firebaseAdmin = require('firebase-admin');
var serviceAccount = require('./config/firebase/firebase-credentials.json');

const app = express();

// initialize firebase app
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: 'https://node-firebasejs-default-rtdb.firebaseio.com/',
});

//settings
app.set('port', process.env.PORT || 5000);
app.set('views', path.join(__dirname, 'views'));
app.engine(
  '.hbs',
  exphbs.engine({
    defaultLayout: 'main',
    extname: '.hbs',
  }),
);
app.set('view engine', '.hbs');

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));

//routes
app.use(require('./routes/index'));

//static files
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
