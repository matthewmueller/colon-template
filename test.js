var assert = require('assert')
var template = require('./')

describe('colon-template', function() {
  it('should compile', function() {
    var fn = template('hi :friend, my name is :first_name and i am :age.years years and :age.months months old')
    var locals = { friend: 'martha', first_name: 'matt', age: { years: 26 } }
    assert.equal(fn(locals), 'hi martha, my name is matt and i am 26 years and undefined months old')
  })

  it('should render', function() {
    var locals = { friend: 'martha', first_name: 'matt', age: { years: 26 } }
    var str = template(':friend, my name is :first_name and i am :age.years years and :age.months months old', locals)
    assert.equal(str, 'martha, my name is matt and i am 26 years and undefined months old')
  })

  it('should ignore escaped', function() {
    var locals = { friend: 'martha', first_name: 'matt', age: { years: 26 } }
    var str = template('\\:friend, my name is :first_name and i am \\:age.years years and :age.months months old', locals)
    assert.equal(str, ':friend, my name is matt and i am :age.years years and undefined months old')
  })

  it('should ignore double ::', function() {
    var locals = { friend: 'martha', first_name: 'matt', age: { years: 26 } }
    var str = template('::friend, my name is :first_name and i am \\:age.years years and :age.months months old', locals)
    assert.equal(str, '::friend, my name is matt and i am :age.years years and undefined months old')
  })

  it('should handle things at the end', function() {
    var locals = { value: { rem: 16 } }
    var str = template(':value.remrem', locals)
    assert.equal(str, '16rem')
  })
})
