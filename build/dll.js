/* global require, env, rm, cp, mkdir, process */

// https://github.com/shelljs/shelljs
require('shelljs/global')
env.NODE_ENV = 'production'

var path = require('path')
var ora = require('ora')
var webpack = require('webpack')
var webpackConfig = require('./webpack.dll.conf')

var spinner = ora('building for dll...')
spinner.start()

rm('-rf', 'static/dll/')

webpack(webpackConfig, function(err, stats) {
    spinner.stop()
    if (err) {
        throw err
    }
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n')
})
