var path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const extractSass = new MiniCssExtractPlugin({
  filename: "[name].css"
});

module.exports = {
  mode: "development",
  entry: {
    "build/app": "./app.js",
    "_fixed-table-header": "./styles/components/_fixed-table-header.scss"
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "./")
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.scss$/,
        use: [{
            loader: MiniCssExtractPlugin.loader
        }, {
            loader: "css-loader"
        }, {
            loader: "sass-loader",
            options: {
            }
        }]
    }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: "[name].css",
        chunkFilename: "[id].css"
    })
  ],
  devtool: "source-map"
};
