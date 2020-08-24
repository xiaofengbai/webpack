const webpackDevServer = require("webpack-dev-server");
const webpack = require("webpack");
const proxyConfig = require("../proxy");
const config = require("../webpack.dev");
const { createProxyMiddleware } = require("http-proxy-middleware");

const options = {
  open: false,
  hot: true,
  publicPath: config.output.publicPath,
  historyApiFallback: true,
};

webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);


// for (const key in proxyConfig) {
//   const proxy = proxyConfig[key];
//   proxy.onProxyRes = onProxyRes;
//   proxy.onError = onError;
//   server.use(key, createProxyMiddleware(proxy));
// }

server.listen(5000, "localhost", () => {
  console.log("dev server listening on port 5000");
});
