var classes = require('classes')
var domify = require('domify')
var once = require('once')
var template = require('./template.html')

var LOADING_TEXT = '加载中...'
var PULL_TEXT = '下拉刷新'
var RELEASE_TEXT = '释放更新'

function prepend(parentNode, node) {
  if (parentNode.firstChild) {
    parentNode.insertBefore(node, parentNode.firstChild)
  } else {
    parentNode.appendChild(node)
  }
}

module.exports = function PTR(el, opt, fn) {
  if (!(this instanceof PTR)) return new PTR(el, opt, fn)
  if (typeof opt === 'function') {
    fn = opt
    opt = {}
  }
  this.LOADING_TEXT = opt.LOADING_TEXT || LOADING_TEXT
  this.PULL_TEXT = opt.PULL_TEXT || PULL_TEXT
  this.RELEASE_TEXT = opt.RELEASE_TEXT || RELEASE_TEXT
  this.timeout = opt.timeout || 10000
  var start
  var loading
  var box = domify(template)
  var first = el.firstElementChild
  if (first) {
    prepend(first, box)
  } else {
    prepend(el, box)
  }
  var imgEl = box.querySelector('.ptr_image')
  var textEl = box.querySelector('.ptr_text')
  var self = this
  function onscroll() {
    if (loading) return
    var top = el.scrollTop
    if (top < 0 && top >= - 40) {
      textEl.textContent = self.PULL_TEXT
    }
    if (top < -40) {
      classes(imgEl).add('ptr_rotate')
      textEl.textContent = self.RELEASE_TEXT
      start = true
    } else {
      classes(imgEl).remove('ptr_rotate')
      start = false
    }
  }
  el.addEventListener('scroll', onscroll, false)

  function callback() {
    el.scrollTop = 0
    loading = false
    textEl.textContent = self.PULL_TEXT
    imgEl.className = 'ptr_image'
  }

  var refresh = this.refresh = function (e) {
      if (e) e.stopImmediatePropagation()
      el.scrollTop = -40
      imgEl.className += ' ptr_loading'
      textEl.textContent = self.LOADING_TEXT
      loading = true
      var timeout = setTimeout(callback, self.timeout)
      var cb = once(function () {
        clearTimeout(timeout)
        callback()
      })
      var res = fn(cb)
      if (res && typeof res.then === 'function') {
        res.then(cb, cb)
      }
  }

  var end = function (e) {
    if (start) {
      refresh(e)
    }
    start = false
  }
  document.addEventListener('touchend', end)

  this.unbind = function () {
    el.removeEventListener('scroll', onscroll)
    document.removeEventListener('touchend', end)
  }
}
