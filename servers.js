const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const whm = require("webpack-hot-middleware");
const app = express();
const bodyParser = require("body-parser");
const config = require("./webpack.dev");
const compiler = webpack(config);
require("console-stamp")(console, "HH:MM:ss.l");

app.use(bodyParser.json());

app.use(
  require("morgan")("dev", {
    skip: function (req, res) {
      return res.statusCode < 400;
    },
  })
);
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  })
);
app.use(
  whm(compiler, {
    clientLogLevel: "info",
    inline: true,
    publicPath: config.output.publicPath,
  })
);
app.all("*", function (req, res, next) {
  console.log("Accessing the secret section ...");
  next();
});
// Serve the files on port 3000.
app.listen(3000, function () {
  console.log("Example app listening on port 3000!\n");
});
