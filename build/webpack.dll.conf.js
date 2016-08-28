var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: {
        vendor: [path.join(__dirname, "../src", "vendors.js")]
    },
    output: {
        path: path.join(__dirname, "../static", "dll"),
        filename: "[name].[chunkhash].js",
        publicPath: '/static/dll/',
        library: "[name]"
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        new webpack.DllPlugin({
            path: path.join(__dirname, "../static", "[name]-manifest.json"),
            name: "[name]",
            context: path.resolve(__dirname, "../src")
        }),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                //screw_ie8: true,
                warnings: false
            },
            mangle: {
                //screw_ie8: true
            },
            output: {
                comments: false,
                //screw_ie8: true
            }
        }),
        new HtmlWebpackPlugin({
            filename: '../../index.html',
            template: 'template/index.html',
            inject: true
        }),
        new HtmlWebpackPlugin({
            filename: '../../login.html',
            template: 'template/login.html',
            inject: true
        })
    ],
    resolve: {
        root: path.resolve(__dirname, "../src"),
        modulesDirectories: ["node_modules"]
    }
}
