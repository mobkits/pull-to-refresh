require('../ptr.css')
var el = document.getElementById('demo')
var Ptr = require('..')
var domify = require('domify')
var list =el.querySelector('.content')
var ptr = new Ptr(el, function(cb) {
  var n = Math.floor(Math.random() * 10)
  var html = ''
  for (var i = 0; i < 5; i ++) {
    html += '<li>' + n + '</li>'
  }
  setTimeout(function() {
    var dom = domify(html)
    list.insertBefore(dom, list.firstElementChild)
    cb()
  }, 1000)
})
document.querySelector('header').addEventListener('touchend', function() {
  ptr.refresh()
})
