const path = require("path");
const merge = require("webpack-merge");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const baseConfig = require("./webpack.common");

module.exports = merge(baseConfig, {
  devtool: "inline-source-map",
  mode: "development",
  // devServer: {
  //   open: false,
  //   hot: true,
  //   contentBase: [path.join(__dirname, "static")],
  //   contentBasePublicPath: "/static",
  //   compress: true,
  //   historyApiFallback: true,
  //   port: process.env.PORT ? process.env.PORT : 9000,
  //   before: function (app, serve, compiler) {
  //     console.log(app, serve);
  //   },
  //   onListening: function (server) {
  //     const port = server.listeningApp.address().port;
  //     console.log("Listening on port:", port, process.env.NODE_ENV);
  //   },
  //   clientLogLevel: "debug",
  //   inline: true,
  //   proxy: {
  //     "/api": {
  //       target: "http://10.2.2.3:8080",
  //       pathRewrite: { "^/api": "" },
  //       changeOrigin: true,
  //       onProxyReq: function (req, res, proxyReq) {},
  //     },
  //   },
  // },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": require("./config/env/dev.env.js"),
    }),
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "index/index.html",
      hot: true,
      chunks: ["app"],
    }),
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "index2/index.html",
      hot: true,
      chunks: ["app1"],
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
});
