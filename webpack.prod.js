const webpack = require("webpack");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const merge = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common, {
  output: {
    publicPath: "/",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        uglifyOptions: {
          warnings: false,
        },
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  performance: {
    hints: false,
  },
  mode: "production",
});
