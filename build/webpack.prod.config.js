/* global require, module, process */
var path = require("path")
var config = require('../config')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

config.build.productionSourceMap = false

module.exports = merge(baseWebpackConfig, {
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
        filename: 'static/js/[name].[chunkhash:7].js',
        chunkFilename: 'static/js/[id].[chunkhash:7].js',
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function(module, count) {
                // any required modules inside node_modules are extracted to vendor
                return (module.resource && /\.js$/.test(module.resource) && module.resource.indexOf(path.join(__dirname, '../node_modules')) === 0)
            }
        }),
        // extract webpack runtime and module manifest to its own file in order to
        // prevent vendor hash from being updated whenever app bundle is updated
        new webpack.optimize.CommonsChunkPlugin({name: 'manifest', chunks: ['vendor']}),
        // http://vuejs.github.io/vue-loader/workflow/production.html
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
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
                'manifest', 'vendor', 'app'
            ],
            filename: 'index.html',
            template: 'src/template/index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            }
        }),
        new HtmlWebpackPlugin({
            chunks: [
                'manifest', 'vendor', 'admin'
            ],
            filename: 'admin.html',
            template: 'src/template/admin.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            }
        }),
    ]
})
