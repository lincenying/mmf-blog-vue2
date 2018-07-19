/* global require, module, __dirname */
const path = require('path')
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const WebpackBar = require('webpackbar')

const config = require('../config')
const projectRoot = path.resolve(__dirname, '../')
const isProd = process.env.NODE_ENV === 'production'

// check env & config/index.js to decide weither to enable CSS Sourcemaps for the
// various preprocessor loaders added to vue-loader at the end of this file
const cssSourceMapDev = !isProd && config.dev.cssSourceMap
const cssSourceMapProd = isProd && config.build.productionSourceMap
const useCssSourceMap = cssSourceMapDev || cssSourceMapProd

const jsLoader = [
    {
        loader: 'cache-loader',
        options: {
            cacheDirectory: path.join(__dirname, '../node_modules/.cache/babel-loader'),
            cacheIdentifier: process.env.NODE_ENV + '_babel'
        }
    }
]
if (isProd) {
    jsLoader.push({
        loader: 'thread-loader'
    })
}
jsLoader.push({
    loader: 'babel-loader'
})

module.exports = {
    performance: {
        maxEntrypointSize: 300000,
        hints: isProd ? 'warning' : false,
        assetFilter: function(assetFilename) {
            return assetFilename.endsWith('.js')
        }
    },
    entry: {
        app: './src/app.js',
        admin: './src/admin.js'
    },
    output: {
        path: config.build.assetsRoot,
        publicPath: config.dev.assetsPublicPath,
        filename: 'static/js/[name].js',
        chunkFilename: 'static/js/[name].js'
    },
    externals: {
        jquery: 'jQuery'
    },
    resolve: {
        extensions: ['.js', '.vue'],
        modules: [path.join(__dirname, '../node_modules')],
        alias: {
            '@': path.resolve(__dirname, '../src'),
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
        modules: [path.join(__dirname, '../node_modules')]
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'cache-loader',
                        options: {
                            cacheDirectory: path.join(__dirname, '../node_modules/.cache/vue-loader'),
                            cacheIdentifier: process.env.NODE_ENV + '_vue'
                        }
                    },
                    {
                        loader: 'vue-loader',
                        options: {
                            compilerOptions: {
                                preserveWhitespace: true
                            },
                            cacheDirectory: path.join(__dirname, '../node_modules/.cache/vue-loader'),
                            cacheIdentifier: process.env.NODE_ENV + '_vue'
                        }
                    }
                ]
            },
            {
                test: /\.jsx?$/,
                include: projectRoot,
                exclude: /node_modules/,
                use: jsLoader
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: 'static/img/[name].[hash:7].[ext]',
                            limit: 8192
                        }
                    }
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: 'static/fonts/[name].[hash:7].[ext]',
                            limit: 8192
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        new VueLoaderPlugin(),
        new WebpackBar()
    ]
}
