var path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        'ContactApp/build/main': './ContactApp/main.js',
        'BankApp/build/main': './BankApp/App.js',
        'fluxbank/build/main': './fluxbank/app/App.js',
        'AirCheapApp/build/main': './AirCheapApp/app/App.jsx'
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