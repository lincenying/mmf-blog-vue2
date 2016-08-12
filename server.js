var express = require('express')
var compression = require('compression')
var mongoose = require('mongoose')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')

mongoose.connect('mongodb://localhost:27017/mmfblog')
require('./server/models/user')
require('./server/models/article')
require('./server/models/comment')
mongoose.Promise = global.Promise

var routes = require('./server/routes/index')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'dist'))
app.engine('.html', require('ejs').__express)
app.set('view engine', 'ejs')

app.use(compression())
app.use(favicon(path.join(__dirname, 'dist') + '/favicon.ico'))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'dist')))

app.use('/', routes)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found')
    err.status = 404
    next(err)
})

/* eslint-disable */
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500)
        res.send(err.message)
    })
}

app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    res.send(err.message)
})

var port = 3000
app.listen(port, function(err) {
    if (err) {
        console.log(err)
        return
    }
    console.log('Listening at http://localhost:' + port + '\n')
})
