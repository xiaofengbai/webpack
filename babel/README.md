# Babel

Babel 是一个 JavaScript 编译器

## Babel 能做什么

- 语法转换
- 通过 Polyfill 兼容
- 源码转换(codemods)

## 基本原理

Babel 的编译过程和大多数其他语言的编译器相似，可以分为三个阶段：

- 解析（Parsing）：将代码字符串解析成抽象语法树。
- 转换（Transformation）：对抽象语法树进行转换操作。
- 生成（Code Generation）: 根据变换后的抽象语法树再生成代码字符串。

![step](https://zcy-video.oss-cn-shanghai.aliyuncs.com/medical/zooTeam/9.16/167e0927a1a40b40)

