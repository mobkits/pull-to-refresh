require('../ptr.css')
require('iscroll-component/iscroll.css')
var domify = require('domify')
var Iscroll = require('iscroll')
var Ptr = require('..')

var el = document.getElementById('scrollable')
var list = el.querySelector('.content')
var is = Iscroll(el, { handlebar: true })
var ptr = new Ptr(el, function() {
  var n = Math.floor(Math.random() * 10)
  var html = ''
  for (var i = 0; i < 5; i ++) {
    html += '<li>' + n + '</li>'
  }
  return new Promise(function (resolve) {
    setTimeout(function() {
      var dom = domify(html)
      list.insertBefore(dom, list.firstElementChild)
      // should be called or use Mutation Observer
      is.refresh()
      resolve()
    }, 1000)
  })
})

document.querySelector('header').addEventListener('touchend', function() {
  ptr.refresh()
})

var log = document.getElementById('log')
el.addEventListener('scroll', function () {
  //console.log(el.scrollTop)
  log.textContent = el.scrollTop
}, false)
