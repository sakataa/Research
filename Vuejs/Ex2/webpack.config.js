var path = require('path');

module.exports = {
    entry: {
        build: "./src/app.js"
    },
    output: {
        path: path.resolve(__dirname, './'),
        filename: './dist/[name].js'
    },
    devtool: 'source-map'
};