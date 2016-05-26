/**
 * Regexp
 */

var rtemplate = /(\\?:|::)([$A-Za-z_][[$A-Za-z_\.0-9]+)/g
var prop = require('propget')

/**
 * Export `template`
 */

module.exports = template

/**
 * Render the template
 */

function template (str, obj) {
  return arguments.length === 2
    ? compile(str)(obj)
    : compile(str)
}

/**
 * Compile the template
 */

function compile (str) {
  return function render (obj) {
    obj = obj || {}
    return str.replace(rtemplate, function (sub, ch, name) {
      if (ch === '\\:') {
        return ch.slice(1) + name
      } else if (ch === '::') {
        return sub
      } else {
        return prop(obj, name)
      }
    })
  }
}
