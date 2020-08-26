"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs3/regenerator"));

var _promise = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/promise"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/asyncToGenerator"));

function f1() {
  return _f.apply(this, arguments);
}

function _f() {
  _f = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return f2();

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _f.apply(this, arguments);
}

new _promise.default(function (resolve, rejec) {
  resolve();
});
/* import { parse } from "@babel/parser";
import generate from "@babel/generator";
const code0 = `
  const a = 1;
`;

const ast = parse(code0, {
  // plugins: ["jsx"],
});
const generate1 = generate(ast.program);
console.log(JSON.stringify(ast, null, 2), generate1);
 */