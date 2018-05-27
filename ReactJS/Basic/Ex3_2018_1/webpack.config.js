const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const merge = require("webpack-merge");

const { environment, projectPath } = require("./parts/constant");
const entry = require("./parts/entry");

const vendorFileName = "vendor-manifest.json";

module.exports = env => {
  env = environment[env] || environment.development;
  const isDevBuild = !(env === environment.production);

  const sharedConfig = () => ({
    mode: env,
    stats: { modules: false },
    resolve: { extensions: ['.js', '.jsx'] },
    output: {
      filename: "[name].js",
      publicPath: `dist/${env}/` // Webpack dev middleware, if enabled, handles requests for this URL prefix
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: "babel-loader",
          exclude: /(node_modules|bower_components)/
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf)$/,
          use: [
            {
              loader: "url-loader",
              options: {
                limit: 8192
              }
            }
          ]
        }
      ]
    }
  });

  // Configuration for client-side bundle suitable for running in browsers
  const clientBundleOutputDir = path.join(projectPath.clientOutputPath, env);
  const clientBundleConfig = merge(sharedConfig(), {
    entry: entry(env).client,
    module: {
      rules: [
        {
          test: /\.s?[ac]ss$/,
          use: [
            isDevBuild ? "style-loader" : MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader"
          ]
        }
      ]
    },
    output: { path: clientBundleOutputDir },
    plugins: [
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: "[name].css"
      }),
      new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: require(`${clientBundleOutputDir}/${vendorFileName}`)
      })
    ].concat(
      isDevBuild
        ? [
            // Plugins that apply in development builds only
            new webpack.SourceMapDevToolPlugin({
              filename: "[file].map", // Remove this line if you prefer inline source maps
              moduleFilenameTemplate: path.relative(
                clientBundleOutputDir,
                "[resourcePath]"
              ) // Point sourcemap entries to the original file locations on disk
            })
          ]
        : []
    )
  });

  return [clientBundleConfig];
};
