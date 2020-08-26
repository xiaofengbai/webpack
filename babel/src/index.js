async function f1() {
  await f2();
}

new Promise((resolve, rejec) => {
  resolve();
});

class A {
  name = "baixiaofeng";
  getName() {
    return this.name;
  }
}
class B extends A {}
const b = new B();
debugger;
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
