var path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        'ContactApp/build/main': './ContactApp/main.js'
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
            use: 'babel-loader'
        }]
    },
    devtool: "source-map",
    watch: true
}