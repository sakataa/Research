var path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './app.js',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'build')
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
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        hot: true,
        inline: true,
        port: 9000,
        noInfo: false,
        open: true,
        openPage: "./",
        watchOptions: { aggregateTimeout: 300, poll: 1000 }
    },
    devtool: "source-map",
    watch: true
}