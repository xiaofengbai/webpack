"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _defineProperty = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/define-property"));

(0, _defineProperty.default)(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default(_ref) {
  var t = _ref.types;
  return {
    visitor: {
      VariableDeclarator: function VariableDeclarator(path) {
        console.log(22222, path.node);

        if (path.node.id.name == "generate1") {
          console.log(22222, path.node.id.name);
          path.node.id = t.identifier("generate1");
        }
      }
    }
  };
};

exports.default = _default;