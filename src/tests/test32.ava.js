const test = require("ava");
const Tokenizer = require("../lib/tokenizer");

test('can be constructed', t => {
	const tokenizer = new Tokenizer("javascript");
  t.false(typeof tokenizer == undefined || tokenizer == null);
});
