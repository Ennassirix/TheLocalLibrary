const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
// The Routes Imports : 
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const catalogRouter = require('./routes/catalog')
// Express App runs : 
const app = express();

// Import the mongoose module
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
// Define the database URL to connect to.
const mongoDb = 'mongodb+srv://ayoubx123456:PhiDoDPs1uRqOpFq@cluster0.3fccxc0.mongodb.net/local_library?retryWrites=true&w=majority';
// Wait for database to connect, logging an error if there is a problem
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDb);
}

// view engine setup : 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// the Middlewares : 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// all the routes goes here : 
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catalog', catalogRouter)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
