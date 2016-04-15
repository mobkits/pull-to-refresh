var classes = require('classes')
var domify = require('domify')
var once = require('once')
var template = require('./template.html')

function prepend(parentNode, node) {
  if (parentNode.firstChild) {
    parentNode.insertBefore(node, parentNode.firstChild)
  } else {
    parentNode.appendChild(node)
  }
}

/**
 * `el` the scrollable element
 * `callback` is called when loading start, the first argument which is a callback function should be called after the dom prepend to the list.
 * `option.template` contains a custom template(string or element) for the inserted element
 * `option.timeout` millisecond of request timeout, default `10000`
 *
 * @param  {Element}  el
 * @param  {Object} opt
 * @param  {Function}  fn
 * @api public
 */
module.exports = function PTR(el, opt, fn) {
  if (!(this instanceof PTR)) return new PTR(el, opt, fn)
  if (typeof opt === 'function') {
    fn = opt
    opt = {}
  }
  this.el = el
  this.timeout = opt.timeout || 10000
  var start
  var loading
  var box
  var tel = opt.template
  // custom template
  if (typeof tel === 'string') {
    box = domify(template)
  } else if (tel && tel.nodeType) {
    box = opt.template
  } else {
    box = domify(template)
  }
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
    }
    if (top < -40) {
      classes(imgEl).add('ptr_rotate')
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
    imgEl.className = 'ptr_image'
  }

  /**
   * Refresh for more data
   *
   * @param  {Event}  event
   * @api public
   */
  var refresh = this.refresh = function (e) {
      if (e) e.stopImmediatePropagation()
      el.scrollTop = -40
      imgEl.className += ' ptr_loading'
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

  /**
   * Unbind event listener and remove inserted element
   *
   * @return {undefined}
   * @api public
   */
  this.unbind = function () {
    el.removeEventListener('scroll', onscroll)
    document.removeEventListener('touchend', end)
  }
}
