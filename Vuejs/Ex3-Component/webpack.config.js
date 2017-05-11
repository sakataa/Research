var path = require('path');

module.exports = {
    entry: {
        bundle: "./src/app.js"
    },
    output: {
        path: path.resolve(__dirname, './'),
        filename: './dist/[name].js'
    },

    module: {
        rules: [{
            test: /\.vue$/,
            loader: "vue-loader"
        }]
    },
    devtool: 'source-map'
};