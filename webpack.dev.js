const path = require("path");
const merge = require("webpack-merge");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const baseConfig = require("./webpack.common");

module.exports = merge(baseConfig, {
  devtool: "inline-source-map",
  mode: "development",
  devServer: {
    open: false,
    hot: true,
    contentBase: [path.join(__dirname, "static")],
    contentBasePublicPath: "/static",
    compress: true,
    port: process.env.PORT ? process.env.PORT : 9000,
    onListening: function (server) {
      const port = server.listeningApp.address().port;
      console.log("Listening on port:", port, process.env.NODE_ENV);
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": require("./config/env/dev.env.js"),
    }),
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
});
