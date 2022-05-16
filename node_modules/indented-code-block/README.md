# Indented code block
Get code block based on indents.

```jade
div
    | yep

div
    | nope

```

```js
var source = fs.readFileSync('./test/fixtures/doc.jade', 'utf8');
var byLine = require('../index').byLine;
byLine(source, 1); // div yep
byLine(source, 3); // div nope
```