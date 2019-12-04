# The bug

```
yarn run v1.19.1
PASS src/lib/__test__/two.test.js
FAIL src/lib/__test__/one.test.js
  ● Test suite failed to run

    TypeError: Illegal invocation

    > 1 | const Parser = require("tree-sitter");
        | ^
      2 | 
      3 | class Tokenizer {
      4 | 

      at Object.get [as rootNode] (node_modules/tree-sitter/index.js:20:35)
      at Object.<anonymous> (node_modules/tree-sitter/index.js:16:26)
      at Object.<anonymous> (src/lib/tokenizer.js:1:1)

Test Suites: 1 failed, 1 passed, 2 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        0.889s, estimated 1s
Ran all test suites.
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
```

# How to reproduce?

```
# Clone example
git clone git@github.com:rien/node-tree-sitter-bug-minimal-reproducible-example.git
cd node-tree-sitter-bug-minimal-reproducible-example

# Install dependencies
yarn install

# Run jest with all tests
yarn run jest # will possibly succeed
yarn run jest # will fail with 'TypeError: invalid invocation'

# Run jest a single test at a time
yarn run test src/lib/__test__/one.test.ts # succeeds
yarn run test src/lib/__test__/two.test.ts # succeeds

# Run all 100+ ava tests
yarn run ava # succeeds
```

Running `yarn run jest --clearCache` sometimes solves this issue for a few runs.

# Cause

Jest overrides the `require` behaviour, which causes the native code to be
initialized more than once. Only the first initialization (wrapping a native 
object) succeeds, causing the initializations thereafter to fail.

# Fix

A possible fix is to bind the module that can only be included once to a global
variable, like in this commit:

https://github.com/rien/node-tree-sitter-bug-minimal-reproducible-example/commit/57606393c8977d72f926e866abf3996ac75c87a4

However, if your project is using TypeScript this will become very messy to let
this work properly.
