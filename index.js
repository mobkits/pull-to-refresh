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

events.bind(document, 'touchmove', function (e) {
  e.preventDefault();
});

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
  el = el.firstElementChild;
  var wrapper = el.querySelector('.ptr_wrap');
  wrapper.insertBefore(dom, wrapper.firstElementChild);
  var box = el.querySelector('.ptr_box');
  var img = el.querySelector('.ptr_image');
  var text = el.querySelector('.ptr_text');
  el.scrollTop = 1;

  events.bind(el, 'touchmove', function (e) {
    var rotate = 0;
    e.stopPropagation();
    //prevent user scroll when we are loading or scrolling
    if (scrolling || loading) return e.preventDefault();
    var top = el.scrollTop;
    if (top < 0) {
      box.style.right = '0px';
    }
    if (top < 0 && top >= - 40) {
      text.innerHTML = this.PULL_TEXT;
    }
    if (top < -40) {
      classes(img).add('ptr_rotate');
      text.innerHTML = this.RELEASE_TEXT;
      e.preventDefault();
      start = true;
    } else {
      classes(img).remove('ptr_rotate');
      start = false;
    }
    //img.style['-webkit-transform'] = 'scale(1) rotate(' + rotate + 'deg)';
  }.bind(this));

  function callback() {
    loading = false;
    wrapper.style.top = '0px';
    text.innerHTML = this.PULL_TEXT;
    img.className = 'ptr_image';
    box.style.right = '99%';
    scrollTo(el, 1);
  }

  var refresh = this.refresh = function () {
      box.style.right = '0px';
      wrapper.style.top = '41px';
      img.className += ' ptr_loading';
      text.innerHTML = this.LOADING_TEXT;
      loading = true;
      scrollTo(el, 1, function () {
        var timeout = setTimeout(callback, this.timeout);
        var cb = once(function () {
          clearTimeout(timeout);
          callback();
        });
        fn(cb);
      }.bind(this));
  }.bind(this);

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
      .ease( 'out-circ')
      .to({ top: y})
      .duration( 1000);

    // scroll
    tween.update(function(o){
      el.scrollTop = o.top;
    });

    // handle end
    tween.on('end', function(){
      animate = function(){};
      scrolling = false;
      cb();
    });

    // animate
    function animate() {
      raf(animate);
      tween.update();
    }

    animate();
    return tween;
  }
}
