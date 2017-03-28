/* global require, module */
const path = require("path")
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const config = require('../config')
const baseWebpackConfig = require('./webpack.base.config')

// add hot-reload related code to entry chunks
Object
    .keys(baseWebpackConfig.entry)
    .forEach(function (name) {
        baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
    })

module.exports = merge(baseWebpackConfig, {
    // eval-source-map is faster for development
    devtool: '#cheap-module-eval-source-map',
    module: {
        rules: [{
            test: /\.css$/,
            loader: 'style-loader!css-loader!postcss-loader'
        }, {
            test: /\.less$/,
            loader: 'style-loader!css-loader!postcss-loader!less-loader'
        }]
    },
    output: {
        // necessary for the html plugin to work properly
        // when serving the html from in-memory
        publicPath: '/'
    },
    plugins: [
        new webpack.DefinePlugin({'process.env': config.dev.env}),
        new FriendlyErrorsPlugin(),
        // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
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
                'vendor', 'admin',
            ],
            filename: 'admin.html',
            template: 'src/template/admin.html',
            inject: true,
        }),
    ],
})
