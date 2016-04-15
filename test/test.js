/*global describe, it, beforeEach, afterEach*/
var assert = require('assert')
var Ptr = require('..')
var Touch = require('touch-simulate')
var Iscroll = require('iscroll')
var template = require('../template.html')
var domify = require('domify')

var scrollable

function assign(to, from) {
  Object.keys(from).forEach(function (k) {
    to[k] = from[k]
  })
  return to
}

beforeEach(function () {
  scrollable = document.createElement('div')
  assign(scrollable.style, {
    position: 'fixed',
    top: '0px',
    left: '0px',
    width: '100px',
    height: '200px',
    padding: '0px',
    margin: '0px',
    overflow: 'hidden'
  })
  scrollable.appendChild(document.createElement('div'))
  var ul = document.createElement('ul')
  scrollable.firstChild.appendChild(ul)
  for (var i = 30; i >= 0; i--) {
    var li = document.createElement('li')
    li.textContent = i
    ul.appendChild(li)
  }
  document.body.appendChild(scrollable)
})

afterEach(function () {
  document.body.removeChild(scrollable)
})

function getElement(name) {
  return scrollable.querySelector('.ptr_' + name)
}

describe('Ptr()', function() {
  it('should init with new', function () {
    var ptr = new Ptr(scrollable, function () {
    })
    assert.equal(ptr.el, scrollable)
  })

  it('should init without new', function () {
    var ptr = Ptr(scrollable, function () {
    })
    assert.equal(ptr.el, scrollable)
  })

  it('shold init with empty list', function () {
    var ul = scrollable.querySelector('ul')
    ul.parentNode.removeChild(ul)
    var ptr = Ptr(scrollable, function () {
    })
    assert.equal(ptr.el, scrollable)
  })

  it('should init with empty scrollable', function () {
    scrollable.innerHTML = ''
    var ptr = Ptr(scrollable, function () {
    })
    assert.equal(ptr.el, scrollable)
  })

  it('should works with custom template', function () {
    var ptr = Ptr(scrollable, {template: template}, function () {
    })
    assert.equal(ptr.el, scrollable)
  })

  it('should works with custom template element', function () {
    var ptr = Ptr(scrollable, {template: domify(template)}, function () {
    })
    assert.equal(ptr.el, scrollable)
  })
})

describe('scroll', function () {

  it('should not load after move up and down', function () {
    var fired = false
    var ptr = Ptr(scrollable, function () {
      fired = true
    })
    Iscroll(scrollable)
    var li = scrollable.querySelector('li')
    var t = Touch(li, {speed: 200})
    return t.moveDown(60, false).then(function () {
      return t.moveUp(60)
    }).then(function () {
      var tel = getElement('text')
      assert.equal(fired, false)
      ptr.unbind()
    })
  })

  it('should call loading function', function () {
    var fired
    var ptr = Ptr(scrollable, function () {
      fired = true
    })
    Iscroll(scrollable)
    var li = scrollable.querySelector('li')
    var t = Touch(li, {speed: 200})
    return t.moveDown(60).then(function () {
      assert.equal(fired, true)
      ptr.unbind()
    })
  })

  it('should call loading function with option set', function () {
    var fired
    var ptr = Ptr(scrollable, function () {
      fired = true
    })
    Iscroll(scrollable)
    var li = scrollable.querySelector('li')
    var t = Touch(li, {speed: 200})
    return t.moveDown(60).then(function () {
      assert.equal(fired, true)
      ptr.unbind()
    })
  })

  it('should reset text after loading', function () {
    var ptr = Ptr(scrollable, function (cb) {
      cb()
    })
    Iscroll(scrollable)
    var li = scrollable.querySelector('li')
    var t = Touch(li, {speed: 200})
    return t.moveDown(60).then(function () {
      var tel = getElement('text')
      ptr.unbind()
    })
  })

  it('should scroll to top after loading', function () {
    var ptr = Ptr(scrollable, function (cb) {
      cb()
    })
    Iscroll(scrollable)
    var li = scrollable.querySelector('li')
    var t = Touch(li, {speed: 200})
    return t.moveDown(60).then(function () {
      ptr.unbind()
      return t.wait(500)
    }).then(function () {
      assert.equal(scrollable.scrollTop, 0)
    })
  })
})

describe('.unbind()', function() {
  it('should remove event listeners on unbind', function () {
    var ptr = Ptr(scrollable, function (cb) {
      cb()
    })
    Iscroll(scrollable)
    var li = scrollable.querySelector('li')
    var t = Touch(li, {speed: 200})
    ptr.unbind()
    return t.moveDown(80).then(function () {
      var tel = getElement('text')
    })
  })
})

describe('.refresh()', function() {
  it('should refresh', function () {
    var fired
    var ptr = Ptr(scrollable, function () {
      return new Promise(function (resolve) {
        fired = true
        resolve()
      })
    })
    Iscroll(scrollable)
    ptr.refresh()
    assert.equal(fired, true)
  })
})

describe('promise', function() {
  it('should support promise', function () {
    var fired
    var ptr = Ptr(scrollable, function () {
      return new Promise(function (resolve) {
        fired = true
        resolve()
      })
    })
    Iscroll(scrollable)
    var li = scrollable.querySelector('li')
    var t = Touch(li, {speed: 200})
    return t.moveDown(60).then(function () {
      assert.equal(fired, true)
      var iel = getElement('image')
      assert.equal(iel.className, 'ptr_image')
      ptr.unbind()
    })
  })
})

