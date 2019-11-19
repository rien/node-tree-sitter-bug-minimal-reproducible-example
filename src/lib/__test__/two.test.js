const Tokenizer = require("../tokenizer");

test("tokenizer should be created", () => {
  expect(new Tokenizer("javascript")).toBeDefined();
});
