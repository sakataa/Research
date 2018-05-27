const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const merge = require('webpack-merge');

const { environment, projectPath } = require('./parts/constant');

module.exports = (env) => {
    env = environment[env] || environment.development;
    const isDevBuild = !(env === environment.production);
    const relativeOutputRootPath = path.join(projectPath.clientOutputPath, env);

    const sharedConfig = {
        mode: env,
        stats: { modules: false },
        module: {
            rules: [
                { 
                    test: /\.(png|woff|woff2|eot|ttf|svg)(\?|$)/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: { 
                                limit: 100000 
                            }
                        }
                    ]
                }
            ]
        },
        entry: {
            vendor: [
                'react',
                'react-dom',
                'react-redux',
                'redux',
                'redux-thunk'
            ],
        },
        output: {
            publicPath: `dist/`,
            filename: '[name].js',
            library: '[name]_[hash]',
        },
        plugins: [
            new webpack.NormalModuleReplacementPlugin(/\/iconv-loader$/, require.resolve('node-noop')), // Workaround for https://github.com/andris9/encoding/issues/16
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': isDevBuild ? '"development"' : '"production"'
            })
        ]
    };

    const clientBundleConfig = merge(sharedConfig, {
        output: { path: relativeOutputRootPath },
        module: {
            rules: [{
                test: /\.s?[ac]ss$/,
                use: [
                    isDevBuild ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }]
        },
        plugins: [
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: "[name].css"
            }),
            new webpack.DllPlugin({
                path: path.join(relativeOutputRootPath, '[name]-manifest.json'),
                name: '[name]_[hash]'
            })
        ]
    });

    return [clientBundleConfig];
};