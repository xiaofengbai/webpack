import { parse } from "@babel/parser";
import generate from "@babel/generator";
const code = `
const a = 1;
`;

const ast = parse(code, {
  // plugins: ["jsx"],
});
const generate1 = generate(ast.program);
console.log(JSON.stringify(ast, null, 2), generate1);
