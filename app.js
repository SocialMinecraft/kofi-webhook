let express = require('express');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

var webhookRouter = require('./routes/webhook')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/webhook', webhookRouter)

module.exports = app;
