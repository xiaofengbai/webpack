import { parse } from '@babel/parser';
const code = `const a : string = b + c`
console.log(parse(code, {
  plugins: ['typescript']
}))