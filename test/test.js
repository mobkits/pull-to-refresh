/*global describe, it, beforeEach, afterEach*/
var assert = require('assert')
var Ptr = require('..')
var Touch = require('touch-simulate')
var Iscroll = require('iscroll')

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
})

describe('scroll', function () {
  it('should show pull text', function () {
    var ptr = Ptr(scrollable, function () {})
    Iscroll(scrollable)
    var li = scrollable.querySelector('li')
    var t = Touch(li, {speed: 200})
    return t.moveDown(30).then(function () {
      var tel = getElement('text')
      assert.equal(tel.textContent, ptr.PULL_TEXT)
    })
  })
  it('should show pull text', function () {
    var ptr = Ptr(scrollable, function () {})
    Iscroll(scrollable)
    var li = scrollable.querySelector('li')
    var t = Touch(li, {speed: 200})
    return t.moveDown(50, false).then(function () {
      var tel = getElement('text')
      assert.equal(tel.textContent, ptr.RELEASE_TEXT)
      ptr.unbind()
    })
  })

  it('should show loading text on end', function () {
    var ptr = Ptr(scrollable, function () {})
    Iscroll(scrollable)
    var li = scrollable.querySelector('li')
    var t = Touch(li, {speed: 200})
    return t.moveDown(60).then(function () {
      var tel = getElement('text')
      assert.equal(tel.textContent, ptr.LOADING_TEXT)
      ptr.unbind()
    })
  })

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
      assert.equal(tel.textContent, ptr.PULL_TEXT)
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

  it('should reset text after loading', function () {
    var ptr = Ptr(scrollable, function (cb) {
      cb()
    })
    Iscroll(scrollable)
    var li = scrollable.querySelector('li')
    var t = Touch(li, {speed: 200})
    return t.moveDown(60).then(function () {
      var tel = getElement('text')
      assert.equal(tel.textContent , ptr.PULL_TEXT)
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
      return t.wait(220)
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
      assert.equal(tel.textContent, ptr.PULL_TEXT)
    })
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
