const { NODE_ENV } = process.env;
const config = require("./index");
module.exports = {
  imgUrl:
    NODE_ENV === "production"
      ? config.build.assets.path
      : config.dev.assets.path,
};
