var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var peopleRouter = require('./routes/people');

// Database connection
var db = require('./db/db');

db.connect('mongodb://localhost:27017', function (err) {
    if (err) {
        throw ('Fallo en la conexión con la BD');
    }
});


// app use
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
//app.use('/users', usersRouter);
app.use('/people', peopleRouter);

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('¡Se ha producido un error!');
    next(err);
});

module.exports = app;