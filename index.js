/**
 * Regexp
 */

var rtemplate = /(\\?:|::)([$A-Za-z_][[$A-Za-z_\.0-9]+)/g
var escape = require('escape-regexp')
var prop = require('propget')
var keys = Object.keys

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
    var keys = flatten(obj).map(function (key) { return escape(key) })
    var rtemplate = new RegExp('(\\\\?:|::)(' + keys.join('|') + '|[$A-Za-z_][[$A-Za-z_\.0-9]+)', 'g')
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

/**
 * Flatten object into an array of keys
 */

function flatten(target) {
  var output = []

  function step(object, prev) {
    keys(object).forEach(function(key) {
      var value = object[key]
      var isarray = Array.isArray(value)
      var type = Object.prototype.toString.call(value)
      var isobject = (
        type === "[object Object]" ||
        type === "[object Array]"
      )

      var newKey = prev
        ? prev + '.' + key
        : key

      if (!isarray && isobject && keys(value).length) {
        return step(value, newKey)
      }

      output.push(newKey)
    })
  }

  step(target)

  return output
}
