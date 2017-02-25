const path = require('path')
const webpack = require('webpack')
const clientConfig = require('./webpack.dev.config')

module.exports = function setupDevServer(app, opts) {
    // dev middleware
    const clientCompiler = webpack(clientConfig)
    const devMiddleware = require('webpack-dev-middleware')(clientCompiler, {
        publicPath: clientConfig.output.publicPath,
        stats: {
            colors: true,
            chunks: false
        }
    })
    app.use(devMiddleware)
    clientCompiler.plugin('done', () => {
        const fs = devMiddleware.fileSystem
        const filePath = path.join(clientConfig.output.path, 'index.html')
        if (fs.existsSync(filePath)) {
            const index = fs.readFileSync(filePath, 'utf-8')
            opts.indexUpdated(index)
        }
        const adminPath = path.join(clientConfig.output.path, 'admin.html')
        if (fs.existsSync(adminPath)) {
            const admin = fs.readFileSync(adminPath, 'utf-8')
            opts.adminUpdated(admin)
        }
    })

    // hot middleware
    app.use(require('webpack-hot-middleware')(clientCompiler))
    var hotMiddleware = require('webpack-hot-middleware')(clientCompiler)
    // force page reload when html-webpack-plugin template changes
    clientCompiler.plugin('compilation', function(compilation) {
        compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
            hotMiddleware.publish({
                action: 'reload'
            })
            cb()
        })
    })
}
