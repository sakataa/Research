const webpack = require('webpack');

exports.devServer = function(options) {
    return {
        devServer: {
            historyApiFallback: true,
            hot: true,
            inline: true,
            stats: 'errors-only',
            host: options.host,
            port: options.port
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin({
                multiStep: true
            })
        ]
    };
}

exports.setupCSS = function(paths) {
    return {
        module: {
            loaders: [{
                test: /\.css$/,
                loaders: ['style', 'css'],
                include: paths
            }]
        }
    };
}

exports.minify = function() {
    return {
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                // Don't beautify output (enable for neater output)
                beautify: false,
                // Eliminate comments
                comments: false,
                // Compression specific options
                compress: {
                    warnings: false,
                    // Drop `console` statements
                    drop_console: true
                },
                // Mangling specific options
                mangle: {
                    // Don't mangle $
                    except: ['$', 'webpackJsonp'],
                    // Don't care about IE8
                    screw_ie8: true,
                    // Don't mangle function names
                    keep_fnames: true
                }
            })
        ]
    };
}