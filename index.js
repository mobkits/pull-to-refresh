var events = require('event');
var classes = require('classes');
var domify = require('domify');
var Tween = require('tween');
var raf = require('raf');
var once = require('once');
var template = require('./template.html');
var dom = domify(template);

var LOADING_TEXT = '加载中...';
var PULL_TEXT = '下拉刷新';
var RELEASE_TEXT = '释放更新';

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
  var scrolling;
  var wrapper = el.querySelector('.ptr_wrap');
  wrapper.insertBefore(dom, wrapper.firstElementChild);
  var img = el.querySelector('.ptr_image');
  var text = el.querySelector('.ptr_text');

  events.bind(el, 'touchmove', function (e) {
    var rotate = 0;
    //prevent user scroll when we are loading or scrolling
    if (scrolling || loading) return e.preventDefault();
    var top = el.scrollTop;
    if (top < 0 && top >= - 40) {
      text.textContent = this.PULL_TEXT;
    }
    if (top < -40) {
      classes(img).add('ptr_rotate');
      text.textContent = this.RELEASE_TEXT;
      e.preventDefault();
      start = true;
    } else {
      classes(img).remove('ptr_rotate');
      start = false;
    }
  }.bind(this));

  var self = this;
  function callback() {
    loading = false;
    wrapper.style.webkitTransform = 'translateY(0px)';
    text.textContent = self.PULL_TEXT;
    img.className = 'ptr_image';
  }

  var refresh = this.refresh = function () {
      wrapper.style.webkitTransform = 'translateY(40px)';
      img.className += ' ptr_loading';
      text.textContent = self.LOADING_TEXT;
      loading = true;
      scrollTo(el, 1, function () {
        var timeout = setTimeout(callback, self.timeout);
        var cb = once(function () {
          clearTimeout(timeout);
          callback();
        });
        fn(cb);
      });
  };

  events.bind(el, 'touchend', function (e) {
    if (start) {
      refresh();
    }
    start = false;
  })

  function scrollTo(el, y, cb) {
    scrolling = true;
    var start = {
      top: el.scrollTop
    }
    // setup tween
    var tween = Tween(start)
      .ease('out-circ')
      .to({ top: y})
      .duration( 1000);

    // scroll
    tween.update(function(o){
      el.scrollTop = o.top;
    });

    // handle end
    tween.on('end', function(){
      animate = function(){};
      tween = null;
      scrolling = false;
      cb();
    });

    // animate
    function animate() {
      raf(animate);
      tween.update();
    }

    animate();
  }
}
