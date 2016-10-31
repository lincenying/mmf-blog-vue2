var autoprefixer = require('autoprefixer')
var browserslist = require('browserslist')

module.exports = {
    plugins: [autoprefixer({browsers: browserslist('last 2 version, > 0.1%')})]
}
