var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require("cors");
const fs = require("fs");
var i18n = require("i18n");
var session = require('express-session');
const compression = require('compression')
var index = require('./routes/index');
global.appRoot = path.resolve(__dirname);

var app = express();
// Import busboy
const busboy = require('connect-busboy');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }));

i18n.configure({
    locales : [
        'en', 
        'ce',
        'de'
    ],
    defaultLocale: 'en',
    cookie: 'i18n',
    directory : __dirname + '/locales'
});
app.use(cookieParser("i18n"));
app.use(compression());

app.use(session({
    secret: "i18n",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));

app.use(i18n.init);

app.use(busboy({
    highWaterMark: 2 * 1024 * 1024, // Set 2MiB buffer
})); // Insert the busboy middle-ware

app.use('/', index);

function initRoute(directory, route) {
    let files = fs.readdirSync(directory);
    if (files.includes('middleware.js')) {
        var newBase = path.join(directory, 'middleware.js');
        app.use(route, require('./' + newBase))
    }
    files.forEach(function (file) {
        var newBase = path.join(directory, file);
        if (!fs.statSync(newBase).isDirectory() && file != "middleware.js") {
            let cRoute = route + '/' + file
            cRoute = cRoute.slice(0, cRoute.length - 3);
            let ctrl = require('./' + newBase);
            if (ctrl.get) {
                app.get(cRoute, ctrl.get)
            }
            if (ctrl.post) {
                app.post(cRoute, ctrl.post)
            }
            if (ctrl.put) {
                app.put(cRoute, ctrl.put)
            }
            if (ctrl.delete) {
                app.delete(cRoute, ctrl.delete)
            }
        } else if (fs.statSync(newBase).isDirectory()) {
            initRoute(newBase, route + '/' + file);
        }
    });
}

let apiDirectory = './api'
let startRoute = '/api'
initRoute(apiDirectory, startRoute);

app.use(express.static(path.join(__dirname, 'public')));
var distDir = './public/Client/dist/fuse';
app.use(express.static(path.join(__dirname, distDir)));
app.use(/^((?!(api)).)*/, (req, res) => {
    res.sendFile(path.join(__dirname, distDir + '/index.html'));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
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
