/* global require, module */
var path = require("path")
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var utils = require('./utils')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')

// add hot-reload related code to entry chunks
Object
    .keys(baseWebpackConfig.entry)
    .forEach(function (name) {
        baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
    })

module.exports = merge(baseWebpackConfig, {
    module: {
        rules: utils.styleLoaders()
    },
    output: {
        // necessary for the html plugin to work properly
        // when serving the html from in-memory
        publicPath: '/'
    },
    // eval-source-map is faster for development
    devtool: '#eval-source-map',
    plugins: [
        new webpack.DefinePlugin({'process.env': config.dev.env}),
        // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            names: ["vendor"]
        }),
        // https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            chunks: [
                'vendor', 'app',
            ],
            filename: 'index.html',
            template: 'src/template/index.html',
            inject: true,
        }),
        new HtmlWebpackPlugin({
            chunks: [
                'vendor', 'login',
            ],
            filename: 'login.html',
            template: 'src/template/login.html',
            inject: true,
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                context: __dirname,
                vue: {
                    loaders: utils.cssLoaders()
                },
            }
        }),
    ],
})
