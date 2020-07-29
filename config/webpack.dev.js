const path = require("path");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.common");

module.exports = merge(baseConfig, {
  devtool: "inline-source-map",
  devServer: {
    open: false,
    hot: true,
    contentBase: path.join(__dirname, "./dist"),
    compress: true,
    port: 9000,
  },
});
