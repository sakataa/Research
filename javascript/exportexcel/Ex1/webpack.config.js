var path = require('path');

module.exports = {
    entry: './app.js',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'build')
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            use: 'babel-loader'
        }]
    }
}