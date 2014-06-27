/**
 * Require the module at `name`.
 *
 * @param {String} name
 * @return {Object} exports
 * @api public
 */

function require(name) {
  var module = require.modules[name];
  if (!module) throw new Error('failed to require "' + name + '"');

  if (!('exports' in module) && typeof module.definition === 'function') {
    module.client = module.component = true;
    module.definition.call(this, module.exports = {}, module);
    delete module.definition;
  }

  return module.exports;
}

/**
 * Registered modules.
 */

require.modules = {};

/**
 * Register module at `name` with callback `definition`.
 *
 * @param {String} name
 * @param {Function} definition
 * @api private
 */

require.register = function (name, definition) {
  require.modules[name] = {
    definition: definition
  };
};

/**
 * Define a module's exports immediately with `exports`.
 *
 * @param {String} name
 * @param {Generic} exports
 * @api private
 */

require.define = function (name, exports) {
  require.modules[name] = {
    exports: exports
  };
};
require.register("component~transform-property@0.0.1", Function("exports, module",
"\n\
var styles = [\n\
  'webkitTransform',\n\
  'MozTransform',\n\
  'msTransform',\n\
  'OTransform',\n\
  'transform'\n\
];\n\
\n\
var el = document.createElement('p');\n\
var style;\n\
\n\
for (var i = 0; i < styles.length; i++) {\n\
  style = styles[i];\n\
  if (null != el.style[style]) {\n\
    module.exports = style;\n\
    break;\n\
  }\n\
}\n\
\n\
//# sourceURL=components/component/transform-property/0.0.1/index.js"
));

require.modules["component-transform-property"] = require.modules["component~transform-property@0.0.1"];
require.modules["component~transform-property"] = require.modules["component~transform-property@0.0.1"];
require.modules["transform-property"] = require.modules["component~transform-property@0.0.1"];


require.register("component~has-translate3d@0.0.3", Function("exports, module",
"\n\
var prop = require(\"component~transform-property@0.0.1\");\n\
\n\
// IE <=8 doesn't have `getComputedStyle`\n\
if (!prop || !window.getComputedStyle) {\n\
  module.exports = false;\n\
\n\
} else {\n\
  var map = {\n\
    webkitTransform: '-webkit-transform',\n\
    OTransform: '-o-transform',\n\
    msTransform: '-ms-transform',\n\
    MozTransform: '-moz-transform',\n\
    transform: 'transform'\n\
  };\n\
\n\
  // from: https://gist.github.com/lorenzopolidori/3794226\n\
  var el = document.createElement('div');\n\
  el.style[prop] = 'translate3d(1px,1px,1px)';\n\
  document.body.insertBefore(el, null);\n\
  var val = getComputedStyle(el).getPropertyValue(map[prop]);\n\
  document.body.removeChild(el);\n\
  module.exports = null != val && val.length && 'none' != val;\n\
}\n\
\n\
//# sourceURL=components/component/has-translate3d/0.0.3/index.js"
));

require.modules["component-has-translate3d"] = require.modules["component~has-translate3d@0.0.3"];
require.modules["component~has-translate3d"] = require.modules["component~has-translate3d@0.0.3"];
require.modules["has-translate3d"] = require.modules["component~has-translate3d@0.0.3"];


require.register("component~touchaction-property@0.0.1", Function("exports, module",
"\n\
/**\n\
 * Module exports.\n\
 */\n\
\n\
module.exports = touchActionProperty();\n\
\n\
/**\n\
 * Returns \"touchAction\", \"msTouchAction\", or null.\n\
 */\n\
\n\
function touchActionProperty(doc) {\n\
  if (!doc) doc = document;\n\
  var div = doc.createElement('div');\n\
  var prop = null;\n\
  if ('touchAction' in div.style) prop = 'touchAction';\n\
  else if ('msTouchAction' in div.style) prop = 'msTouchAction';\n\
  div = null;\n\
  return prop;\n\
}\n\
\n\
//# sourceURL=components/component/touchaction-property/0.0.1/index.js"
));

require.modules["component-touchaction-property"] = require.modules["component~touchaction-property@0.0.1"];
require.modules["component~touchaction-property"] = require.modules["component~touchaction-property@0.0.1"];
require.modules["touchaction-property"] = require.modules["component~touchaction-property@0.0.1"];


require.register("component~event@0.1.3", Function("exports, module",
"var bind = window.addEventListener ? 'addEventListener' : 'attachEvent',\n\
    unbind = window.removeEventListener ? 'removeEventListener' : 'detachEvent',\n\
    prefix = bind !== 'addEventListener' ? 'on' : '';\n\
\n\
/**\n\
 * Bind `el` event `type` to `fn`.\n\
 *\n\
 * @param {Element} el\n\
 * @param {String} type\n\
 * @param {Function} fn\n\
 * @param {Boolean} capture\n\
 * @return {Function}\n\
 * @api public\n\
 */\n\
\n\
exports.bind = function(el, type, fn, capture){\n\
  el[bind](prefix + type, fn, capture || false);\n\
  return fn;\n\
};\n\
\n\
/**\n\
 * Unbind `el` event `type`'s callback `fn`.\n\
 *\n\
 * @param {Element} el\n\
 * @param {String} type\n\
 * @param {Function} fn\n\
 * @param {Boolean} capture\n\
 * @return {Function}\n\
 * @api public\n\
 */\n\
\n\
exports.unbind = function(el, type, fn, capture){\n\
  el[unbind](prefix + type, fn, capture || false);\n\
  return fn;\n\
};\n\
//# sourceURL=components/component/event/0.1.3/index.js"
));

require.modules["component-event"] = require.modules["component~event@0.1.3"];
require.modules["component~event"] = require.modules["component~event@0.1.3"];
require.modules["event"] = require.modules["component~event@0.1.3"];


require.register("component~event@0.1.4", Function("exports, module",
"var bind = window.addEventListener ? 'addEventListener' : 'attachEvent',\n\
    unbind = window.removeEventListener ? 'removeEventListener' : 'detachEvent',\n\
    prefix = bind !== 'addEventListener' ? 'on' : '';\n\
\n\
/**\n\
 * Bind `el` event `type` to `fn`.\n\
 *\n\
 * @param {Element} el\n\
 * @param {String} type\n\
 * @param {Function} fn\n\
 * @param {Boolean} capture\n\
 * @return {Function}\n\
 * @api public\n\
 */\n\
\n\
exports.bind = function(el, type, fn, capture){\n\
  el[bind](prefix + type, fn, capture || false);\n\
  return fn;\n\
};\n\
\n\
/**\n\
 * Unbind `el` event `type`'s callback `fn`.\n\
 *\n\
 * @param {Element} el\n\
 * @param {String} type\n\
 * @param {Function} fn\n\
 * @param {Boolean} capture\n\
 * @return {Function}\n\
 * @api public\n\
 */\n\
\n\
exports.unbind = function(el, type, fn, capture){\n\
  el[unbind](prefix + type, fn, capture || false);\n\
  return fn;\n\
};\n\
//# sourceURL=components/component/event/0.1.4/index.js"
));

require.modules["component-event"] = require.modules["component~event@0.1.4"];
require.modules["component~event"] = require.modules["component~event@0.1.4"];
require.modules["event"] = require.modules["component~event@0.1.4"];


require.register("component~query@0.0.3", Function("exports, module",
"function one(selector, el) {\n\
  return el.querySelector(selector);\n\
}\n\
\n\
exports = module.exports = function(selector, el){\n\
  el = el || document;\n\
  return one(selector, el);\n\
};\n\
\n\
exports.all = function(selector, el){\n\
  el = el || document;\n\
  return el.querySelectorAll(selector);\n\
};\n\
\n\
exports.engine = function(obj){\n\
  if (!obj.one) throw new Error('.one callback required');\n\
  if (!obj.all) throw new Error('.all callback required');\n\
  one = obj.one;\n\
  exports.all = obj.all;\n\
  return exports;\n\
};\n\
\n\
//# sourceURL=components/component/query/0.0.3/index.js"
));

require.modules["component-query"] = require.modules["component~query@0.0.3"];
require.modules["component~query"] = require.modules["component~query@0.0.3"];
require.modules["query"] = require.modules["component~query@0.0.3"];


require.register("component~matches-selector@0.1.2", Function("exports, module",
"/**\n\
 * Module dependencies.\n\
 */\n\
\n\
var query = require(\"component~query@0.0.3\");\n\
\n\
/**\n\
 * Element prototype.\n\
 */\n\
\n\
var proto = Element.prototype;\n\
\n\
/**\n\
 * Vendor function.\n\
 */\n\
\n\
var vendor = proto.matches\n\
  || proto.webkitMatchesSelector\n\
  || proto.mozMatchesSelector\n\
  || proto.msMatchesSelector\n\
  || proto.oMatchesSelector;\n\
\n\
/**\n\
 * Expose `match()`.\n\
 */\n\
\n\
module.exports = match;\n\
\n\
/**\n\
 * Match `el` to `selector`.\n\
 *\n\
 * @param {Element} el\n\
 * @param {String} selector\n\
 * @return {Boolean}\n\
 * @api public\n\
 */\n\
\n\
function match(el, selector) {\n\
  if (vendor) return vendor.call(el, selector);\n\
  var nodes = query.all(selector, el.parentNode);\n\
  for (var i = 0; i < nodes.length; ++i) {\n\
    if (nodes[i] == el) return true;\n\
  }\n\
  return false;\n\
}\n\
\n\
//# sourceURL=components/component/matches-selector/0.1.2/index.js"
));

require.modules["component-matches-selector"] = require.modules["component~matches-selector@0.1.2"];
require.modules["component~matches-selector"] = require.modules["component~matches-selector@0.1.2"];
require.modules["matches-selector"] = require.modules["component~matches-selector@0.1.2"];


require.register("discore~closest@0.1.2", Function("exports, module",
"var matches = require(\"component~matches-selector@0.1.2\")\n\
\n\
module.exports = function (element, selector, checkYoSelf, root) {\n\
  element = checkYoSelf ? {parentNode: element} : element\n\
\n\
  root = root || document\n\
\n\
  // Make sure `element !== document` and `element != null`\n\
  // otherwise we get an illegal invocation\n\
  while ((element = element.parentNode) && element !== document) {\n\
    if (matches(element, selector))\n\
      return element\n\
    // After `matches` on the edge case that\n\
    // the selector matches the root\n\
    // (when the root is not the document)\n\
    if (element === root)\n\
      return  \n\
  }\n\
}\n\
//# sourceURL=components/discore/closest/0.1.2/index.js"
));

require.modules["discore-closest"] = require.modules["discore~closest@0.1.2"];
require.modules["discore~closest"] = require.modules["discore~closest@0.1.2"];
require.modules["closest"] = require.modules["discore~closest@0.1.2"];


require.register("component~delegate@0.2.2", Function("exports, module",
"/**\n\
 * Module dependencies.\n\
 */\n\
\n\
var closest = require(\"discore~closest@0.1.2\")\n\
  , event = require(\"component~event@0.1.4\");\n\
\n\
/**\n\
 * Delegate event `type` to `selector`\n\
 * and invoke `fn(e)`. A callback function\n\
 * is returned which may be passed to `.unbind()`.\n\
 *\n\
 * @param {Element} el\n\
 * @param {String} selector\n\
 * @param {String} type\n\
 * @param {Function} fn\n\
 * @param {Boolean} capture\n\
 * @return {Function}\n\
 * @api public\n\
 */\n\
\n\
exports.bind = function(el, selector, type, fn, capture){\n\
  return event.bind(el, type, function(e){\n\
    var target = e.target || e.srcElement;\n\
    e.delegateTarget = closest(target, selector, true, el);\n\
    if (e.delegateTarget) fn.call(el, e);\n\
  }, capture);\n\
};\n\
\n\
/**\n\
 * Unbind event `type`'s callback `fn`.\n\
 *\n\
 * @param {Element} el\n\
 * @param {String} type\n\
 * @param {Function} fn\n\
 * @param {Boolean} capture\n\
 * @api public\n\
 */\n\
\n\
exports.unbind = function(el, type, fn, capture){\n\
  event.unbind(el, type, fn, capture);\n\
};\n\
\n\
//# sourceURL=components/component/delegate/0.2.2/index.js"
));

require.modules["component-delegate"] = require.modules["component~delegate@0.2.2"];
require.modules["component~delegate"] = require.modules["component~delegate@0.2.2"];
require.modules["delegate"] = require.modules["component~delegate@0.2.2"];


require.register("component~events@1.0.7", Function("exports, module",
"\n\
/**\n\
 * Module dependencies.\n\
 */\n\
\n\
var events = require(\"component~event@0.1.3\");\n\
var delegate = require(\"component~delegate@0.2.2\");\n\
\n\
/**\n\
 * Expose `Events`.\n\
 */\n\
\n\
module.exports = Events;\n\
\n\
/**\n\
 * Initialize an `Events` with the given\n\
 * `el` object which events will be bound to,\n\
 * and the `obj` which will receive method calls.\n\
 *\n\
 * @param {Object} el\n\
 * @param {Object} obj\n\
 * @api public\n\
 */\n\
\n\
function Events(el, obj) {\n\
  if (!(this instanceof Events)) return new Events(el, obj);\n\
  if (!el) throw new Error('element required');\n\
  if (!obj) throw new Error('object required');\n\
  this.el = el;\n\
  this.obj = obj;\n\
  this._events = {};\n\
}\n\
\n\
/**\n\
 * Subscription helper.\n\
 */\n\
\n\
Events.prototype.sub = function(event, method, cb){\n\
  this._events[event] = this._events[event] || {};\n\
  this._events[event][method] = cb;\n\
};\n\
\n\
/**\n\
 * Bind to `event` with optional `method` name.\n\
 * When `method` is undefined it becomes `event`\n\
 * with the \"on\" prefix.\n\
 *\n\
 * Examples:\n\
 *\n\
 *  Direct event handling:\n\
 *\n\
 *    events.bind('click') // implies \"onclick\"\n\
 *    events.bind('click', 'remove')\n\
 *    events.bind('click', 'sort', 'asc')\n\
 *\n\
 *  Delegated event handling:\n\
 *\n\
 *    events.bind('click li > a')\n\
 *    events.bind('click li > a', 'remove')\n\
 *    events.bind('click a.sort-ascending', 'sort', 'asc')\n\
 *    events.bind('click a.sort-descending', 'sort', 'desc')\n\
 *\n\
 * @param {String} event\n\
 * @param {String|function} [method]\n\
 * @return {Function} callback\n\
 * @api public\n\
 */\n\
\n\
Events.prototype.bind = function(event, method){\n\
  var e = parse(event);\n\
  var el = this.el;\n\
  var obj = this.obj;\n\
  var name = e.name;\n\
  var method = method || 'on' + name;\n\
  var args = [].slice.call(arguments, 2);\n\
\n\
  // callback\n\
  function cb(){\n\
    var a = [].slice.call(arguments).concat(args);\n\
    obj[method].apply(obj, a);\n\
  }\n\
\n\
  // bind\n\
  if (e.selector) {\n\
    cb = delegate.bind(el, e.selector, name, cb);\n\
  } else {\n\
    events.bind(el, name, cb);\n\
  }\n\
\n\
  // subscription for unbinding\n\
  this.sub(name, method, cb);\n\
\n\
  return cb;\n\
};\n\
\n\
/**\n\
 * Unbind a single binding, all bindings for `event`,\n\
 * or all bindings within the manager.\n\
 *\n\
 * Examples:\n\
 *\n\
 *  Unbind direct handlers:\n\
 *\n\
 *     events.unbind('click', 'remove')\n\
 *     events.unbind('click')\n\
 *     events.unbind()\n\
 *\n\
 * Unbind delegate handlers:\n\
 *\n\
 *     events.unbind('click', 'remove')\n\
 *     events.unbind('click')\n\
 *     events.unbind()\n\
 *\n\
 * @param {String|Function} [event]\n\
 * @param {String|Function} [method]\n\
 * @api public\n\
 */\n\
\n\
Events.prototype.unbind = function(event, method){\n\
  if (0 == arguments.length) return this.unbindAll();\n\
  if (1 == arguments.length) return this.unbindAllOf(event);\n\
\n\
  // no bindings for this event\n\
  var bindings = this._events[event];\n\
  if (!bindings) return;\n\
\n\
  // no bindings for this method\n\
  var cb = bindings[method];\n\
  if (!cb) return;\n\
\n\
  events.unbind(this.el, event, cb);\n\
};\n\
\n\
/**\n\
 * Unbind all events.\n\
 *\n\
 * @api private\n\
 */\n\
\n\
Events.prototype.unbindAll = function(){\n\
  for (var event in this._events) {\n\
    this.unbindAllOf(event);\n\
  }\n\
};\n\
\n\
/**\n\
 * Unbind all events for `event`.\n\
 *\n\
 * @param {String} event\n\
 * @api private\n\
 */\n\
\n\
Events.prototype.unbindAllOf = function(event){\n\
  var bindings = this._events[event];\n\
  if (!bindings) return;\n\
\n\
  for (var method in bindings) {\n\
    this.unbind(event, method);\n\
  }\n\
};\n\
\n\
/**\n\
 * Parse `event`.\n\
 *\n\
 * @param {String} event\n\
 * @return {Object}\n\
 * @api private\n\
 */\n\
\n\
function parse(event) {\n\
  var parts = event.split(/ +/);\n\
  return {\n\
    name: parts.shift(),\n\
    selector: parts.join(' ')\n\
  }\n\
}\n\
\n\
//# sourceURL=components/component/events/1.0.7/index.js"
));

require.modules["component-events"] = require.modules["component~events@1.0.7"];
require.modules["component~events"] = require.modules["component~events@1.0.7"];
require.modules["events"] = require.modules["component~events@1.0.7"];


require.register("component~raf@1.1.3", Function("exports, module",
"/**\n\
 * Expose `requestAnimationFrame()`.\n\
 */\n\
\n\
exports = module.exports = window.requestAnimationFrame\n\
  || window.webkitRequestAnimationFrame\n\
  || window.mozRequestAnimationFrame\n\
  || window.oRequestAnimationFrame\n\
  || window.msRequestAnimationFrame\n\
  || fallback;\n\
\n\
/**\n\
 * Fallback implementation.\n\
 */\n\
\n\
var prev = new Date().getTime();\n\
function fallback(fn) {\n\
  var curr = new Date().getTime();\n\
  var ms = Math.max(0, 16 - (curr - prev));\n\
  var req = setTimeout(fn, ms);\n\
  prev = curr;\n\
  return req;\n\
}\n\
\n\
/**\n\
 * Cancel.\n\
 */\n\
\n\
var cancel = window.cancelAnimationFrame\n\
  || window.webkitCancelAnimationFrame\n\
  || window.mozCancelAnimationFrame\n\
  || window.oCancelAnimationFrame\n\
  || window.msCancelAnimationFrame\n\
  || window.clearTimeout;\n\
\n\
exports.cancel = function(id){\n\
  cancel.call(window, id);\n\
};\n\
\n\
//# sourceURL=components/component/raf/1.1.3/index.js"
));

require.modules["component-raf"] = require.modules["component~raf@1.1.3"];
require.modules["component~raf"] = require.modules["component~raf@1.1.3"];
require.modules["raf"] = require.modules["component~raf@1.1.3"];


require.register("component~emitter@1.0.0", Function("exports, module",
"\n\
/**\n\
 * Expose `Emitter`.\n\
 */\n\
\n\
module.exports = Emitter;\n\
\n\
/**\n\
 * Initialize a new `Emitter`.\n\
 *\n\
 * @api public\n\
 */\n\
\n\
function Emitter(obj) {\n\
  if (obj) return mixin(obj);\n\
};\n\
\n\
/**\n\
 * Mixin the emitter properties.\n\
 *\n\
 * @param {Object} obj\n\
 * @return {Object}\n\
 * @api private\n\
 */\n\
\n\
function mixin(obj) {\n\
  for (var key in Emitter.prototype) {\n\
    obj[key] = Emitter.prototype[key];\n\
  }\n\
  return obj;\n\
}\n\
\n\
/**\n\
 * Listen on the given `event` with `fn`.\n\
 *\n\
 * @param {String} event\n\
 * @param {Function} fn\n\
 * @return {Emitter}\n\
 * @api public\n\
 */\n\
\n\
Emitter.prototype.on = function(event, fn){\n\
  this._callbacks = this._callbacks || {};\n\
  (this._callbacks[event] = this._callbacks[event] || [])\n\
    .push(fn);\n\
  return this;\n\
};\n\
\n\
/**\n\
 * Adds an `event` listener that will be invoked a single\n\
 * time then automatically removed.\n\
 *\n\
 * @param {String} event\n\
 * @param {Function} fn\n\
 * @return {Emitter}\n\
 * @api public\n\
 */\n\
\n\
Emitter.prototype.once = function(event, fn){\n\
  var self = this;\n\
  this._callbacks = this._callbacks || {};\n\
\n\
  function on() {\n\
    self.off(event, on);\n\
    fn.apply(this, arguments);\n\
  }\n\
\n\
  fn._off = on;\n\
  this.on(event, on);\n\
  return this;\n\
};\n\
\n\
/**\n\
 * Remove the given callback for `event` or all\n\
 * registered callbacks.\n\
 *\n\
 * @param {String} event\n\
 * @param {Function} fn\n\
 * @return {Emitter}\n\
 * @api public\n\
 */\n\
\n\
Emitter.prototype.off =\n\
Emitter.prototype.removeListener =\n\
Emitter.prototype.removeAllListeners = function(event, fn){\n\
  this._callbacks = this._callbacks || {};\n\
\n\
  // all\n\
  if (0 == arguments.length) {\n\
    this._callbacks = {};\n\
    return this;\n\
  }\n\
\n\
  // specific event\n\
  var callbacks = this._callbacks[event];\n\
  if (!callbacks) return this;\n\
\n\
  // remove all handlers\n\
  if (1 == arguments.length) {\n\
    delete this._callbacks[event];\n\
    return this;\n\
  }\n\
\n\
  // remove specific handler\n\
  var i = callbacks.indexOf(fn._off || fn);\n\
  if (~i) callbacks.splice(i, 1);\n\
  return this;\n\
};\n\
\n\
/**\n\
 * Emit `event` with the given args.\n\
 *\n\
 * @param {String} event\n\
 * @param {Mixed} ...\n\
 * @return {Emitter}\n\
 */\n\
\n\
Emitter.prototype.emit = function(event){\n\
  this._callbacks = this._callbacks || {};\n\
  var args = [].slice.call(arguments, 1)\n\
    , callbacks = this._callbacks[event];\n\
\n\
  if (callbacks) {\n\
    callbacks = callbacks.slice(0);\n\
    for (var i = 0, len = callbacks.length; i < len; ++i) {\n\
      callbacks[i].apply(this, args);\n\
    }\n\
  }\n\
\n\
  return this;\n\
};\n\
\n\
/**\n\
 * Return array of callbacks for `event`.\n\
 *\n\
 * @param {String} event\n\
 * @return {Array}\n\
 * @api public\n\
 */\n\
\n\
Emitter.prototype.listeners = function(event){\n\
  this._callbacks = this._callbacks || {};\n\
  return this._callbacks[event] || [];\n\
};\n\
\n\
/**\n\
 * Check if this emitter has `event` handlers.\n\
 *\n\
 * @param {String} event\n\
 * @return {Boolean}\n\
 * @api public\n\
 */\n\
\n\
Emitter.prototype.hasListeners = function(event){\n\
  return !! this.listeners(event).length;\n\
};\n\
\n\
//# sourceURL=components/component/emitter/1.0.0/index.js"
));

require.modules["component-emitter"] = require.modules["component~emitter@1.0.0"];
require.modules["component~emitter"] = require.modules["component~emitter@1.0.0"];
require.modules["emitter"] = require.modules["component~emitter@1.0.0"];


require.register("component~emitter@1.1.3", Function("exports, module",
"\n\
/**\n\
 * Expose `Emitter`.\n\
 */\n\
\n\
module.exports = Emitter;\n\
\n\
/**\n\
 * Initialize a new `Emitter`.\n\
 *\n\
 * @api public\n\
 */\n\
\n\
function Emitter(obj) {\n\
  if (obj) return mixin(obj);\n\
};\n\
\n\
/**\n\
 * Mixin the emitter properties.\n\
 *\n\
 * @param {Object} obj\n\
 * @return {Object}\n\
 * @api private\n\
 */\n\
\n\
function mixin(obj) {\n\
  for (var key in Emitter.prototype) {\n\
    obj[key] = Emitter.prototype[key];\n\
  }\n\
  return obj;\n\
}\n\
\n\
/**\n\
 * Listen on the given `event` with `fn`.\n\
 *\n\
 * @param {String} event\n\
 * @param {Function} fn\n\
 * @return {Emitter}\n\
 * @api public\n\
 */\n\
\n\
Emitter.prototype.on =\n\
Emitter.prototype.addEventListener = function(event, fn){\n\
  this._callbacks = this._callbacks || {};\n\
  (this._callbacks[event] = this._callbacks[event] || [])\n\
    .push(fn);\n\
  return this;\n\
};\n\
\n\
/**\n\
 * Adds an `event` listener that will be invoked a single\n\
 * time then automatically removed.\n\
 *\n\
 * @param {String} event\n\
 * @param {Function} fn\n\
 * @return {Emitter}\n\
 * @api public\n\
 */\n\
\n\
Emitter.prototype.once = function(event, fn){\n\
  var self = this;\n\
  this._callbacks = this._callbacks || {};\n\
\n\
  function on() {\n\
    self.off(event, on);\n\
    fn.apply(this, arguments);\n\
  }\n\
\n\
  on.fn = fn;\n\
  this.on(event, on);\n\
  return this;\n\
};\n\
\n\
/**\n\
 * Remove the given callback for `event` or all\n\
 * registered callbacks.\n\
 *\n\
 * @param {String} event\n\
 * @param {Function} fn\n\
 * @return {Emitter}\n\
 * @api public\n\
 */\n\
\n\
Emitter.prototype.off =\n\
Emitter.prototype.removeListener =\n\
Emitter.prototype.removeAllListeners =\n\
Emitter.prototype.removeEventListener = function(event, fn){\n\
  this._callbacks = this._callbacks || {};\n\
\n\
  // all\n\
  if (0 == arguments.length) {\n\
    this._callbacks = {};\n\
    return this;\n\
  }\n\
\n\
  // specific event\n\
  var callbacks = this._callbacks[event];\n\
  if (!callbacks) return this;\n\
\n\
  // remove all handlers\n\
  if (1 == arguments.length) {\n\
    delete this._callbacks[event];\n\
    return this;\n\
  }\n\
\n\
  // remove specific handler\n\
  var cb;\n\
  for (var i = 0; i < callbacks.length; i++) {\n\
    cb = callbacks[i];\n\
    if (cb === fn || cb.fn === fn) {\n\
      callbacks.splice(i, 1);\n\
      break;\n\
    }\n\
  }\n\
  return this;\n\
};\n\
\n\
/**\n\
 * Emit `event` with the given args.\n\
 *\n\
 * @param {String} event\n\
 * @param {Mixed} ...\n\
 * @return {Emitter}\n\
 */\n\
\n\
Emitter.prototype.emit = function(event){\n\
  this._callbacks = this._callbacks || {};\n\
  var args = [].slice.call(arguments, 1)\n\
    , callbacks = this._callbacks[event];\n\
\n\
  if (callbacks) {\n\
    callbacks = callbacks.slice(0);\n\
    for (var i = 0, len = callbacks.length; i < len; ++i) {\n\
      callbacks[i].apply(this, args);\n\
    }\n\
  }\n\
\n\
  return this;\n\
};\n\
\n\
/**\n\
 * Return array of callbacks for `event`.\n\
 *\n\
 * @param {String} event\n\
 * @return {Array}\n\
 * @api public\n\
 */\n\
\n\
Emitter.prototype.listeners = function(event){\n\
  this._callbacks = this._callbacks || {};\n\
  return this._callbacks[event] || [];\n\
};\n\
\n\
/**\n\
 * Check if this emitter has `event` handlers.\n\
 *\n\
 * @param {String} event\n\
 * @return {Boolean}\n\
 * @api public\n\
 */\n\
\n\
Emitter.prototype.hasListeners = function(event){\n\
  return !! this.listeners(event).length;\n\
};\n\
\n\
//# sourceURL=components/component/emitter/1.1.3/index.js"
));

require.modules["component-emitter"] = require.modules["component~emitter@1.1.3"];
require.modules["component~emitter"] = require.modules["component~emitter@1.1.3"];
require.modules["emitter"] = require.modules["component~emitter@1.1.3"];


require.register("component~ease@1.0.0", Function("exports, module",
"\n\
exports.linear = function(n){\n\
  return n;\n\
};\n\
\n\
exports.inQuad = function(n){\n\
  return n * n;\n\
};\n\
\n\
exports.outQuad = function(n){\n\
  return n * (2 - n);\n\
};\n\
\n\
exports.inOutQuad = function(n){\n\
  n *= 2;\n\
  if (n < 1) return 0.5 * n * n;\n\
  return - 0.5 * (--n * (n - 2) - 1);\n\
};\n\
\n\
exports.inCube = function(n){\n\
  return n * n * n;\n\
};\n\
\n\
exports.outCube = function(n){\n\
  return --n * n * n + 1;\n\
};\n\
\n\
exports.inOutCube = function(n){\n\
  n *= 2;\n\
  if (n < 1) return 0.5 * n * n * n;\n\
  return 0.5 * ((n -= 2 ) * n * n + 2);\n\
};\n\
\n\
exports.inQuart = function(n){\n\
  return n * n * n * n;\n\
};\n\
\n\
exports.outQuart = function(n){\n\
  return 1 - (--n * n * n * n);\n\
};\n\
\n\
exports.inOutQuart = function(n){\n\
  n *= 2;\n\
  if (n < 1) return 0.5 * n * n * n * n;\n\
  return -0.5 * ((n -= 2) * n * n * n - 2);\n\
};\n\
\n\
exports.inQuint = function(n){\n\
  return n * n * n * n * n;\n\
}\n\
\n\
exports.outQuint = function(n){\n\
  return --n * n * n * n * n + 1;\n\
}\n\
\n\
exports.inOutQuint = function(n){\n\
  n *= 2;\n\
  if (n < 1) return 0.5 * n * n * n * n * n;\n\
  return 0.5 * ((n -= 2) * n * n * n * n + 2);\n\
};\n\
\n\
exports.inSine = function(n){\n\
  return 1 - Math.cos(n * Math.PI / 2 );\n\
};\n\
\n\
exports.outSine = function(n){\n\
  return Math.sin(n * Math.PI / 2);\n\
};\n\
\n\
exports.inOutSine = function(n){\n\
  return .5 * (1 - Math.cos(Math.PI * n));\n\
};\n\
\n\
exports.inExpo = function(n){\n\
  return 0 == n ? 0 : Math.pow(1024, n - 1);\n\
};\n\
\n\
exports.outExpo = function(n){\n\
  return 1 == n ? n : 1 - Math.pow(2, -10 * n);\n\
};\n\
\n\
exports.inOutExpo = function(n){\n\
  if (0 == n) return 0;\n\
  if (1 == n) return 1;\n\
  if ((n *= 2) < 1) return .5 * Math.pow(1024, n - 1);\n\
  return .5 * (-Math.pow(2, -10 * (n - 1)) + 2);\n\
};\n\
\n\
exports.inCirc = function(n){\n\
  return 1 - Math.sqrt(1 - n * n);\n\
};\n\
\n\
exports.outCirc = function(n){\n\
  return Math.sqrt(1 - (--n * n));\n\
};\n\
\n\
exports.inOutCirc = function(n){\n\
  n *= 2\n\
  if (n < 1) return -0.5 * (Math.sqrt(1 - n * n) - 1);\n\
  return 0.5 * (Math.sqrt(1 - (n -= 2) * n) + 1);\n\
};\n\
\n\
exports.inBack = function(n){\n\
  var s = 1.70158;\n\
  return n * n * (( s + 1 ) * n - s);\n\
};\n\
\n\
exports.outBack = function(n){\n\
  var s = 1.70158;\n\
  return --n * n * ((s + 1) * n + s) + 1;\n\
};\n\
\n\
exports.inOutBack = function(n){\n\
  var s = 1.70158 * 1.525;\n\
  if ( ( n *= 2 ) < 1 ) return 0.5 * ( n * n * ( ( s + 1 ) * n - s ) );\n\
  return 0.5 * ( ( n -= 2 ) * n * ( ( s + 1 ) * n + s ) + 2 );\n\
};\n\
\n\
exports.inBounce = function(n){\n\
  return 1 - exports.outBounce(1 - n);\n\
};\n\
\n\
exports.outBounce = function(n){\n\
  if ( n < ( 1 / 2.75 ) ) {\n\
    return 7.5625 * n * n;\n\
  } else if ( n < ( 2 / 2.75 ) ) {\n\
    return 7.5625 * ( n -= ( 1.5 / 2.75 ) ) * n + 0.75;\n\
  } else if ( n < ( 2.5 / 2.75 ) ) {\n\
    return 7.5625 * ( n -= ( 2.25 / 2.75 ) ) * n + 0.9375;\n\
  } else {\n\
    return 7.5625 * ( n -= ( 2.625 / 2.75 ) ) * n + 0.984375;\n\
  }\n\
};\n\
\n\
exports.inOutBounce = function(n){\n\
  if (n < .5) return exports.inBounce(n * 2) * .5;\n\
  return exports.outBounce(n * 2 - 1) * .5 + .5;\n\
};\n\
\n\
// aliases\n\
\n\
exports['in-quad'] = exports.inQuad;\n\
exports['out-quad'] = exports.outQuad;\n\
exports['in-out-quad'] = exports.inOutQuad;\n\
exports['in-cube'] = exports.inCube;\n\
exports['out-cube'] = exports.outCube;\n\
exports['in-out-cube'] = exports.inOutCube;\n\
exports['in-quart'] = exports.inQuart;\n\
exports['out-quart'] = exports.outQuart;\n\
exports['in-out-quart'] = exports.inOutQuart;\n\
exports['in-quint'] = exports.inQuint;\n\
exports['out-quint'] = exports.outQuint;\n\
exports['in-out-quint'] = exports.inOutQuint;\n\
exports['in-sine'] = exports.inSine;\n\
exports['out-sine'] = exports.outSine;\n\
exports['in-out-sine'] = exports.inOutSine;\n\
exports['in-expo'] = exports.inExpo;\n\
exports['out-expo'] = exports.outExpo;\n\
exports['in-out-expo'] = exports.inOutExpo;\n\
exports['in-circ'] = exports.inCirc;\n\
exports['out-circ'] = exports.outCirc;\n\
exports['in-out-circ'] = exports.inOutCirc;\n\
exports['in-back'] = exports.inBack;\n\
exports['out-back'] = exports.outBack;\n\
exports['in-out-back'] = exports.inOutBack;\n\
exports['in-bounce'] = exports.inBounce;\n\
exports['out-bounce'] = exports.outBounce;\n\
exports['in-out-bounce'] = exports.inOutBounce;\n\
\n\
//# sourceURL=components/component/ease/1.0.0/index.js"
));

require.modules["component-ease"] = require.modules["component~ease@1.0.0"];
require.modules["component~ease"] = require.modules["component~ease@1.0.0"];
require.modules["ease"] = require.modules["component~ease@1.0.0"];


require.register("component~tween@1.1.0", Function("exports, module",
"\n\
/**\n\
 * Module dependencies.\n\
 */\n\
\n\
var Emitter = require(\"component~emitter@1.0.0\")\n\
  , ease = require(\"component~ease@1.0.0\");\n\
\n\
/**\n\
 * Expose `Tween`.\n\
 */\n\
\n\
module.exports = Tween;\n\
\n\
/**\n\
 * Initialize a new `Tween` with `obj`.\n\
 *\n\
 * @param {Object|Array} obj\n\
 * @api public\n\
 */\n\
\n\
function Tween(obj) {\n\
  if (!(this instanceof Tween)) return new Tween(obj);\n\
  this._from = obj;\n\
  this.ease('linear');\n\
  this.duration(500);\n\
}\n\
\n\
/**\n\
 * Mixin emitter.\n\
 */\n\
\n\
Emitter(Tween.prototype);\n\
\n\
/**\n\
 * Reset the tween.\n\
 *\n\
 * @api public\n\
 */\n\
\n\
Tween.prototype.reset = function(){\n\
  this.isArray = Array.isArray(this._from);\n\
  this._curr = clone(this._from);\n\
  this._done = false;\n\
  this._start = Date.now();\n\
  return this;\n\
};\n\
\n\
/**\n\
 * Tween to `obj` and reset internal state.\n\
 *\n\
 *    tween.to({ x: 50, y: 100 })\n\
 *\n\
 * @param {Object|Array} obj\n\
 * @return {Tween} self\n\
 * @api public\n\
 */\n\
\n\
Tween.prototype.to = function(obj){\n\
  this.reset();\n\
  this._to = obj;\n\
  return this;\n\
};\n\
\n\
/**\n\
 * Set duration to `ms` [500].\n\
 *\n\
 * @param {Number} ms\n\
 * @return {Tween} self\n\
 * @api public\n\
 */\n\
\n\
Tween.prototype.duration = function(ms){\n\
  this._duration = ms;\n\
  return this;\n\
};\n\
\n\
/**\n\
 * Set easing function to `fn`.\n\
 *\n\
 *    tween.ease('in-out-sine')\n\
 *\n\
 * @param {String|Function} fn\n\
 * @return {Tween}\n\
 * @api public\n\
 */\n\
\n\
Tween.prototype.ease = function(fn){\n\
  fn = 'function' == typeof fn ? fn : ease[fn];\n\
  if (!fn) throw new TypeError('invalid easing function');\n\
  this._ease = fn;\n\
  return this;\n\
};\n\
\n\
/**\n\
 * Stop the tween and immediately emit \"stop\" and \"end\".\n\
 *\n\
 * @return {Tween}\n\
 * @api public\n\
 */\n\
\n\
Tween.prototype.stop = function(){\n\
  this.stopped = true;\n\
  this._done = true;\n\
  this.emit('stop');\n\
  this.emit('end');\n\
  return this;\n\
};\n\
\n\
/**\n\
 * Perform a step.\n\
 *\n\
 * @return {Tween} self\n\
 * @api private\n\
 */\n\
\n\
Tween.prototype.step = function(){\n\
  if (this._done) return;\n\
\n\
  // duration\n\
  var duration = this._duration;\n\
  var now = Date.now();\n\
  var delta = now - this._start;\n\
  var done = delta >= duration;\n\
\n\
  // complete\n\
  if (done) {\n\
    this._from = this._to;\n\
    this._update(this._to);\n\
    this._done = true;\n\
    this.emit('end');\n\
    return this;\n\
  }\n\
\n\
  // tween\n\
  var from = this._from;\n\
  var to = this._to;\n\
  var curr = this._curr;\n\
  var fn = this._ease;\n\
  var p = (now - this._start) / duration;\n\
  var n = fn(p);\n\
\n\
  // array\n\
  if (this.isArray) {\n\
    for (var i = 0; i < from.length; ++i) {\n\
      curr[i] = from[i] + (to[i] - from[i]) * n;\n\
    }\n\
\n\
    this._update(curr);\n\
    return this;\n\
  }\n\
\n\
  // objech\n\
  for (var k in from) {\n\
    curr[k] = from[k] + (to[k] - from[k]) * n;\n\
  }\n\
\n\
  this._update(curr);\n\
  return this;\n\
};\n\
\n\
/**\n\
 * Set update function to `fn` or\n\
 * when no argument is given this performs\n\
 * a \"step\".\n\
 *\n\
 * @param {Function} fn\n\
 * @return {Tween} self\n\
 * @api public\n\
 */\n\
\n\
Tween.prototype.update = function(fn){\n\
  if (0 == arguments.length) return this.step();\n\
  this._update = fn;\n\
  return this;\n\
};\n\
\n\
/**\n\
 * Clone `obj`.\n\
 *\n\
 * @api private\n\
 */\n\
\n\
function clone(obj) {\n\
  if (Array.isArray(obj)) return obj.slice();\n\
  var ret = {};\n\
  for (var key in obj) ret[key] = obj[key];\n\
  return ret;\n\
}\n\
\n\
//# sourceURL=components/component/tween/1.1.0/index.js"
));

require.modules["component-tween"] = require.modules["component~tween@1.1.0"];
require.modules["component~tween"] = require.modules["component~tween@1.1.0"];
require.modules["tween"] = require.modules["component~tween@1.1.0"];


require.register("chemzqm~computed-style@0.1.1", Function("exports, module",
"\n\
/**\n\
 * Get the computed style of a DOM element\n\
 * \n\
 *   style(document.body) // => {width:'500px', ...}\n\
 * \n\
 * @param {Element} element\n\
 * @return {Object}\n\
 */\n\
\n\
// Accessing via window for jsDOM support\n\
module.exports = window.getComputedStyle\n\
\n\
// Fallback to elem.currentStyle for IE < 9\n\
if (!module.exports) {\n\
\tmodule.exports = function (elem) {\n\
\t\treturn elem.currentStyle\n\
\t}\n\
}\n\
\n\
//# sourceURL=components/chemzqm/computed-style/0.1.1/index.js"
));

require.modules["chemzqm-computed-style"] = require.modules["chemzqm~computed-style@0.1.1"];
require.modules["chemzqm~computed-style"] = require.modules["chemzqm~computed-style@0.1.1"];
require.modules["computed-style"] = require.modules["chemzqm~computed-style@0.1.1"];


require.register("chemzqm~iscroll@0.1.4", Function("exports, module",
"var has3d = require(\"component~has-translate3d@0.0.3\");\n\
var touchAction = require(\"component~touchaction-property@0.0.1\");\n\
var events = require(\"component~events@1.0.7\");\n\
var styles = require(\"chemzqm~computed-style@0.1.1\");\n\
var transform = require(\"component~transform-property@0.0.1\");\n\
var Emitter = require(\"component~emitter@1.1.3\");\n\
var raf = require(\"component~raf@1.1.3\");\n\
var Tween = require(\"component~tween@1.1.0\");\n\
var max = Math.max;\n\
var min = Math.min;\n\
var now = Date.now || function () {\n\
  return (new Date()).getTime();\n\
}\n\
var getterAndSetter = (typeof Object.__defineGetter__ === 'function' && typeof Object.__defineSetter__ === 'function');\n\
\n\
function lastVisible(el) {\n\
  var nodes = el.childNodes;\n\
  for(var i = nodes.length - 1; i >=0; i --) {\n\
    var node = nodes[i];\n\
    if (node.nodeType === 1 && node.style.display !== 'none') {\n\
      return node;\n\
    }\n\
  }\n\
}\n\
\n\
\n\
function Iscroll(el, opts) {\n\
  if (! (this instanceof Iscroll)) return new Iscroll(el, opts);\n\
  this.y = 0;\n\
  this.el = el;\n\
  this.pb = parseInt(styles(el).getPropertyValue('padding-bottom'), 10);\n\
  this.touchAction('none');\n\
  this.refresh();\n\
  this.bind();\n\
  var self = this;\n\
  if (getterAndSetter) {\n\
    this.__defineGetter__('scrollTop', function(){\n\
      return - self.y;\n\
    })\n\
    this.__defineSetter__('scrollTop', function(v){\n\
      return self.scrollTo(v, 200);\n\
    })\n\
  }\n\
  this.autorefresh = opts.autorefresh === undefined ? true : opts.autorefresh;\n\
  opts = opts || {};\n\
  if (opts.handlebar) {\n\
    var bar = this.handlebar = document.createElement('div');\n\
    bar.className = 'iscroll-handlebar';\n\
    this.el.parentNode.appendChild(bar);\n\
  }\n\
}\n\
\n\
Emitter(Iscroll.prototype);\n\
\n\
Iscroll.prototype.bind = function () {\n\
  this.events = events(this.el, this);\n\
  this.docEvents = events(document, this);\n\
\n\
   // W3C touch events\n\
  this.events.bind('touchstart');\n\
  this.events.bind('touchmove');\n\
  this.docEvents.bind('touchend');\n\
}\n\
\n\
/**\n\
 * recalculate height\n\
 *\n\
 * @api public\n\
 */\n\
Iscroll.prototype.refresh = function () {\n\
  var child = lastVisible(this.el);\n\
  this.viewHeight = parseInt(styles(this.el.parentNode).height, 10);\n\
  var cb = child.getBoundingClientRect().bottom;\n\
  var b = this.el.getBoundingClientRect().bottom;\n\
  var h = parseInt(styles(this.el).height, 10);\n\
  if (b - cb !== 0) {\n\
    this.height = h + (cb - b) + this.pb;\n\
  } else {\n\
    this.height = h + this.pb;\n\
  }\n\
  this.el.style.height = this.height + 'px';\n\
}\n\
\n\
Iscroll.prototype.unbind = function () {\n\
  this.events.unbind();\n\
  this.docEvents.unbind();\n\
}\n\
\n\
Iscroll.prototype.restrict = function (y) {\n\
  y = min(y , 80);\n\
  y = max(y , this.viewHeight - this.height - 80);\n\
  return y;\n\
}\n\
\n\
Iscroll.prototype.ontouchstart = function (e) {\n\
  this.speed = null;\n\
  if (this.tween) this.tween.stop();\n\
  if (this.autorefresh) this.refresh();\n\
  this.dy = 0;\n\
  this.ts = now();\n\
  this.leftright = null;\n\
  if (this.handlebar) this.resizeHandlebar();\n\
\n\
  var touch = this.getTouch(e);\n\
  this.pageY = touch.pageY;\n\
  this.down = {\n\
    x: touch.pageX,\n\
    y: touch.pageY,\n\
    start: this.y,\n\
    at: now()\n\
  };\n\
}\n\
\n\
Iscroll.prototype.ontouchmove = function (e) {\n\
  e.preventDefault();\n\
  if (!this.down || this.leftright) return;\n\
  var touch = this.getTouch(e);\n\
  // TODO: ignore more than one finger\n\
  if (!touch) {\n\
    return;\n\
  }\n\
\n\
  var down = this.down;\n\
  var y = touch.pageY;\n\
  this.dy = y - down.y;\n\
\n\
  // determine dy and the slope\n\
  if (null == this.leftright) {\n\
    var x = touch.pageX;\n\
    var dx = x - down.x;\n\
    var slope = dx / this.dy;\n\
\n\
    // if is greater than 1 or -1, we're swiping up/down\n\
    if (slope > 1 || slope < -1) {\n\
      this.leftright = true;\n\
      if (this.handlebar) this.hideHandlebar();\n\
      return;\n\
    } else {\n\
      this.leftright = false;\n\
    }\n\
  }\n\
\n\
  //calculate speed every 100 milisecond\n\
  this.calcuteSpeed(y);\n\
  var start = this.down.start;\n\
  var dest = this.restrict(start + this.dy);\n\
  this.translate(dest);\n\
}\n\
\n\
Iscroll.prototype.calcuteSpeed = function (y) {\n\
  var ts = now();\n\
  this.ts = this.ts || this.down.at;\n\
  this.pageY = (this.pageY == null) ? this.down.y : this.pageY;\n\
  var dt = ts - this.ts;\n\
  if (ts - this.down.at < 100) {\n\
    this.distance = y - this.pageY;\n\
    this.speed = Math.abs(this.distance/dt);\n\
  } else if(dt > 50){\n\
    this.distance = y - this.pageY;\n\
    this.speed = Math.abs(this.distance/dt);\n\
    this.ts = ts;\n\
    this.pageY = y;\n\
  }\n\
}\n\
\n\
Iscroll.prototype.ontouchend = function (e) {\n\
  if (!this.down || this.leftright) return;\n\
  var touch = this.getTouch(e);\n\
  this.calcuteSpeed(touch.pageY);\n\
  var m = this.momentum();\n\
  this.scrollTo(m.dest, m.duration, m.ease);\n\
  this.emit('release', this.y);\n\
  this.down = null;\n\
}\n\
\n\
Iscroll.prototype.momentum = function () {\n\
  var deceleration = 0.0005;\n\
  var speed = this.speed;\n\
  speed = min(speed, 1.1);\n\
  var destination = this.y + ( speed * speed ) / ( 2 * deceleration ) * ( this.distance < 0 ? -1 : 1 );\n\
  var duration = speed / deceleration;\n\
  var newY, ease;\n\
  if (destination > 0) {\n\
    newY = 0;\n\
    ease = 'out-back';\n\
  } else if (destination < this.viewHeight - this.height) {\n\
    newY = this.viewHeight - this.height;\n\
    ease = 'out-back';\n\
  }\n\
  if (typeof newY === 'number') {\n\
    duration = duration*(newY - this.y + 160)/(destination - this.y);\n\
    destination = newY;\n\
  }\n\
  if (this.y > 0 || this.y < this.viewHeight - this.height) {\n\
    duration = 500;\n\
    ease = 'out-circ';\n\
  }\n\
  return {\n\
    dest: destination,\n\
    duration: duration,\n\
    ease: ease\n\
  }\n\
}\n\
\n\
\n\
Iscroll.prototype.scrollTo = function (y, duration, easing) {\n\
  if (this.tween) this.tween.stop();\n\
  var intransition = (duration > 0 && y !== this.y);\n\
  if (!intransition) {\n\
    this.onScrollEnd();\n\
    return this.translate(y);\n\
  }\n\
\n\
  easing = easing || 'out-circ';\n\
  var tween = this.tween = Tween({y : this.y})\n\
      .ease(easing)\n\
      .to({y: y})\n\
      .duration(duration)\n\
\n\
  var self = this;\n\
  tween.update(function(o) {\n\
    self.translate(o.y);\n\
  })\n\
\n\
  tween.on('end', function () {\n\
    animate = function(){};\n\
    if (!tween.stopped) {\n\
      self.onScrollEnd();\n\
    }\n\
  })\n\
\n\
  function animate() {\n\
    raf(animate);\n\
    tween.update();\n\
  }\n\
\n\
  animate();\n\
}\n\
\n\
Iscroll.prototype.onScrollEnd = function () {\n\
  this.hideHandlebar();\n\
  var top = this.y === 0;\n\
  var bottom = this.y === (this.viewHeight - this.height);\n\
  this.emit('scrollend', {\n\
    top: top,\n\
    bottom: bottom\n\
  })\n\
}\n\
\n\
/**\n\
 * Gets the appropriate \"touch\" object for the `e` event. The event may be from\n\
 * a \"mouse\", \"touch\", or \"Pointer\" event, so the normalization happens here.\n\
 *\n\
 * @api private\n\
 */\n\
\n\
Iscroll.prototype.getTouch = function(e){\n\
  // \"mouse\" and \"Pointer\" events just use the event object itself\n\
  var touch = e;\n\
  if (e.changedTouches && e.changedTouches.length > 0) {\n\
    // W3C \"touch\" events use the `changedTouches` array\n\
    touch = e.changedTouches[0];\n\
  }\n\
  return touch;\n\
}\n\
\n\
\n\
/**\n\
 * Translate to `x`.\n\
 *\n\
 *\n\
 * @api private\n\
 */\n\
\n\
Iscroll.prototype.translate = function(y) {\n\
  var s = this.el.style;\n\
  if (isNaN(y)) return;\n\
  y = Math.floor(y);\n\
  //reach the end\n\
  if (this.y !== y) {\n\
    this.y = y;\n\
    this.emit('scroll', - y);\n\
    if (this.handlebar) this.transformHandlebar();\n\
  }\n\
  if (has3d) {\n\
    s.webkitTransform = 'translate3d(0, ' + y + 'px' + ', 0)';\n\
  } else {\n\
    s.webKitTransform = 'translateY(' + y + 'px)';\n\
  }\n\
}\n\
\n\
/**\n\
 * Sets the \"touchAction\" CSS style property to `value`.\n\
 *\n\
 * @api private\n\
 */\n\
\n\
Iscroll.prototype.touchAction = function(value){\n\
  var s = this.el.style;\n\
  if (touchAction) {\n\
    s[touchAction] = value;\n\
  }\n\
}\n\
\n\
Iscroll.prototype.transformHandlebar = function(){\n\
  var vh = this.viewHeight;\n\
  var h = this.height;\n\
  var bh = vh - vh * vh/h;\n\
  var ih = h - vh;\n\
  var y = parseInt(- bh * this.y/ih);\n\
  var s = this.handlebar.style;\n\
  if (has3d) {\n\
    s.webkitTransform = 'translate3d(0, ' + y + 'px' + ', 0)';\n\
  } else {\n\
    s.webKitTransform = 'translateY(' + y + 'px)';\n\
  }\n\
}\n\
\n\
/**\n\
 * show the handlebar and size it\n\
 * @api public\n\
 */\n\
Iscroll.prototype.resizeHandlebar = function(){\n\
  var h = this.viewHeight * this.viewHeight/this.height;\n\
  this.handlebar.style.height = h + 'px';\n\
  this.handlebar.style.backgroundColor = 'rgba(0,0,0,0.3)';\n\
}\n\
\n\
Iscroll.prototype.hideHandlebar = function () {\n\
  if (this.handlebar) this.handlebar.style.backgroundColor = 'transparent';\n\
}\n\
\n\
module.exports = Iscroll;\n\
\n\
//# sourceURL=components/chemzqm/iscroll/0.1.4/index.js"
));

require.modules["chemzqm-iscroll"] = require.modules["chemzqm~iscroll@0.1.4"];
require.modules["chemzqm~iscroll"] = require.modules["chemzqm~iscroll@0.1.4"];
require.modules["iscroll"] = require.modules["chemzqm~iscroll@0.1.4"];


require.register("component~domify@1.2.2", Function("exports, module",
"\n\
/**\n\
 * Expose `parse`.\n\
 */\n\
\n\
module.exports = parse;\n\
\n\
/**\n\
 * Wrap map from jquery.\n\
 */\n\
\n\
var map = {\n\
  legend: [1, '<fieldset>', '</fieldset>'],\n\
  tr: [2, '<table><tbody>', '</tbody></table>'],\n\
  col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],\n\
  _default: [0, '', '']\n\
};\n\
\n\
map.td =\n\
map.th = [3, '<table><tbody><tr>', '</tr></tbody></table>'];\n\
\n\
map.option =\n\
map.optgroup = [1, '<select multiple=\"multiple\">', '</select>'];\n\
\n\
map.thead =\n\
map.tbody =\n\
map.colgroup =\n\
map.caption =\n\
map.tfoot = [1, '<table>', '</table>'];\n\
\n\
map.text =\n\
map.circle =\n\
map.ellipse =\n\
map.line =\n\
map.path =\n\
map.polygon =\n\
map.polyline =\n\
map.rect = [1, '<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\">','</svg>'];\n\
\n\
/**\n\
 * Parse `html` and return the children.\n\
 *\n\
 * @param {String} html\n\
 * @return {Array}\n\
 * @api private\n\
 */\n\
\n\
function parse(html) {\n\
  if ('string' != typeof html) throw new TypeError('String expected');\n\
  \n\
  // tag name\n\
  var m = /<([\\w:]+)/.exec(html);\n\
  if (!m) return document.createTextNode(html);\n\
\n\
  html = html.replace(/^\\s+|\\s+$/g, ''); // Remove leading/trailing whitespace\n\
\n\
  var tag = m[1];\n\
\n\
  // body support\n\
  if (tag == 'body') {\n\
    var el = document.createElement('html');\n\
    el.innerHTML = html;\n\
    return el.removeChild(el.lastChild);\n\
  }\n\
\n\
  // wrap map\n\
  var wrap = map[tag] || map._default;\n\
  var depth = wrap[0];\n\
  var prefix = wrap[1];\n\
  var suffix = wrap[2];\n\
  var el = document.createElement('div');\n\
  el.innerHTML = prefix + html + suffix;\n\
  while (depth--) el = el.lastChild;\n\
\n\
  // one element\n\
  if (el.firstChild == el.lastChild) {\n\
    return el.removeChild(el.firstChild);\n\
  }\n\
\n\
  // several elements\n\
  var fragment = document.createDocumentFragment();\n\
  while (el.firstChild) {\n\
    fragment.appendChild(el.removeChild(el.firstChild));\n\
  }\n\
\n\
  return fragment;\n\
}\n\
\n\
//# sourceURL=components/component/domify/1.2.2/index.js"
));

require.modules["component-domify"] = require.modules["component~domify@1.2.2"];
require.modules["component~domify"] = require.modules["component~domify@1.2.2"];
require.modules["domify"] = require.modules["component~domify@1.2.2"];


require.register("component~once@0.0.1", Function("exports, module",
"\n\
/**\n\
 * Identifier.\n\
 */\n\
\n\
var n = 0;\n\
\n\
/**\n\
 * Global.\n\
 */\n\
\n\
var global = (function(){ return this })();\n\
\n\
/**\n\
 * Make `fn` callable only once.\n\
 *\n\
 * @param {Function} fn\n\
 * @return {Function}\n\
 * @api public\n\
 */\n\
\n\
module.exports = function(fn) {\n\
  var id = n++;\n\
\n\
  function once(){\n\
    // no receiver\n\
    if (this == global) {\n\
      if (once.called) return;\n\
      once.called = true;\n\
      return fn.apply(this, arguments);\n\
    }\n\
\n\
    // receiver\n\
    var key = '__called_' + id + '__';\n\
    if (this[key]) return;\n\
    this[key] = true;\n\
    return fn.apply(this, arguments);\n\
  }\n\
\n\
  return once;\n\
};\n\
\n\
//# sourceURL=components/component/once/0.0.1/index.js"
));

require.modules["component-once"] = require.modules["component~once@0.0.1"];
require.modules["component~once"] = require.modules["component~once@0.0.1"];
require.modules["once"] = require.modules["component~once@0.0.1"];


require.register("component~indexof@0.0.3", Function("exports, module",
"module.exports = function(arr, obj){\n\
  if (arr.indexOf) return arr.indexOf(obj);\n\
  for (var i = 0; i < arr.length; ++i) {\n\
    if (arr[i] === obj) return i;\n\
  }\n\
  return -1;\n\
};\n\
//# sourceURL=components/component/indexof/0.0.3/index.js"
));

require.modules["component-indexof"] = require.modules["component~indexof@0.0.3"];
require.modules["component~indexof"] = require.modules["component~indexof@0.0.3"];
require.modules["indexof"] = require.modules["component~indexof@0.0.3"];


require.register("component~classes@1.2.1", Function("exports, module",
"/**\n\
 * Module dependencies.\n\
 */\n\
\n\
var index = require(\"component~indexof@0.0.3\");\n\
\n\
/**\n\
 * Whitespace regexp.\n\
 */\n\
\n\
var re = /\\s+/;\n\
\n\
/**\n\
 * toString reference.\n\
 */\n\
\n\
var toString = Object.prototype.toString;\n\
\n\
/**\n\
 * Wrap `el` in a `ClassList`.\n\
 *\n\
 * @param {Element} el\n\
 * @return {ClassList}\n\
 * @api public\n\
 */\n\
\n\
module.exports = function(el){\n\
  return new ClassList(el);\n\
};\n\
\n\
/**\n\
 * Initialize a new ClassList for `el`.\n\
 *\n\
 * @param {Element} el\n\
 * @api private\n\
 */\n\
\n\
function ClassList(el) {\n\
  if (!el) throw new Error('A DOM element reference is required');\n\
  this.el = el;\n\
  this.list = el.classList;\n\
}\n\
\n\
/**\n\
 * Add class `name` if not already present.\n\
 *\n\
 * @param {String} name\n\
 * @return {ClassList}\n\
 * @api public\n\
 */\n\
\n\
ClassList.prototype.add = function(name){\n\
  // classList\n\
  if (this.list) {\n\
    this.list.add(name);\n\
    return this;\n\
  }\n\
\n\
  // fallback\n\
  var arr = this.array();\n\
  var i = index(arr, name);\n\
  if (!~i) arr.push(name);\n\
  this.el.className = arr.join(' ');\n\
  return this;\n\
};\n\
\n\
/**\n\
 * Remove class `name` when present, or\n\
 * pass a regular expression to remove\n\
 * any which match.\n\
 *\n\
 * @param {String|RegExp} name\n\
 * @return {ClassList}\n\
 * @api public\n\
 */\n\
\n\
ClassList.prototype.remove = function(name){\n\
  if ('[object RegExp]' == toString.call(name)) {\n\
    return this.removeMatching(name);\n\
  }\n\
\n\
  // classList\n\
  if (this.list) {\n\
    this.list.remove(name);\n\
    return this;\n\
  }\n\
\n\
  // fallback\n\
  var arr = this.array();\n\
  var i = index(arr, name);\n\
  if (~i) arr.splice(i, 1);\n\
  this.el.className = arr.join(' ');\n\
  return this;\n\
};\n\
\n\
/**\n\
 * Remove all classes matching `re`.\n\
 *\n\
 * @param {RegExp} re\n\
 * @return {ClassList}\n\
 * @api private\n\
 */\n\
\n\
ClassList.prototype.removeMatching = function(re){\n\
  var arr = this.array();\n\
  for (var i = 0; i < arr.length; i++) {\n\
    if (re.test(arr[i])) {\n\
      this.remove(arr[i]);\n\
    }\n\
  }\n\
  return this;\n\
};\n\
\n\
/**\n\
 * Toggle class `name`, can force state via `force`.\n\
 *\n\
 * For browsers that support classList, but do not support `force` yet,\n\
 * the mistake will be detected and corrected.\n\
 *\n\
 * @param {String} name\n\
 * @param {Boolean} force\n\
 * @return {ClassList}\n\
 * @api public\n\
 */\n\
\n\
ClassList.prototype.toggle = function(name, force){\n\
  // classList\n\
  if (this.list) {\n\
    if (\"undefined\" !== typeof force) {\n\
      if (force !== this.list.toggle(name, force)) {\n\
        this.list.toggle(name); // toggle again to correct\n\
      }\n\
    } else {\n\
      this.list.toggle(name);\n\
    }\n\
    return this;\n\
  }\n\
\n\
  // fallback\n\
  if (\"undefined\" !== typeof force) {\n\
    if (!force) {\n\
      this.remove(name);\n\
    } else {\n\
      this.add(name);\n\
    }\n\
  } else {\n\
    if (this.has(name)) {\n\
      this.remove(name);\n\
    } else {\n\
      this.add(name);\n\
    }\n\
  }\n\
\n\
  return this;\n\
};\n\
\n\
/**\n\
 * Return an array of classes.\n\
 *\n\
 * @return {Array}\n\
 * @api public\n\
 */\n\
\n\
ClassList.prototype.array = function(){\n\
  var str = this.el.className.replace(/^\\s+|\\s+$/g, '');\n\
  var arr = str.split(re);\n\
  if ('' === arr[0]) arr.shift();\n\
  return arr;\n\
};\n\
\n\
/**\n\
 * Check if class `name` is present.\n\
 *\n\
 * @param {String} name\n\
 * @return {ClassList}\n\
 * @api public\n\
 */\n\
\n\
ClassList.prototype.has =\n\
ClassList.prototype.contains = function(name){\n\
  return this.list\n\
    ? this.list.contains(name)\n\
    : !! ~index(this.array(), name);\n\
};\n\
\n\
//# sourceURL=components/component/classes/1.2.1/index.js"
));

require.modules["component-classes"] = require.modules["component~classes@1.2.1"];
require.modules["component~classes"] = require.modules["component~classes@1.2.1"];
require.modules["classes"] = require.modules["component~classes@1.2.1"];


require.register("pull-to-refresh", Function("exports, module",
"var events = require(\"component~event@0.1.4\");\n\
var classes = require(\"component~classes@1.2.1\");\n\
var domify = require(\"component~domify@1.2.2\");\n\
var Tween = require(\"component~tween@1.1.0\");\n\
var raf = require(\"component~raf@1.1.3\");\n\
var once = require(\"component~once@0.0.1\");\n\
var template = require(\"pull-to-refresh/template.html\");\n\
var Iscroll = require(\"chemzqm~iscroll@0.1.4\");\n\
\n\
var LOADING_TEXT = '加载中...';\n\
var PULL_TEXT = '下拉刷新';\n\
var RELEASE_TEXT = '释放更新';\n\
\n\
function prepend(parentNode, node) {\n\
  if (parentNode.firstChild) {\n\
    parentNode.insertBefore(node, parentNode.firstChild);\n\
  } else {\n\
    parentNode.appendChild(node);\n\
  }\n\
}\n\
\n\
module.exports = function PTR(el, opt, fn) {\n\
  if (!(this instanceof PTR)) return new PTR(el, opt, fn);\n\
  if (typeof opt === 'function') {\n\
    fn = opt;\n\
    opt = {};\n\
  }\n\
  this.LOADING_TEXT = opt.LOADING_TEXT || LOADING_TEXT;\n\
  this.PULL_TEXT = opt.PULL_TEXT || PULL_TEXT;\n\
  this.RELEASE_TEXT = opt.RELEASE_TEXT || RELEASE_TEXT;\n\
  this.timeout = opt.timeout || 10000;\n\
  var start;\n\
  var loading;\n\
  prepend(el, domify(template))\n\
  var imgEl = el.querySelector('.ptr_image');\n\
  var textEl = el.querySelector('.ptr_text');\n\
  var iscroll = new Iscroll(el, {\n\
    handlebar: true,\n\
    autorefresh: false\n\
  });\n\
\n\
  iscroll.on('scroll', function(top) {\n\
    if (loading) return;\n\
    if (top < 0 && top >= - 40) {\n\
      textEl.textContent = this.PULL_TEXT;\n\
    }\n\
    if (top < -40) {\n\
      classes(imgEl).add('ptr_rotate');\n\
      textEl.textContent = this.RELEASE_TEXT;\n\
      start = true;\n\
    } else {\n\
      classes(imgEl).remove('ptr_rotate');\n\
      start = false;\n\
    }\n\
  }.bind(this))\n\
\n\
  var self = this;\n\
  function callback() {\n\
    iscroll.scrollTo(0, 100);\n\
    iscroll.refresh();\n\
    loading = false;\n\
    textEl.textContent = self.PULL_TEXT;\n\
    imgEl.className = 'ptr_image';\n\
  }\n\
\n\
  var refresh = this.refresh = function () {\n\
      iscroll.scrollTo(40, 100);\n\
      imgEl.className += ' ptr_loading';\n\
      textEl.textContent = self.LOADING_TEXT;\n\
      loading = true;\n\
      var timeout = setTimeout(callback, self.timeout);\n\
      var cb = once(function () {\n\
        clearTimeout(timeout);\n\
        callback();\n\
      });\n\
      fn(cb);\n\
  };\n\
\n\
  iscroll.on('release', function () {\n\
    if (start) {\n\
      refresh();\n\
    }\n\
    start = false;\n\
  })\n\
}\n\
\n\
//# sourceURL=index.js"
));

require.define("pull-to-refresh/template.html", "<div class=\"ptr_box\">\n  <div class=\"ptr_container\">\n    <div class=\"ptr_image\"></div>\n    <div class=\"ptr_text\">下拉刷新</div>\n  </div>\n</div>\n");

require.modules["pull-to-refresh"] = require.modules["pull-to-refresh"];


