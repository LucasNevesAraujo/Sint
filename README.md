# Sint

A Spreadsheet language interpreter

### Basic Usage Example ###

```js
const interpreter = new Sint.Interpreter();
const result = interpreter.run('=1 + POW(2,3)');

console.log(result); // 9
```

### How to build ###

```
$> npm install
```

Then, to build the source, run:

```
$> npm run dist
```

After that, you can open `./example/index.html` on your browser to see some usage examples.

### How to generate the documentation ###

The docs can be generated using npm:

```
$> npm run docs
```

### License ###

This content is released under the [MIT License](http://opensource.org/licenses/MIT).
