var events = require('event');
var classes = require('classes');
var domify = require('domify');
var Tween = require('tween');
var raf = require('raf');
var once = require('once');
var template = require('./template.html');

var LOADING_TEXT = '加载中...';
var PULL_TEXT = '下拉刷新';
var RELEASE_TEXT = '释放更新';

events.bind(document, 'touchmove', function (e) {
  e.preventDefault();
});

var ptr = module.exports = function (el, fn) {
  var load;
  var loading;
  var dom = domify(template);
  el = el.firstElementChild;
  var wrapper = el.querySelector('.ptr_wrap');
  wrapper.insertBefore(dom, wrapper.firstElementChild);
  var box = el.querySelector('.ptr_box');
  var img = el.querySelector('.ptr_image');
  var text = el.querySelector('.ptr_text');
  el.scrollTop = 1;

  events.bind(el, 'touchmove', function (e) {
    var rotate = 90;
    e.stopPropagation();
    if (loading) return;
    var top = el.scrollTop;
    if (top < 0) {
      box.style.right = '0px';
    }
    if (top < - 25 && top >= - 50) {
      rotate = 90 - (-25 - top) * 7.2;
      text.innerHTML = '下拉刷新';
    }
    if (top < -50) {
      rotate = -90;
      text.innerHTML = RELEASE_TEXT;
      e.preventDefault();
      load = true;
    } else {
      load = false;
    }
    img.style['-webkit-transform'] = 'scale(1) rotate(' + rotate + 'deg)';
  })

  function callback() {
    loading = false;
    wrapper.style.top = '0px';
    text.innerHTML = PULL_TEXT;
    img.className = 'ptr_image';
    box.style.right = '99%';
    scrollTo(el, 1);
  }

  events.bind(el, 'touchend', function (e) {
    if (load) {
      wrapper.style.top = '51px';
      img.className += ' ptr_loading';
      text.innerHTML = LOADING_TEXT;
      loading = true;
      scrollTo(el, 1);
      var timeout = setTimeout(callback, 10000);
      var cb = once(function () {
        clearTimeout(timeout);
        callback();
      });
      fn(cb);
    }
    load = false;
  })
}

function scrollTo(el, y) {
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
  });

  // animate
  function animate() {
    raf(animate);
    tween.update();
  }

  animate();
  return tween;
}
