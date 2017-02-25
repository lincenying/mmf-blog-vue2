/* global require, module, process */

var path = require('path')
var express = require('express')
var config = require('../config')

var proxyMiddleware = require('http-proxy-middleware')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()

var indexHTML
var adminHTML

require('./setup-dev-server')(app, {
    indexUpdated: index => {
        indexHTML = index
    },
    adminUpdated: index => {
        adminHTML = index
    },
})

// proxy api requests
Object.keys(proxyTable).forEach(function(context) {
    var options = proxyTable[context]
    if (typeof options === 'string') {
        options = {
            target: options
        }
    }
    app.use(proxyMiddleware(context, options))
})
// serve pure static assets
var staticPath = path.posix.join(config.build.assetsPublicPath, config.build.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

// 前台路由
app.get(['/', '/category/:id', '/search/:key', '/article/:id', '/about', '/trending/:by', '/user/account', '/user/password'], (req, res) => {
    res.send(indexHTML)
})

// 后台渲染
app.get(['/backend', '/backend/*'], (req, res) => {
    res.send(adminHTML)
})

// 404 页面
app.get('*', (req, res) => {
    res.send('HTTP STATUS: 404')
})

app.use(function(req, res, next) {
    var err = new Error('Not Found')
    err.status = 404
    next(err)
})

app.use(function(err, req, res) {
    res.status(err.status || 500)
    res.send(err.message)
})

module.exports = app.listen(port, function(err) {
    if (err) {
        console.log(err)
        return
    }
    console.log('Listening at http://localhost:' + port + '\n')
})
