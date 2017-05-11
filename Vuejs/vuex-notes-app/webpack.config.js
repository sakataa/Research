var path = require('path');

module.exports = {
    entry: {
        build: "./main.js"
    },
    output: {
        path: path.resolve(__dirname, './'),
        filename: '[name].js'
    },

    module: {
        rules: [{
                test: /\.vue$/,
                loader: "vue-loader"
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    },

    devtool: 'source-map'
};