# The bug

```
yarn run v1.19.1
$ jest
 PASS  src/lib/__test__/one.test.ts
 FAIL  src/lib/__test__/two.test.ts
  ● Test suite failed to run

    TypeError: Illegal invocation

    > 1 | import { default as Parser } from "tree-sitter";
        | ^
      2 |
      3 | export class Tokenizer {
      4 |

      at Object.get [as rootNode] (node_modules/tree-sitter/index.js:20:35)
      at Obje`
```

# How to reproduce?

```
yarn install
yarn run test # will possibly succeed
yarn run test # will fail with 'TypeError: invalid invocation'

yarn run test src/lib/__test__/one.test.ts # succeeds
yarn run test src/lib/__test__/two.test.ts # succeeds
```

Running `yarn run test --clearCache` sometimes solves this issue for a few runs.


