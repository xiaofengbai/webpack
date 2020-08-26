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
const f1 = function () {};

const [a, b] = [1, 2];