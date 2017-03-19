/* global require, module, __dirname */
const path = require('path')
const webpack = require('webpack')
const config = require('../config')
const vueConfig = require('./vue-loader.config')
const projectRoot = path.resolve(__dirname, '../')
const env = process.env.NODE_ENV
// check env & config/index.js to decide weither to enable CSS Sourcemaps for the
// various preprocessor loaders added to vue-loader at the end of this file
const cssSourceMapDev = (env === 'development' && config.dev.cssSourceMap)
const cssSourceMapProd = (env === 'production' && config.build.productionSourceMap)
const useCssSourceMap = cssSourceMapDev || cssSourceMapProd

module.exports = {
    performance: {
        hints: false
    },
    entry: {
        app: './src/app.js',
        admin: './src/admin.js',
        vendor: ['./src/polyfill']
    },
    output: {
        path: config.build.assetsRoot,
        publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
        filename: '[name].js'
    },
    externals: {
        'jquery': 'jQuery'
    },
    resolve: {
        extensions: [
            '.js', '.vue'
        ],
        modules: [
            path.join(__dirname, '../node_modules'),
        ],
        alias: {
            '~src': path.resolve(__dirname, '../src'),
            '~components': path.resolve(__dirname, '../src/components'),
            '~api': path.resolve(__dirname, '../src/api/index-client'),
            '~pages': path.resolve(__dirname, '../src/pages'),
            '~store': path.resolve(__dirname, '../src/store'),
            '~utils': path.resolve(__dirname, '../src/utils'),
            'api-config': path.resolve(__dirname, '../src/api/config-client')
        }
    },
    resolveLoader: {
        modules: [
            path.join(__dirname, '../node_modules'),
        ]
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'eslint-loader',
                enforce: "pre",
                include: projectRoot,
                exclude: /node_modules/
            }, {
                test: /\.js$/,
                loader: 'eslint-loader',
                enforce: "pre",
                include: projectRoot,
                exclude: /node_modules/
            }, {
                test: /\.vue$/,
                loader: 'vue-loader'
            }, {
                test: /\.js$/,
                loader: 'babel-loader',
                include: projectRoot,
                exclude: /node_modules/
            }, {
                test: /\.json$/,
                loader: 'json-loader'
            }, {
                test: /\.html$/,
                loader: 'vue-html-loader'
            }, {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: 'staticimg/[name].[hash:7].[ext]'
                }
            }, {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: 'static/fonts/[name].[hash:7].[ext]'
                }
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({$: 'jquery', jQuery: 'jquery', 'window.jQuery': 'jquery'}),
        new webpack.LoaderOptionsPlugin({
            minimize: env === 'production',
            options: {
                context: __dirname,
                vue: vueConfig,
            }
        }),
    ]
}
