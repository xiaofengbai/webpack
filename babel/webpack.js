const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[hash].js",
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
        },
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
    new webpack.HotModuleReplacementPlugin({}),
  ],
  devServer: {
    open: false,
    contentBase: path.join(__dirname, "dist"),
    port: 8899,
  },
  node: {
    fs: "empty",
  },
};
