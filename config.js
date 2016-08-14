// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
var proxyConfig = require('./proxy')

module.exports = {
    build: {
        index: path.resolve(__dirname, 'dist/index.html'),
        assetsRoot: path.resolve(__dirname, 'dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        productionSourceMap: false
    },
    dev: {
        port: 8080,
        proxyTable: proxyConfig
    }
}
