/* eslint-disable no-inline-comments */
const path = require('path')
const SWPrecachePlugin = require('sw-precache-webpack-plugin')

module.exports = {
    pages: {
        app: {
            // page 的入口
            entry: 'src/app.js',
            // 模板来源
            template: 'public/index.html',
            // 在 dist/index.html 的输出
            filename: 'index.html'
        },
        admin: {
            // page 的入口
            entry: 'src/admin.js',
            // 模板来源
            template: 'public/admin.html',
            // 在 dist/index.html 的输出
            filename: 'admin.html'
        }
    },
    configureWebpack: {
        devtool: 'source-map',
        performance: {
            hints: 'warning', // 枚举
            maxAssetSize: 30000000, // 整数类型（以字节为单位）
            maxEntrypointSize: 50000000, // 整数类型（以字节为单位）
            assetFilter(assetFilename) {
                // 提供资源文件名的断言函数
                return assetFilename.endsWith('.css') || assetFilename.endsWith('.js')
            }
        },
        plugins: [
            new SWPrecachePlugin({
                cacheId: 'mmf-blog-vue2',
                filename: 'service-worker.js',
                minify: true,
                dontCacheBustUrlsMatching: /./,
                staticFileGlobsIgnorePatterns: [/\.html/, /\.map$/, /\.json$/],
                runtimeCaching: [
                    {
                        urlPattern: /api/,
                        handler: 'networkFirst',
                        options: {
                            networkTimeoutSeconds: 1,
                            cacheName: 'api-cache',
                            cacheableResponse: {
                                statuses: [0, 200]
                            }
                        }
                    },
                    {
                        urlPattern: /^https:\/\/cdn\.jsdelivr\.net/,
                        handler: 'networkFirst',
                        options: {
                            networkTimeoutSeconds: 1,
                            cacheName: 'cdn-cache',
                            cacheableResponse: {
                                statuses: [0, 200]
                            }
                        }
                    }
                ]
            })
        ]
    },
    chainWebpack: config => {
        config.module
            .rule('vue')
            .use('vue-loader')
            .tap(options => {
                options.compilerOptions.preserveWhitespace = true
                return options
            })
        config.module.rule('eslint').uses.clear()
        config.module.rule('eslint').clear()
        config.resolve.alias.set('~', path.resolve('src'))
        config.resolve.alias.set('~api', path.resolve('src/api/index-client.js'))
    },
    css: {
        loaderOptions: {}
    },
    pluginOptions: {},
    pwa: {
        name: 'M.M.F小屋',
        themeColor: '#2874f0',
        msTileColor: '#000000',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black',
        manifestPath: 'static/manifest.json',
        iconPaths: {
            favicon32: 'static/img/icons/favicon-32x32.png',
            favicon16: 'static/img/icons/favicon-16x16.png',
            appleTouchIcon: 'static/img/icons/apple-touch-icon-152x152.png',
            maskIcon: 'static/img/icons/safari-pinned-tab.svg',
            msTileImage: 'static/img/icons/msapplication-icon-144x144.png'
        }
    },
    devServer: {
        port: 8081,
        host: '0.0.0.0',
        hot: true,
        disableHostCheck: true,
        proxy: {
            '/api': {
                target: 'http://localhost:4000',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/api'
                }
            }
        },
        historyApiFallback: {
            rewrites: [
                // shows views/landing.html as the landing page
                { from: /^\/$/, to: '/index.html' },
                // shows views/subpage.html for all routes starting with /subpage
                { from: /^\/backend/, to: '/admin.html' }
            ]
        }
    }
}
