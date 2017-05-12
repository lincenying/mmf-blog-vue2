/* global require, module, __dirname */
const path = require('path')
const webpack = require('webpack')

const config = require('../config')
const vueConfig = require('./vue-loader.config')
const projectRoot = path.resolve(__dirname, '../')
const isProd = process.env.NODE_ENV === 'production'

// check env & config/index.js to decide weither to enable CSS Sourcemaps for the
// various preprocessor loaders added to vue-loader at the end of this file
const cssSourceMapDev = (!isProd && config.dev.cssSourceMap)
const cssSourceMapProd = (isProd && config.build.productionSourceMap)
const useCssSourceMap = cssSourceMapDev || cssSourceMapProd

module.exports = {
    performance: {
        maxEntrypointSize: 300000,
        hints: isProd ? 'warning' : false
    },
    entry: {
        app: './src/app.js',
        admin: './src/admin.js',
        vendor: ['./src/polyfill']
    },
    output: {
        path: config.build.assetsRoot,
        publicPath: config.dev.assetsPublicPath,
        filename: '[name].js',
        chunkFilename: '[name].js'
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
            '~mixins': path.resolve(__dirname, '../src/mixins'),
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
            minimize: isProd,
            options: {
                context: __dirname,
                vue: vueConfig,
            }
        }),
    ]
}
