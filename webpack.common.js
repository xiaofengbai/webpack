const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const sassConfig = require("./config/css.config");
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
              importLoaders: 1,
            },
          },
          "postcss-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
              additionalData: (content) => {
                return (
                  Object.keys(sassConfig).map(
                    (k) => `\$${k}: ${sassConfig[k]};`
                  ) + content
                );
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        include: path.resolve(__dirname, "./static"),
        use: {
          loader: "url-loader",
          options: {
            limit: 1,
            esModule: false,
            name: "[name].[ext]",
          },
        },
      },
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: "babel-loader",
        },
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
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      chunkFilename: "[id].[contenthash].css",
    }),
  ],
};
