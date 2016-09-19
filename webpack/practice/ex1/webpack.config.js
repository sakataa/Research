const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const validate = require('webpack-validator');
const parts = require('./libs/parts');

const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build')
};

const common = {
    entry: {
        app: PATHS.app
    },
    output: {
        path: PATHS.build,
        filename: '[name].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Webpack demo'
        })
    ]
};

var config;

// Detect how npm is run and branch based on that
switch (process.env.npm_lifecycle_event) {
    case 'build':
        config = merge(
            common,
            parts.setupCSS(PATHS.app),
            {
                devtool: 'source-map'
            },
            parts.minify()
        );
        break;
    default:
        config = merge(
            common,
            parts.devServer({
                host: process.env.HOST,
                port: process.env.PORT
            }),
            parts.setupCSS(PATHS.app),
            {
                devtool: 'eval-source-map'
            }
        );
}

module.exports = validate(config);