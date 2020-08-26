const path = require("path");
const common = require("./webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const merge = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = merge(common, {
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[hash].js",
    publicPath: "/",
  },
  devtool: "#source-map",
  plugins: [
    new CleanWebpackPlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode: process.env.ANALYZING ? "static" : "disabled",
    }),
  ],
  optimization: {
    minimizer: [new UglifyJsPlugin({ sourceMap: true })],
  },
  performance: {
    hints: false,
  },
  mode: "production",
});
