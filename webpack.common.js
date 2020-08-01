const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const sassConfig = require("./config/css.config");
module.exports = {
  entry: {
    app: "./src/index.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    filename: "js/[name].[hash].js",
    chunkFilename: "js/[id].[hash].js",
  },
  module: {
    rules: [
      {
        // test: /\.(scss|css|js)$/,
        sideEffects: false,
      },
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
            name: "/static/images/[name].[ext]",
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
      utils: path.resolve(__dirname, "./src/utils"),
    },
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      maxAsyncRequests: 4,
      minSize: 10000,
      name(module, chunks, cacheGroupKey) {
        const moduleFileName = module
          .identifier()
          .split("/")
          .reduceRight((item) => item);
        const allChunksNames = chunks.map((item) => item.name).join("~");
        return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
      },
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash].css",
      chunkFilename: "css/[id].[contenthash].css",
    }),
  ],
};
