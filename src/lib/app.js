const Tokenizer = require('./tokenizer.js');
const fs = require('fs');

let tokenizer = new Tokenizer("javascript");
let tokens = tokenizer.tokenize(fs.readFileSync('sample.js'));
console.log(tokens);
