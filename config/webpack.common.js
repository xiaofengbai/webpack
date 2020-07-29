const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const sassConfig = require("./css.config");
module.exports = {
  entry: {
    common: "./index.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[hash].js",
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          "postcss-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        include: path.resolve(__dirname, "./static"),

        use: {
          loader: "url-loader",
          options: {
            limit: 8192,
            name: "[name].[ext]",
          },
        },
      },
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: "babel-loader",
        },
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      src: path.resolve(__dirname, "./src"),
    },
  },
  optimization: {},
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
    new webpack.HotModuleReplacementPlugin({}),
    new MiniCssExtractPlugin(),
  ],
};
