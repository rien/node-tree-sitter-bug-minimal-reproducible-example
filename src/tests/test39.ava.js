const test = require("ava");
const fs = require("fs");
const Tokenizer = require("../lib/tokenizer");

const expected = "(program (function_declaration name: (identifier) parameters: (formal_parameters) body: (statement_block (return_statement argument: (binary_expression left: (number) right: (number))))))";

test('can be constructed', t => {
	const tokenizer = new Tokenizer("javascript");
  t.false(typeof tokenizer == undefined || tokenizer == null);
});

test('can parse', t => {
	const tokenizer = new Tokenizer("javascript");
  const program = fs.readFileSync("sample.js");
  t.is(tokenizer.tokenize(program), expected);
});
