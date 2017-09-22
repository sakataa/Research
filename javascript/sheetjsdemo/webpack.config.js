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
        extensions: [".js"]
    },
    module: {
        rules: [{
            test: /\.(js)$/,
            use: 'babel-loader',
            exclude: /(node_modules|bower_components)/
        }]
    },
    node: { fs: 'empty' },
    externals: [{
        './cptable': 'var cptable',
        'xlsx': 'xlsx'
    }],
    devtool: "source-map"
};