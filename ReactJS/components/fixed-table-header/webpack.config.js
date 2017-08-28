var path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        'build/app': './app.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './')
    },
    resolve: {
        extensions: [".js", ".jsx"],
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            use: 'babel-loader',
            exclude: /(node_modules|bower_components)/,
        }]
    },
    devtool: "source-map",
    watch: true
}