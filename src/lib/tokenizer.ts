import { default as Parser } from "tree-sitter";

export class Tokenizer {

  public readonly language: string;
  private readonly parser: Parser;

  constructor(language: string) {
    this.language = language;
    this.parser = new Parser();
    // tslint:disable-next-line: no-var-requires
    const languageModule = require("tree-sitter-" + language);
    this.parser.setLanguage(languageModule);
  }

  public tokenize(text: Buffer): string {
    const tree = this.parser.parse(text.toString("utf8"));
    return tree.rootNode.toString();
  }
}
