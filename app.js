var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var sign = require('./routes/sign');
var alterInfo = require('./routes/alterInfo');
var record = require('./routes/record');
var signOut = require('./routes/signOut');
var changePw = require('./routes/changePw');
var optionIndex = require('./routes/optionIndex');
var setPosition = require('./routes/setPosition');
var rootRegister = require('./routes/rootRegister');
var setCompanyInfo = require('./routes/setCompanyInfo');
var forgotPassword = require('./routes/forgotPassword');
var changePassword = require('./routes/changePassword');
var addUsers= require('./routes/addUsers');
var exceptionQuery= require('./routes/exceptionQuery');
var modifyConfirm = require('./routes/modifyConfirm');
var queryRecord = require('./routes/queryRecord');

var app = express();
//数据库链接
var mysql = require('mysql'),
    myConnection = require('express-myconnection'),
    dbOptions = {
        host: 'localhost',
        user: 'root',
        password: 'chuang521',
        port: 3306,
        database: 'sign_data'};
app.use(myConnection(mysql, dbOptions, 'single'));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/sign',sign);
app.use('/record',record);
app.use('/signOut', signOut);
app.use('/alterInfo', alterInfo);
app.use('/changePw',changePw);
app.use('/optionIndex',optionIndex);
app.use('/setPosition',setPosition);
app.use('/register',rootRegister);
app.use('/setCompanyInfo',setCompanyInfo);
app.use('/changePassword',changePassword);
app.use('/forgotPassword',forgotPassword);
app.use('/addUsers',addUsers);
app.use('/exceptionQuery',exceptionQuery);
app.use('/modifyConfirm',modifyConfirm);
app.use('/queryRecord',queryRecord);

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
