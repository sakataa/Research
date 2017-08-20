var path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: './app/app.js',
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
            use: 'babel-loader',
            exclude: /node_modules/
        }]
    },
    plugins: [
        new CleanWebpackPlugin(['build']),
        new HtmlWebpackPlugin({
            title: 'Development',
            template: './index.html'
        }),
         new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        port: 9000,
        compress: true,
        noInfo: false,
        open: true,
        contentBase: './'
    },
    devtool: "source-map"
}