const webpack = require("webpack");
const path = require("path");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const Webpackbar = require("webpackbar");
const merge = require("webpack-merge");
const common = require("./webpack.common");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = merge(common, {
  output: {
    publicPath: "/",
    filename: "js/[name].[contenthash].js",
    chunkFilename: "js/[name].[contenthash].js",
  },
  devtool: "#source-map",
  plugins: [
    new CleanWebpackPlugin(),
    new Webpackbar(),
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
    new webpack.DefinePlugin({
      "process.env": require("./config/env/prod.env.js"),
    }),
    new CopyPlugin({
      patterns: [{ from: path.resolve(__dirname, "./static"), to: "static" }],
    }),
  ],
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: { safe: true, map: { inline: false } },
      }),
      new UglifyJsPlugin({ sourceMap: true }),
    ],
  },
  performance: {
    hints: false,
  },
  mode: "production",
});
