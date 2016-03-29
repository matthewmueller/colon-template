
# colon-template

  simple inline template that uses colons. This probably already exists,
  but it's about as fast to make as find.

## Example

```js
var template = require('colon-template')
var fn = template('hi :friend, my name is :first_name and i am :age.years years and :age.months months old')
var locals = { friend: 'martha', first_name: 'matt', age: { years: 26 } }
```

## Installation

```
npm install colon-template
```

## License

MIT
