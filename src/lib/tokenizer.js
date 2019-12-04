const Parser = require('tree-sitter');

class Tokenizer {

  constructor(language) {
    this.language = language;
    this.parser = new Parser();
    const languageModule = require("tree-sitter-" + language);
    this.parser.setLanguage(languageModule);
  }

  tokenize(text) {
    const tree = this.parser.parse(text.toString("utf8"));
    return tree.rootNode.toString();
  }
}

module.exports = Tokenizer;
