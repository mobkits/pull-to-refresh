var events = require('event');
var classes = require('classes');
var domify = require('domify');
var Tween = require('tween');
var raf = require('raf');
var once = require('once');
var template = require('./template.html');
var Iscroll = require('iscroll');

var LOADING_TEXT = '加载中...';
var PULL_TEXT = '下拉刷新';
var RELEASE_TEXT = '释放更新';

function prepend(parentNode, node) {
  if (parentNode.firstChild) {
    parentNode.insertBefore(node, parentNode.firstChild);
  } else {
    parentNode.appendChild(node);
  }
}

module.exports = function PTR(el, opt, fn) {
  if (!(this instanceof PTR)) return new PTR(el, opt, fn);
  if (typeof opt === 'function') {
    fn = opt;
    opt = {};
  }
  this.LOADING_TEXT = opt.LOADING_TEXT || LOADING_TEXT;
  this.PULL_TEXT = opt.PULL_TEXT || PULL_TEXT;
  this.RELEASE_TEXT = opt.RELEASE_TEXT || RELEASE_TEXT;
  this.timeout = opt.timeout || 10000;
  var start;
  var loading;
  prepend(el, domify(template))
  var imgEl = el.querySelector('.ptr_image');
  var textEl = el.querySelector('.ptr_text');
  var iscroll = new Iscroll(el, {
    handlebar: true,
    autorefresh: false
  });

  iscroll.on('scroll', function(top) {
    if (loading) return;
    if (top < 0 && top >= - 40) {
      textEl.textContent = this.PULL_TEXT;
    }
    if (top < -40) {
      classes(imgEl).add('ptr_rotate');
      textEl.textContent = this.RELEASE_TEXT;
      start = true;
    } else {
      classes(imgEl).remove('ptr_rotate');
      start = false;
    }
  }.bind(this))

  var self = this;
  function callback() {
    iscroll.scrollTo(0, 100);
    iscroll.refresh();
    loading = false;
    textEl.textContent = self.PULL_TEXT;
    imgEl.className = 'ptr_image';
  }

  var refresh = this.refresh = function () {
      iscroll.scrollTo(40, 100);
      imgEl.className += ' ptr_loading';
      textEl.textContent = self.LOADING_TEXT;
      loading = true;
      var timeout = setTimeout(callback, self.timeout);
      var cb = once(function () {
        clearTimeout(timeout);
        callback();
      });
      fn(cb);
  };

  this.unbind = function () {
    iscroll.unbind();
  }

  iscroll.on('release', function () {
    if (start) {
      refresh();
    }
    start = false;
  })
}
