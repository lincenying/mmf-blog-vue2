/* global require, module, process */
const path = require("path")
const config = require('../config')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

config.build.productionSourceMap = false

module.exports = merge(baseWebpackConfig, {
    mode: 'production',
    module: {
        rules: [{
            test: /\.css$/,
            loader: ExtractTextPlugin.extract(['css-loader', 'postcss-loader'])
        },  {
            test: /\.less/,
            loader: ExtractTextPlugin.extract(['css-loader', 'postcss-loader', 'less-loader'])
        }]
    },
    devtool: config.build.productionSourceMap ? '#source-map' : false,
    output: {
        path: config.build.assetsRoot,
        publicPath: config.build.assetsPublicPath,
        filename: 'static/js/[name].[chunkhash:7].js',
        chunkFilename: 'static/js/[name].[chunkhash:7].js',
    },
    optimization: {
        runtimeChunk: {
            name: "manifest"
        },
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    priority: -20,
                    chunks: "all"
                }
            }
        },
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: {
                        warnings: false
                    }
                },
                sourceMap: config.build.productionSourceMap,
                parallel: true
            })
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        // new webpack.optimize.OccurenceOrderPlugin(),
        // extract css into its own file
        new ExtractTextPlugin('static/css/[name].[contenthash:7].css'),
        // generate dist index.html with correct asset hash for caching.
        // you can customize output by editing /index.html
        // see https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            chunks: [
                'manifest', 'vendors', 'app'
            ],
            filename: 'index.html',
            template: 'src/template/index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            chunksSortMode (chunk1, chunk2) {
                const orders = ['manifest', 'vendors', 'app'];
                const order1 = orders.indexOf(chunk1.names[0]);
                const order2 = orders.indexOf(chunk2.names[0]);
                return order1 - order2
            }
        }),
        new HtmlWebpackPlugin({
            chunks: [
                'manifest', 'vendors', 'admin'
            ],
            filename: 'admin.html',
            template: 'src/template/admin.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            chunksSortMode (chunk1, chunk2) {
                const orders = ['manifest', 'vendors', 'admin'];
                const order1 = orders.indexOf(chunk1.names[0]);
                const order2 = orders.indexOf(chunk2.names[0]);
                return order1 - order2
            }
        }),
    ]
})
