const http = require("http");
const path = require("path");
const express = require("express");
const webpack = require("webpack");
const bodyParser = require("body-parser");
const log4js = require("log4js");
const config = require("./webpack.dev");
const compiler = webpack(config);
const proxyConfig = require("./proxy");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

log4js.configure({
  appenders: {
    console: {
      type: "console",
    },
  },
  categories: {
    default: {
      appenders: ["console"],
      level: "info",
    },
  },
});

const logger = log4js.getLogger();

// app.use(
//   log4js.connectLogger(logger, {
//     level: log4js.levels.DEBUG,
//     format:
//       ":remote-addr - -" +
//       ' ":method :url' +
//       " :status :content-length :response-time ",
//   })
// );

app.use(bodyParser.json());

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    logLevel: "info",
  })
);

app.get("/*", function (req, res) {
  logger.error(__dirname);
  res.sendFile(path.resolve(__dirname, "/pa", "a"));
});

app.use(
  webpackHotMiddleware(compiler, {
    log: console.log,
    path: "/__webpack_hmr",
    heartbeat: 10 * 1000,
  })
);

app.all("*", function (req, res, next) {
  logger.info(`[${req.method}]:${req.originalUrl} ${JSON.stringify(req.body)}`);
  next();
});

const onProxyRes = function (proxyRes, req, res) {
  logger.info(proxyRes);
};

// const onProxyReq = function (proxyReq, req, res) {
//   const info = `[proxy]:[${req.method}] ${req.originalUrl} => `;
//   logger.info(info);
// };

const onError = function (err, req, res) {
  logger.error(
    `[proxy]:[${req.method}] ${req.originalUrl} => ${err.address}${req.url}`
  );
};

for (const key in proxyConfig) {
  const proxy = proxyConfig[key];
  proxy.onProxyRes = onProxyRes;
  proxy.onError = onError;
  app.use(key, createProxyMiddleware(proxy));
}
var server = http.createServer(app);

server.listen(process.env.PORT || 3000, function () {
  logger.info("Listening on %j", server.address());
});
