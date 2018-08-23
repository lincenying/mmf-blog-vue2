/**
 * @file 工具包
 * @author lincenying(lincenying@qq.com)
 */

'use strict'

const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const isDev = process.env.NODE_ENV === 'development'

const config = require('../config')

exports.assetsPath = function(newPath) {
    const assetsSubDirectory = isDev ? config.dev.assetsSubDirectory : config.build.assetsSubDirectory
    return path.posix.join(assetsSubDirectory, newPath)
}

exports.cssLoaders = function(options) {
    options = options || {}

    const cssLoader = {
        loader: 'css-loader',
        options: {
            minimize: !isDev,
            sourceMap: options.sourceMap
        }
    }
    const postcssLoader = {
        loader: 'postcss-loader',
        options: {
            sourceMap: options.sourceMap
        }
    }

    function generateLoaders(loader, loaderOptions) {
        const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

        if (loader) {
            loaders.push({
                loader: loader + '-loader',
                options: Object.assign({}, loaderOptions, {
                    sourceMap: options.sourceMap
                })
            })
        }
        if (options.extract) {
            return [
                {
                    resourceQuery: /\?vue/,
                    use: [MiniCssExtractPlugin.loader, ...loaders]
                },
                {
                    use: [MiniCssExtractPlugin.loader, ...loaders]
                }
            ]
        }
        return [
            {
                resourceQuery: /\?vue/,
                use: [
                    {
                        loader: 'vue-style-loader',
                        options: {
                            sourceMap: false,
                            shadowMode: false
                        }
                    },
                    ...loaders
                ]
            },
            {
                use: [
                    {
                        loader: 'vue-style-loader',
                        options: {
                            sourceMap: false,
                            shadowMode: false
                        }
                    },
                    ...loaders
                ]
            }
        ]
    }

    // https://vue-loader.vuejs.org/en/configurations/extract-css.html
    return {
        css: generateLoaders(),
        postcss: generateLoaders(),
        less: generateLoaders('less')
        // sass: generateLoaders('sass', { indentedSyntax: true }),
        // scss: generateLoaders('sass'),
        // stylus: generateLoaders('stylus'),
        // styl: generateLoaders('stylus'),
    }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function(options) {
    const output = []
    const loaders = exports.cssLoaders(options)

    Object.keys(loaders).forEach(function(extension) {
        output.push({
            test: new RegExp('\\.' + extension + '$'),
            oneOf: loaders[extension]
        })
    })

    return output
}
