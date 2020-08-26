"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.default = void 0;

var _default = ({ types: t }) => {
  return {
    visitor: {
      VariableDeclarator(path) {
        console.log(22222, path.node);
        if (path.node.id.name == "generate1") {
          console.log(22222, path.node.id.name);
          path.node.id = t.identifier("generate1");
        }
      },
    },
  };
};

exports.default = _default;
