# Babel

Babel 是一个 JavaScript 编译器

## Babel 能做什么

- Parse(解析)：将源代码转换成更加抽象的表示方法（例如抽象语法树）
- Transform(转换)：对（抽象语法树）做一些特殊处理，让它符合编译器的期望
- Generate(代码生成)：将第二步经过转换过的（抽象语法树）生成新的代码

```js
const obj = {
  a: {
    b: { c: { d: { e: 1 }, f: 2 } },
  },
};
```

### 能力范围

- Babel 只是转译新标准引入的语法
  - 箭头函数
  - let / const
  - 解构
- 新标准引入的全局变量、部分原生对象新增的原型链上的方法，Babel 表示无能为力

  - 全局变量
    - Promise
    - Symbol
    - WeakMap
    - Set
  - includes
  - generator

对于这些，需要借助 polyfill 来处理

## 基本原理

Babel 的编译过程和大多数其他语言的编译器相似，可以分为三个阶段：

- 解析（Parsing）：将代码字符串解析成抽象语法树。
- 转换（Transformation）：对抽象语法树进行转换操作。
- 生成（Code Generation）: 根据变换后的抽象语法树再生成代码字符串。

## 核心库 @babel/core

Babel 的核心功能包含在 @babel/core 模块中,没有它,在 babel 的世界里注定寸步难行.不安装 @babel/core,无法使用 babel 进行编译

![d1](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/185df380c5d8443ea6ce210fc7b12159~tplv-k3u1fbpfcp-zoom-1.image)

## CLI 命令行工具 @babel/cli

babel 提供的命令行工具,主要是提供 babel 这个命令

```s
npm i @babel/cli
```

那我们在项目里面可以使用`babel`命令,比如 `babel index.js` 会对 index.js 进行编译

## 插件

Babel 构建在插件之上,可以使用插件组成一个转换通道,插件分为语法插件和转换插件

> 语法插件 比如我们需要解析 react 那就需要 `preset-react` 来解析 jsx 语法来生成 AST
>
> 转换插件 比如我们需要把箭头函数转换成 ES5 支持 需要配置 `plugin-transform-arrow-functions`

## Babel 配置

[官方文档](https://babel.docschina.org/docs/en/configuration)

```json
{
  "presets": [],
  "plugins": []
}
```

### presets

presets 即是多个插件的集合,比如我们常用的`preset-env` 他是智能的 parse,通过配置,可以按需加载多个 plugin

#### 如何智能的工作

通过[browserslist](https://github.com/browserslist/browserslist),[compat-table](https://github.com/kangax/compat-table) 和[electron-to-chromium](https://github.com/Kilian/electron-to-chromium)
利用这些数据源来维护哪个版本的受支持目标环境获得了 JavaScript 语法或浏览器功能的支持,以及这些语法和功能到 Babel transform 插件和 core-js polyfills 的映射

eg

---

index.js

```js
const [a, b] = [1, 2];
```

.browserslistrc

```s
last 2 Chrome versions
```

.babelrc

```json
{
  "presets": ["@babel/preset-env"]
}
```

输出

```js
const [a, b] = [1, 2];
```

那么我们修改`.browserslistrc`

```
ie >10
```

输出

```js
var a = 1,
  b = 2;
```

---

index.js

```js
async function f1() {
  await f2();
}

new Promise((resolve, rejec) => {
  resolve();
});
```

输出

```js
"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}

function f1() {
  return _f.apply(this, arguments);
}

function _f() {
  _f = _asyncToGenerator(
    /*#__PURE__*/ regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch ((_context.prev = _context.next)) {
            case 0:
              _context.next = 2;
              return f2();

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })
  );
  return _f.apply(this, arguments);
}

new Promise(function (resolve, rejec) {
  resolve();
});
```

为什么异步函数解析成功,但是 Promise 没有解析成功呢

我们需要引入`Polyfill`

安装

```s
npm install --save @babel/polyfill
```

引入 polyfill 就能完美兼容

```js
import "@babel/polyfill";

new Promise((resolve, rejec) => {
  resolve();
});
```

缺陷

**V7.4.0 开始@babel/polyfill 被弃用 需单独安装 core-js 和 regenerator-runtime 模块**

修改配置

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage",
        "corejs": 3
      }
    ]
  ]
}
```

输出

```js
"use strict";
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
require("regenerator-runtime/runtime");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}
function f1() {
  return _f.apply(this, arguments);
}
function _f() {
  _f = _asyncToGenerator(
    /*#__PURE__*/ regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch ((_context.prev = _context.next)) {
            case 0:
              _context.next = 2;
              return f2();

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })
  );
  return _f.apply(this, arguments);
}
new Promise(function (resolve, rejec) {
  resolve();
});
```

---

新问题

有没有发现`asyncGeneratorStep`和`_asyncToGenerator`每次都是重新引入,如果有很多个 js 调用 anync 的话,那么这两个就需要多次注入,引起打包体积过大

这时候我们需要引入 plugin-transform-runtime,使用 @babel/plugin-transform-runtime 插件,所有帮助程序都将引用模块 @babel/runtime,这样就可以避免编译后的代码中出现重复的帮助程序,有效减少包体积

修改配置

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage",
        "corejs": 3
      }
    ]
  ],
  "plugins": ["@babel/plugin-transform-runtime"]
}
```

输出结果

```js
"use strict";
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
var _regenerator = _interopRequireDefault(
  require("@babel/runtime/regenerator")
);
require("regenerator-runtime/runtime");
var _asyncToGenerator2 = _interopRequireDefault(
  require("@babel/runtime/helpers/asyncToGenerator")
);
function f1() {
  return _f.apply(this, arguments);
}
function _f() {
  _f = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/ _regenerator.default.mark(function _callee() {
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch ((_context.prev = _context.next)) {
            case 0:
              _context.next = 2;
              return f2();

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })
  );
  return _f.apply(this, arguments);
}
new Promise(function (resolve, rejec) {
  resolve();
});
```

新问题

有没有发现新增全局的 Promise 方法,污染了全局环境,那么在兼容 Promise 的浏览器中,性能可能会缩减,babel 官网也考虑到了,提供了@babel/runtime-corejs3

安装

```s
npm install @babel/runtime-corejs3 --save
```

修改配置

```json
{
  "presets": [["@babel/preset-env"]],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": 3
      }
    ]
  ]
}
```

输出

```js
"use strict";
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(
  require("@babel/runtime-corejs3/regenerator")
);
var _promise = _interopRequireDefault(
  require("@babel/runtime-corejs3/core-js-stable/promise")
);
var _asyncToGenerator2 = _interopRequireDefault(
  require("@babel/runtime-corejs3/helpers/asyncToGenerator")
);
function f1() {
  return _f.apply(this, arguments);
}
function _f() {
  _f = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/ _regenerator.default.mark(function _callee() {
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch ((_context.prev = _context.next)) {
            case 0:
              _context.next = 2;
              return f2();

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })
  );
  return _f.apply(this, arguments);
}
new _promise.default(function (resolve, rejec) {
  resolve();
});
```

Babel7 支持

```js
export type ParserPlugin =
  | "asyncGenerators"
  | "bigInt"
  | "classPrivateMethods"
  | "classPrivateProperties"
  | "classProperties"
  | "decimal"
  | "decorators"
  | "decorators-legacy"
  | "doExpressions"
  | "dynamicImport"
  | "estree"
  | "exportDefaultFrom"
  | "exportNamespaceFrom"
  | "flow"
  | "flowComments"
  | "functionBind"
  | "functionSent"
  | "importMeta"
  | "jsx"
  | "logicalAssignment"
  | "moduleAttributes"
  | "nullishCoalescingOperator"
  | "numericSeparator"
  | "objectRestSpread"
  | "optionalCatchBinding"
  | "optionalChaining"
  | "partialApplication"
  | "pipelineOperator"
  | "placeholders"
  | "privateIn"
  | "throwExpressions"
  | "topLevelAwait"
  | "typescript"
  | "v8intrinsic";
```

词法分析

```json
[
  {
    "type": "Keyword",
    "value": "const"
  },
  {
    "type": "Identifier",
    "value": "a"
  },
  {
    "type": "Punctuator",
    "value": "="
  },
  {
    "type": "Numeric",
    "value": "1"
  },
  {
    "type": "Punctuator",
    "value": ";"
  }
]
```

---

ast（抽象语法树）

```json
{
  "type": "File",
  "start": 0,
  "end": 10,
  "loc": {
    "start": {
      "line": 1,
      "column": 0
    },
    "end": {
      "line": 1,
      "column": 10
    }
  },
  "errors": [],
  "program": {
    "type": "Program",
    "start": 0,
    "end": 10,
    "loc": {
      "start": {
        "line": 1,
        "column": 0
      },
      "end": {
        "line": 1,
        "column": 10
      }
    },
    "sourceType": "script",
    "interpreter": null,
    "body": [
      {
        "type": "VariableDeclaration",
        "start": 0,
        "end": 10,
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 10
          }
        },
        "declarations": [
          {
            "type": "VariableDeclarator",
            "start": 4,
            "end": 9,
            "loc": {
              "start": {
                "line": 1,
                "column": 4
              },
              "end": {
                "line": 1,
                "column": 9
              }
            },
            "id": {
              "type": "Identifier",
              "start": 4,
              "end": 5,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 4
                },
                "end": {
                  "line": 1,
                  "column": 5
                },
                "identifierName": "a"
              },
              "name": "a"
            },
            "init": {
              "type": "NumericLiteral",
              "start": 8,
              "end": 9,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 8
                },
                "end": {
                  "line": 1,
                  "column": 9
                }
              },
              "extra": {
                "rawValue": 1,
                "raw": "1"
              },
              "value": 1
            }
          }
        ],
        "kind": "let"
      }
    ],
    "directives": []
  },
  "comments": []
}
```

### 注意

- 插件在 Presets 前运行
- 插件顺序从前往后排列
- Preset 顺序是颠倒的（从后往前）

### 参考

https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md#toc-stages-of-babel
