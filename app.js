var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
// mongoose.connect(process.env.MONGODB_URI);
require('dotenv').config();

var index = require('./routes/projects');
var User = require('./routes/users');

var app = express();

mongoose.connect('mongodb://localhost/portfolio-creator');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



const projectsRoute = require('./routes/projects.js');
app.use('/users/:userId/projects', projectsRoute);

const usersRoute = require('./routes/users.js');
app.use('/users', usersRoute);


app.use('/', (req, res) => {
  res.render('index');
});

app.post('/', (req, res) => {
  const newUserInfoFromForm = req.body;

  User.create(newUserInfoFromForm)
  .then((user) => {
    console.log(user.id);
    response.render(
      'users/:userId', 
      { User }
    )
  })
  .catch((error) => {
    console.log(error);
  })
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
