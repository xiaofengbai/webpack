const path = require("path");
const merge = require("webpack-merge");
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const baseConfig = require("./webpack.common");

module.exports = merge(baseConfig, {
  devtool: "inline-source-map",
  mode: "development",
  devServer: {
    open: false,
    hot: true,
    contentBase: path.join(__dirname, "./dist"),
    compress: true,
    port: process.env.PORT ? process.env.PORT : 9000,
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": require("./config/env/env.dev"),
    }),
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new CopyPlugin({
      patterns: [{ from: path.resolve(__dirname, "./static"), to: "static" }],
    }),
  ],
});
