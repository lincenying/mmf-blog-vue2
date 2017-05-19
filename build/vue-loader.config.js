var ExtractTextPlugin = require('extract-text-webpack-plugin')

var loaders = {}
if (process.env.NODE_ENV !== 'production') {
    loaders = {
        css: 'vue-style-loader!css-loader',
        less: 'vue-style-loader!css-loader!less-loader'
    }
} else {
    loaders = {
        css: ExtractTextPlugin.extract({fallback: 'vue-style-loader', use: 'css-loader'}),
        less: ExtractTextPlugin.extract({fallback: 'vue-style-loader', use: 'css-loader!less-loader'})
    }
}
module.exports = {
    loaders
}
