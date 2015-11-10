/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1)
	__webpack_require__(5)
	var domify = __webpack_require__(7)
	var Iscroll = __webpack_require__(8)
	var Ptr = __webpack_require__(31)
	
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


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./node_modules/css-loader/index.js!./ptr.css", function() {
				var newContent = require("!!./node_modules/css-loader/index.js!./ptr.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports
	
	
	// module
	exports.push([module.id, "@font-face {\n  font-family: 'ptr';\n  src: url('data:application/octet-stream;base64,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') format('woff'),\n       url('data:application/octet-stream;base64,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sCYrLbA7LLAAFrAEJbAEJiAuRyNHI2GwBkUrIyA8IC4jOLEmARQrLbA8LLEIBCVCsAAWsAQlsAQlIC5HI0cjYSCwBCNCsAZFKyCwYFBYILBAUVizAiADIBuzAiYDGllCQiMgR7AEQ7CAYmAgsAArIIqKYSCwAkNgZCOwA0NhZFBYsAJDYRuwA0NgWbADJbCAYmGwAiVGYTgjIDwjOBshICBGI0ewACsjYTghWbEmARQrLbA9LLAwKy6xJgEUKy2wPiywMSshIyAgPLAEI0IjOLEmARQrsARDLrAmKy2wPyywABUgR7AAI0KyAAEBFRQTLrAsKi2wQCywABUgR7AAI0KyAAEBFRQTLrAsKi2wQSyxAAEUE7AtKi2wQiywLyotsEMssAAWRSMgLiBGiiNhOLEmARQrLbBELLAII0KwQystsEUssgAAPCstsEYssgABPCstsEcssgEAPCstsEgssgEBPCstsEkssgAAPSstsEossgABPSstsEsssgEAPSstsEwssgEBPSstsE0ssgAAOSstsE4ssgABOSstsE8ssgEAOSstsFAssgEBOSstsFEssgAAOystsFIssgABOystsFMssgEAOystsFQssgEBOystsFUssgAAPistsFYssgABPistsFcssgEAPistsFgssgEBPistsFkssgAAOistsFossgABOistsFsssgEAOistsFwssgEBOistsF0ssDIrLrEmARQrLbBeLLAyK7A2Ky2wXyywMiuwNystsGAssAAWsDIrsDgrLbBhLLAzKy6xJgEUKy2wYiywMyuwNistsGMssDMrsDcrLbBkLLAzK7A4Ky2wZSywNCsusSYBFCstsGYssDQrsDYrLbBnLLA0K7A3Ky2waCywNCuwOCstsGkssDUrLrEmARQrLbBqLLA1K7A2Ky2wayywNSuwNystsGwssDUrsDgrLbBtLCuwCGWwAyRQeLABFTAtAAAAS7gAyFJYsQEBjlm5CAAIAGMgsAEjRLADI3CyBCgJRVJEsgoCByqxBgFEsSQBiFFYsECIWLEGA0SxJgGIUVi4BACIWLEGAURZWVlZuAH/hbAEjbEFAEQAAA==') format('truetype');\n}\n\n.ptr_scrollable {\n  position: relative;\n  overflow-y: visible;\n  -webkit-overflow-scrolling: touch;\n}\n\n.ptr_box {\n  position: absolute;\n  top: -40px;\n  display: block;\n  height: 40px;\n  left: 0px;\n  right: 0;\n  overflow: hidden;\n}\n\n.ptr_box .ptr_container {\n  position: relative;\n  width: 120px;\n  margin: auto;\n  text-align: center;\n  height: 40px;\n  line-height: 40px;\n}\n\n.ptr_box .ptr_text {\n  font-size: 14px;\n}\n\n.ptr_box .ptr_image {\n  position: absolute;\n  top: 0px;\n  left: 12px;\n  height: 100%;\n  -webkit-transform: translate3d(0, 0, 0);\n  -webkit-transform-origin: center center;\n  -webkit-transition: -webkit-transform .2s linear;\n  transition: -webkit-transform .2s linear;\n}\n\n.ptr_box .ptr_image:before {\n  font-family: \"ptr\";\n  font-size: 22px;\n  text-align: center;\n  line-height: 40px;\n  content: '\\E802';\n}\n\n.ptr_box .ptr_image.ptr_rotate {\n  -webkit-transform: translate3d(0, 0, 0) rotate(180deg);\n}\n\n.ptr_box .ptr_image.ptr_loading {\n  animation: spin 0.8s infinite linear;\n}\n\n.ptr_box .ptr_image.ptr_loading:before {\n  content: '\\E800';\n  font-size: 16px;\n}\n\n@-webkit-keyframes spin {\n  from {\n    -webkit-transform: translate3d(0, 0, 0) rotate(0deg);\n  }\n  to {\n    -webkit-transform: translate3d(0, 0, 0) rotate(360deg);\n  }\n}\n", ""]);
	
	// exports


/***/ },
/* 3 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(true) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(6);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../css-loader/index.js!./iscroll.css", function() {
				var newContent = require("!!./../css-loader/index.js!./iscroll.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports
	
	
	// module
	exports.push([module.id, ".iscroll-handlebar {\n  position: absolute;\n  right: 0px;\n  top: 0px;\n  transition: background-color 0.2s ease-out, transform 0.1s ease-out,width 0.1s ease-out, height 0.1s ease-out;\n  width: 4px;\n  border-radius: 2px;\n  background-color: rgba(0, 0, 0, 0);\n  z-index: 9999;\n  height: 0px;\n}\n", ""]);
	
	// exports


/***/ },
/* 7 */
/***/ function(module, exports) {

	
	/**
	 * Expose `parse`.
	 */
	
	module.exports = parse;
	
	/**
	 * Tests for browser support.
	 */
	
	var innerHTMLBug = false;
	var bugTestDiv;
	if (typeof document !== 'undefined') {
	  bugTestDiv = document.createElement('div');
	  // Setup
	  bugTestDiv.innerHTML = '  <link/><table></table><a href="/a">a</a><input type="checkbox"/>';
	  // Make sure that link elements get serialized correctly by innerHTML
	  // This requires a wrapper element in IE
	  innerHTMLBug = !bugTestDiv.getElementsByTagName('link').length;
	  bugTestDiv = undefined;
	}
	
	/**
	 * Wrap map from jquery.
	 */
	
	var map = {
	  legend: [1, '<fieldset>', '</fieldset>'],
	  tr: [2, '<table><tbody>', '</tbody></table>'],
	  col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
	  // for script/link/style tags to work in IE6-8, you have to wrap
	  // in a div with a non-whitespace character in front, ha!
	  _default: innerHTMLBug ? [1, 'X<div>', '</div>'] : [0, '', '']
	};
	
	map.td =
	map.th = [3, '<table><tbody><tr>', '</tr></tbody></table>'];
	
	map.option =
	map.optgroup = [1, '<select multiple="multiple">', '</select>'];
	
	map.thead =
	map.tbody =
	map.colgroup =
	map.caption =
	map.tfoot = [1, '<table>', '</table>'];
	
	map.polyline =
	map.ellipse =
	map.polygon =
	map.circle =
	map.text =
	map.line =
	map.path =
	map.rect =
	map.g = [1, '<svg xmlns="http://www.w3.org/2000/svg" version="1.1">','</svg>'];
	
	/**
	 * Parse `html` and return a DOM Node instance, which could be a TextNode,
	 * HTML DOM Node of some kind (<div> for example), or a DocumentFragment
	 * instance, depending on the contents of the `html` string.
	 *
	 * @param {String} html - HTML string to "domify"
	 * @param {Document} doc - The `document` instance to create the Node for
	 * @return {DOMNode} the TextNode, DOM Node, or DocumentFragment instance
	 * @api private
	 */
	
	function parse(html, doc) {
	  if ('string' != typeof html) throw new TypeError('String expected');
	
	  // default to the global `document` object
	  if (!doc) doc = document;
	
	  // tag name
	  var m = /<([\w:]+)/.exec(html);
	  if (!m) return doc.createTextNode(html);
	
	  html = html.replace(/^\s+|\s+$/g, ''); // Remove leading/trailing whitespace
	
	  var tag = m[1];
	
	  // body support
	  if (tag == 'body') {
	    var el = doc.createElement('html');
	    el.innerHTML = html;
	    return el.removeChild(el.lastChild);
	  }
	
	  // wrap map
	  var wrap = map[tag] || map._default;
	  var depth = wrap[0];
	  var prefix = wrap[1];
	  var suffix = wrap[2];
	  var el = doc.createElement('div');
	  el.innerHTML = prefix + html + suffix;
	  while (depth--) el = el.lastChild;
	
	  // one element
	  if (el.firstChild == el.lastChild) {
	    return el.removeChild(el.firstChild);
	  }
	
	  // several elements
	  var fragment = doc.createDocumentFragment();
	  while (el.firstChild) {
	    fragment.appendChild(el.removeChild(el.firstChild));
	  }
	
	  return fragment;
	}


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(9)


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var detect = __webpack_require__(10)
	var touchAction = detect.touchAction
	var transform = detect.transform
	var has3d = detect.has3d
	var computedStyle = __webpack_require__(16)
	var Emitter = __webpack_require__(17)
	var events = __webpack_require__(18)
	var Tween = __webpack_require__(24)
	var raf = __webpack_require__(28)
	var throttle = __webpack_require__(29)
	var Handlebar = __webpack_require__(30)
	var max = Math.max
	var min = Math.min
	var now = Date.now
	
	var defineProperty = Object.defineProperty
	
	function lastVisible(el) {
	  var nodes = el.childNodes
	  for(var i = nodes.length - 1; i >=0; i --) {
	    var node = nodes[i]
	    if (node.nodeType === 1 && computedStyle(node, 'display') !== 'none') {
	      return node
	    }
	  }
	}
	
	function customEvent(name) {
	  var e
	  try {
	    e = new CustomEvent(name)
	  } catch(error) {
	    try {
	      e = document.createEvent('CustomEvent')
	      e.initCustomEvent(name, false, false, 0)
	    } catch(err) {
	      return
	    }
	  }
	  return e
	}
	
	/**
	 * Init iscroll with el and options
	 * options.handlebar show handlebar if is true
	 *
	 * @param  {Element}  el
	 * @param {Object} opts
	 * @api public
	 */
	function Iscroll(el, opts) {
	  if (! (this instanceof Iscroll)) return new Iscroll(el, opts)
	  this.y = 0
	  this.scrollable = el
	  el.style.overflow = 'hidden'
	  var children = el.children
	  if (children.length !== 1) {
	    throw new Error('iscroll need single element child of scrollable to work')
	  }
	  this.el = children[0]
	  this.touchAction('none')
	  this.refresh()
	  this.bind()
	  var self = this
	  if (defineProperty) {
	    defineProperty(this.scrollable, 'scrollTop', {
	      set: function (v) {
	        return self.scrollTo(-v, 200)
	      },
	      get: function () {
	        return - self.y
	      }
	    })
	  }
	  this.on('scroll', function () {
	    var e = customEvent('scroll')
	    if (e) el.dispatchEvent(e)
	  })
	  opts = opts || {}
	  if (opts.handlebar) {
	    this.handlebar = new Handlebar(el)
	  }
	  this._refresh = this.refresh.bind(this)
	  window.addEventListener('orientationchange', this._refresh, false)
	  window.addEventListener('resize', this._refresh, false)
	}
	
	Emitter(Iscroll.prototype)
	
	Iscroll.prototype.bind = function () {
	  this.events = events(this.el, this)
	  this.docEvents = events(document, this)
	
	   // W3C touch events
	  this.events.bind('touchstart')
	  this.events.bind('touchmove')
	  this.docEvents.bind('touchend')
	  this.docEvents.bind('touchcancel', 'ontouchend')
	}
	
	/**
	 * recalculate height
	 *
	 * @api public
	 */
	Iscroll.prototype.refresh = function () {
	  var child = lastVisible(this.el)
	  this.viewHeight = parseInt(computedStyle(this.scrollable, 'height'), 10)
	  var cb = child.getBoundingClientRect().bottom
	  var b = this.el.getBoundingClientRect().bottom
	  var h = parseInt(computedStyle(this.el, 'height'), 10)
	  this.height = h + (cb - b)
	  this.el.style.height = this.height + 'px'
	}
	
	Iscroll.prototype.unbind = function () {
	  this.off()
	  this.events.unbind()
	  this.docEvents.unbind()
	  window.removeEventListener('orientationchange', this._refresh, false)
	  window.removeEventListener('resize', this._refresh, false)
	  if (this.handlebar) this.scrollable.removeChild(this.handlebar.el)
	}
	
	Iscroll.prototype.restrict = function (y) {
	  y = min(y , 80)
	  var h = Math.max(this.height, this.viewHeight)
	  y = max(y , this.viewHeight - h - 80)
	  return y
	}
	
	Iscroll.prototype.ontouchstart = function (e) {
	  this.speed = null
	  this.leftright = null
	  if (this.tween) this.tween.stop()
	  this.dy = 0
	  this.ts = now()
	  if (this.handlebar) this.resizeHandlebar()
	
	  var touch = this.getTouch(e)
	  this.clientY = touch.clientY
	  this.down = {
	    x: touch.clientX,
	    y: touch.clientY,
	    start: this.y,
	    at: now()
	  }
	}
	
	Iscroll.prototype.ontouchmove = function (e) {
	  e.preventDefault()
	  // do nothing if left right move
	  if (e.touches.length > 1 || !this.down || this.leftright) return
	  var touch = this.getTouch(e)
	  var down = this.down
	  var dy = this.dy = touch.clientY - down.y
	  var dx = touch.clientX - down.x
	  // can not determine
	  if (dx === 0 && dy === 0) return
	  // determine dy and the slope
	  if (null == this.leftright) {
	    // no move if contentHeight < viewHeight and move up
	    if (this.height <= this.viewHeight && dy < 0) return
	    var slope = dx / dy
	    // if is greater than 1 or -1, we're swiping up/down
	    if (slope > 1 || slope < -1) {
	      this.leftright = true
	      if (this.handlebar) this.hideHandlebar()
	      return
	    } else {
	      this.leftright = false
	    }
	  }
	
	  //calculate speed every 100 milisecond
	  this.calcuteSpeed(touch.clientY)
	  var start = this.down.start
	  var dest = this.restrict(start + dy)
	  this.translate(dest)
	}
	
	Iscroll.prototype.calcuteSpeed = function (y) {
	  var ts = now()
	  var dt = ts - this.ts
	  if (ts - this.down.at < 100) {
	    this.distance = y - this.clientY
	    this.speed = Math.abs(this.distance/dt)
	  } else if(dt > 100){
	    this.distance = y - this.clientY
	    this.speed = Math.abs(this.distance/dt)
	    this.ts = ts
	    this.clientY = y
	  }
	}
	
	Iscroll.prototype.ontouchend = function (e) {
	  if (!this.down || this.leftright) return
	  if (this.height <= this.viewHeight && this.dy < 0) {
	    if(this.handlebar) this.handlebar.hide()
	    return
	  }
	  var touch = this.getTouch(e)
	  this.calcuteSpeed(touch.clientY)
	  var m = this.momentum()
	  this.scrollTo(m.dest, m.duration, m.ease)
	  this.emit('release', this.y)
	  this.down = null
	}
	
	/**
	 * Calculate the animate props for moveon
	 *
	 * @return {Object}
	 * @api private
	 */
	Iscroll.prototype.momentum = function () {
	  var deceleration = 0.0004
	  var speed = this.speed
	  speed = min(speed, 0.8)
	  var destination = this.y + ( speed * speed ) / ( 2 * deceleration ) * ( this.distance < 0 ? -1 : 1 )
	  var duration = speed / deceleration
	  var newY, ease
	  if (destination > 0) {
	    newY = 0
	    ease = 'out-back'
	  } else if (destination < this.viewHeight - this.height) {
	    newY = this.viewHeight - this.height
	    ease = 'out-back'
	  }
	  if (typeof newY === 'number') {
	    duration = duration*(newY - this.y + 160)/(destination - this.y)
	    destination = newY
	  }
	  if (this.y > 0 || this.y < this.viewHeight - this.height) {
	    duration = 500
	    ease = 'out-circ'
	  }
	  return {
	    dest: destination,
	    duration: duration,
	    ease: ease
	  }
	}
	
	
	Iscroll.prototype.scrollTo = function (y, duration, easing) {
	  if (this.tween) this.tween.stop()
	  var intransition = (duration > 0 && y !== this.y)
	  if (!intransition) {
	    this.onScrollEnd()
	    return this.translate(y)
	  }
	
	  easing = easing || 'out-cube'
	  var tween = this.tween = Tween({y : this.y})
	      .ease(easing)
	      .to({y: y})
	      .duration(duration)
	
	  var self = this
	  tween.update(function(o) {
	    self.translate(o.y)
	  })
	
	  tween.on('end', function () {
	    animate = function(){} // eslint-disable-line
	    if (!tween.stopped) {
	      self.onScrollEnd()
	    }
	  })
	
	  function animate() {
	    raf(animate)
	    tween.update()
	  }
	
	  animate()
	}
	
	Iscroll.prototype.onScrollEnd = function () {
	  this.hideHandlebar()
	  var top = this.y === 0
	  var bottom = this.y === (this.viewHeight - this.height)
	  this.emit('scrollend', {
	    top: top,
	    bottom: bottom
	  })
	}
	
	/**
	 * Gets the appropriate "touch" object for the `e` event. The event may be from
	 * a "mouse", "touch", or "Pointer" event, so the normalization happens here.
	 *
	 * @api private
	 */
	
	Iscroll.prototype.getTouch = function(e){
	  // "mouse" and "Pointer" events just use the event object itself
	  var touch = e
	  if (e.changedTouches && e.changedTouches.length > 0) {
	    // W3C "touch" events use the `changedTouches` array
	    touch = e.changedTouches[0]
	  }
	  return touch
	}
	
	
	/**
	 * Translate to `x`.
	 *
	 *
	 * @api private
	 */
	
	Iscroll.prototype.translate = function(y) {
	  var s = this.el.style
	  if (isNaN(y)) return
	  y = Math.floor(y)
	  //reach the end
	  if (this.y !== y) {
	    this.y = y
	    this.emit('scroll', - y)
	    if (this.handlebar) this.transformHandlebar()
	  }
	  if (has3d) {
	    s[transform] = 'translate3d(0, ' + y + 'px' + ', 0)'
	  } else {
	    s[transform] = 'translateY(' + y + 'px)'
	  }
	}
	
	/**
	 * Sets the "touchAction" CSS style property to `value`.
	 *
	 * @api private
	 */
	
	Iscroll.prototype.touchAction = function(value){
	  var s = this.el.style
	  if (touchAction) {
	    s[touchAction] = value
	  }
	}
	
	Iscroll.prototype.transformHandlebar = throttle(function(){
	  var vh = this.viewHeight
	  var h = this.height
	  var bh = vh - vh * vh/h
	  var ih = h - vh
	  var y = parseInt(- bh * this.y/ih)
	  this.handlebar.translateY(y)
	}, 100)
	
	/**
	 * show the handlebar and size it
	 * @api public
	 */
	Iscroll.prototype.resizeHandlebar = function(){
	  var h = this.viewHeight * this.viewHeight/this.height
	  this.handlebar.resize(h)
	}
	
	Iscroll.prototype.hideHandlebar = function () {
	  if (this.handlebar) this.handlebar.hide()
	}
	
	module.exports = Iscroll


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	exports.transition = __webpack_require__(11)
	
	exports.transform = __webpack_require__(12)
	
	exports.touchAction = __webpack_require__(13)
	
	exports.transitionend = __webpack_require__(14)
	
	exports.has3d = __webpack_require__(15)


/***/ },
/* 11 */
/***/ function(module, exports) {

	var styles = [
	  'transition',
	  'webkitTransition',
	  'MozTransition',
	  'OTransition',
	  'msTransition'
	]
	
	var el = document.createElement('p')
	var style
	
	for (var i = 0; i < styles.length; i++) {
	  if (null != el.style[styles[i]]) {
	    style = styles[i]
	    break
	  }
	}
	el = null
	
	module.exports = style


/***/ },
/* 12 */
/***/ function(module, exports) {

	
	var styles = [
	  'webkitTransform',
	  'MozTransform',
	  'msTransform',
	  'OTransform',
	  'transform'
	];
	
	var el = document.createElement('p');
	var style;
	
	for (var i = 0; i < styles.length; i++) {
	  style = styles[i];
	  if (null != el.style[style]) {
	    module.exports = style;
	    break;
	  }
	}


/***/ },
/* 13 */
/***/ function(module, exports) {

	
	/**
	 * Module exports.
	 */
	
	module.exports = touchActionProperty();
	
	/**
	 * Returns "touchAction", "msTouchAction", or null.
	 */
	
	function touchActionProperty(doc) {
	  if (!doc) doc = document;
	  var div = doc.createElement('div');
	  var prop = null;
	  if ('touchAction' in div.style) prop = 'touchAction';
	  else if ('msTouchAction' in div.style) prop = 'msTouchAction';
	  div = null;
	  return prop;
	}


/***/ },
/* 14 */
/***/ function(module, exports) {

	/**
	 * Transition-end mapping
	 */
	
	var map = {
	  'WebkitTransition' : 'webkitTransitionEnd',
	  'MozTransition' : 'transitionend',
	  'OTransition' : 'oTransitionEnd',
	  'msTransition' : 'MSTransitionEnd',
	  'transition' : 'transitionend'
	};
	
	/**
	 * Expose `transitionend`
	 */
	
	var el = document.createElement('p');
	
	for (var transition in map) {
	  if (null != el.style[transition]) {
	    module.exports = map[transition];
	    break;
	  }
	}


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	
	var prop = __webpack_require__(12);
	
	// IE <=8 doesn't have `getComputedStyle`
	if (!prop || !window.getComputedStyle) {
	  module.exports = false;
	
	} else {
	  var map = {
	    webkitTransform: '-webkit-transform',
	    OTransform: '-o-transform',
	    msTransform: '-ms-transform',
	    MozTransform: '-moz-transform',
	    transform: 'transform'
	  };
	
	  // from: https://gist.github.com/lorenzopolidori/3794226
	  var el = document.createElement('div');
	  el.style[prop] = 'translate3d(1px,1px,1px)';
	  document.body.insertBefore(el, null);
	  var val = getComputedStyle(el).getPropertyValue(map[prop]);
	  document.body.removeChild(el);
	  module.exports = null != val && val.length && 'none' != val;
	}


/***/ },
/* 16 */
/***/ function(module, exports) {

	// DEV: We don't use var but favor parameters since these play nicer with minification
	function computedStyle(el, prop, getComputedStyle, style) {
	  getComputedStyle = window.getComputedStyle;
	  style =
	      // If we have getComputedStyle
	      getComputedStyle ?
	        // Query it
	        // TODO: From CSS-Query notes, we might need (node, null) for FF
	        getComputedStyle(el) :
	
	      // Otherwise, we are in IE and use currentStyle
	        el.currentStyle;
	  if (style) {
	    return style
	    [
	      // Switch to camelCase for CSSOM
	      // DEV: Grabbed from jQuery
	      // https://github.com/jquery/jquery/blob/1.9-stable/src/css.js#L191-L194
	      // https://github.com/jquery/jquery/blob/1.9-stable/src/core.js#L593-L597
	      prop.replace(/-(\w)/gi, function (word, letter) {
	        return letter.toUpperCase();
	      })
	    ];
	  }
	}
	
	module.exports = computedStyle;


/***/ },
/* 17 */
/***/ function(module, exports) {

	
	/**
	 * Expose `Emitter`.
	 */
	
	module.exports = Emitter;
	
	/**
	 * Initialize a new `Emitter`.
	 *
	 * @api public
	 */
	
	function Emitter(obj) {
	  if (obj) return mixin(obj);
	};
	
	/**
	 * Mixin the emitter properties.
	 *
	 * @param {Object} obj
	 * @return {Object}
	 * @api private
	 */
	
	function mixin(obj) {
	  for (var key in Emitter.prototype) {
	    obj[key] = Emitter.prototype[key];
	  }
	  return obj;
	}
	
	/**
	 * Listen on the given `event` with `fn`.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */
	
	Emitter.prototype.on =
	Emitter.prototype.addEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
	    .push(fn);
	  return this;
	};
	
	/**
	 * Adds an `event` listener that will be invoked a single
	 * time then automatically removed.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */
	
	Emitter.prototype.once = function(event, fn){
	  function on() {
	    this.off(event, on);
	    fn.apply(this, arguments);
	  }
	
	  on.fn = fn;
	  this.on(event, on);
	  return this;
	};
	
	/**
	 * Remove the given callback for `event` or all
	 * registered callbacks.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */
	
	Emitter.prototype.off =
	Emitter.prototype.removeListener =
	Emitter.prototype.removeAllListeners =
	Emitter.prototype.removeEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	
	  // all
	  if (0 == arguments.length) {
	    this._callbacks = {};
	    return this;
	  }
	
	  // specific event
	  var callbacks = this._callbacks['$' + event];
	  if (!callbacks) return this;
	
	  // remove all handlers
	  if (1 == arguments.length) {
	    delete this._callbacks['$' + event];
	    return this;
	  }
	
	  // remove specific handler
	  var cb;
	  for (var i = 0; i < callbacks.length; i++) {
	    cb = callbacks[i];
	    if (cb === fn || cb.fn === fn) {
	      callbacks.splice(i, 1);
	      break;
	    }
	  }
	  return this;
	};
	
	/**
	 * Emit `event` with the given args.
	 *
	 * @param {String} event
	 * @param {Mixed} ...
	 * @return {Emitter}
	 */
	
	Emitter.prototype.emit = function(event){
	  this._callbacks = this._callbacks || {};
	  var args = [].slice.call(arguments, 1)
	    , callbacks = this._callbacks['$' + event];
	
	  if (callbacks) {
	    callbacks = callbacks.slice(0);
	    for (var i = 0, len = callbacks.length; i < len; ++i) {
	      callbacks[i].apply(this, args);
	    }
	  }
	
	  return this;
	};
	
	/**
	 * Return array of callbacks for `event`.
	 *
	 * @param {String} event
	 * @return {Array}
	 * @api public
	 */
	
	Emitter.prototype.listeners = function(event){
	  this._callbacks = this._callbacks || {};
	  return this._callbacks['$' + event] || [];
	};
	
	/**
	 * Check if this emitter has `event` handlers.
	 *
	 * @param {String} event
	 * @return {Boolean}
	 * @api public
	 */
	
	Emitter.prototype.hasListeners = function(event){
	  return !! this.listeners(event).length;
	};


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */
	
	var events = __webpack_require__(19);
	var delegate = __webpack_require__(20);
	
	/**
	 * Expose `Events`.
	 */
	
	module.exports = Events;
	
	/**
	 * Initialize an `Events` with the given
	 * `el` object which events will be bound to,
	 * and the `obj` which will receive method calls.
	 *
	 * @param {Object} el
	 * @param {Object} obj
	 * @api public
	 */
	
	function Events(el, obj) {
	  if (!(this instanceof Events)) return new Events(el, obj);
	  if (!el) throw new Error('element required');
	  if (!obj) throw new Error('object required');
	  this.el = el;
	  this.obj = obj;
	  this._events = {};
	}
	
	/**
	 * Subscription helper.
	 */
	
	Events.prototype.sub = function(event, method, cb){
	  this._events[event] = this._events[event] || {};
	  this._events[event][method] = cb;
	};
	
	/**
	 * Bind to `event` with optional `method` name.
	 * When `method` is undefined it becomes `event`
	 * with the "on" prefix.
	 *
	 * Examples:
	 *
	 *  Direct event handling:
	 *
	 *    events.bind('click') // implies "onclick"
	 *    events.bind('click', 'remove')
	 *    events.bind('click', 'sort', 'asc')
	 *
	 *  Delegated event handling:
	 *
	 *    events.bind('click li > a')
	 *    events.bind('click li > a', 'remove')
	 *    events.bind('click a.sort-ascending', 'sort', 'asc')
	 *    events.bind('click a.sort-descending', 'sort', 'desc')
	 *
	 * @param {String} event
	 * @param {String|function} [method]
	 * @return {Function} callback
	 * @api public
	 */
	
	Events.prototype.bind = function(event, method){
	  var e = parse(event);
	  var el = this.el;
	  var obj = this.obj;
	  var name = e.name;
	  var method = method || 'on' + name;
	  var args = [].slice.call(arguments, 2);
	
	  // callback
	  function cb(){
	    var a = [].slice.call(arguments).concat(args);
	    obj[method].apply(obj, a);
	  }
	
	  // bind
	  if (e.selector) {
	    cb = delegate.bind(el, e.selector, name, cb);
	  } else {
	    events.bind(el, name, cb);
	  }
	
	  // subscription for unbinding
	  this.sub(name, method, cb);
	
	  return cb;
	};
	
	/**
	 * Unbind a single binding, all bindings for `event`,
	 * or all bindings within the manager.
	 *
	 * Examples:
	 *
	 *  Unbind direct handlers:
	 *
	 *     events.unbind('click', 'remove')
	 *     events.unbind('click')
	 *     events.unbind()
	 *
	 * Unbind delegate handlers:
	 *
	 *     events.unbind('click', 'remove')
	 *     events.unbind('click')
	 *     events.unbind()
	 *
	 * @param {String|Function} [event]
	 * @param {String|Function} [method]
	 * @api public
	 */
	
	Events.prototype.unbind = function(event, method){
	  if (0 == arguments.length) return this.unbindAll();
	  if (1 == arguments.length) return this.unbindAllOf(event);
	
	  // no bindings for this event
	  var bindings = this._events[event];
	  if (!bindings) return;
	
	  // no bindings for this method
	  var cb = bindings[method];
	  if (!cb) return;
	
	  events.unbind(this.el, event, cb);
	};
	
	/**
	 * Unbind all events.
	 *
	 * @api private
	 */
	
	Events.prototype.unbindAll = function(){
	  for (var event in this._events) {
	    this.unbindAllOf(event);
	  }
	};
	
	/**
	 * Unbind all events for `event`.
	 *
	 * @param {String} event
	 * @api private
	 */
	
	Events.prototype.unbindAllOf = function(event){
	  var bindings = this._events[event];
	  if (!bindings) return;
	
	  for (var method in bindings) {
	    this.unbind(event, method);
	  }
	};
	
	/**
	 * Parse `event`.
	 *
	 * @param {String} event
	 * @return {Object}
	 * @api private
	 */
	
	function parse(event) {
	  var parts = event.split(/ +/);
	  return {
	    name: parts.shift(),
	    selector: parts.join(' ')
	  }
	}


/***/ },
/* 19 */
/***/ function(module, exports) {

	var bind = window.addEventListener ? 'addEventListener' : 'attachEvent',
	    unbind = window.removeEventListener ? 'removeEventListener' : 'detachEvent',
	    prefix = bind !== 'addEventListener' ? 'on' : '';
	
	/**
	 * Bind `el` event `type` to `fn`.
	 *
	 * @param {Element} el
	 * @param {String} type
	 * @param {Function} fn
	 * @param {Boolean} capture
	 * @return {Function}
	 * @api public
	 */
	
	exports.bind = function(el, type, fn, capture){
	  el[bind](prefix + type, fn, capture || false);
	  return fn;
	};
	
	/**
	 * Unbind `el` event `type`'s callback `fn`.
	 *
	 * @param {Element} el
	 * @param {String} type
	 * @param {Function} fn
	 * @param {Boolean} capture
	 * @return {Function}
	 * @api public
	 */
	
	exports.unbind = function(el, type, fn, capture){
	  el[unbind](prefix + type, fn, capture || false);
	  return fn;
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */
	
	var closest = __webpack_require__(21)
	  , event = __webpack_require__(19);
	
	/**
	 * Delegate event `type` to `selector`
	 * and invoke `fn(e)`. A callback function
	 * is returned which may be passed to `.unbind()`.
	 *
	 * @param {Element} el
	 * @param {String} selector
	 * @param {String} type
	 * @param {Function} fn
	 * @param {Boolean} capture
	 * @return {Function}
	 * @api public
	 */
	
	exports.bind = function(el, selector, type, fn, capture){
	  return event.bind(el, type, function(e){
	    var target = e.target || e.srcElement;
	    e.delegateTarget = closest(target, selector, true, el);
	    if (e.delegateTarget) fn.call(el, e);
	  }, capture);
	};
	
	/**
	 * Unbind event `type`'s callback `fn`.
	 *
	 * @param {Element} el
	 * @param {String} type
	 * @param {Function} fn
	 * @param {Boolean} capture
	 * @api public
	 */
	
	exports.unbind = function(el, type, fn, capture){
	  event.unbind(el, type, fn, capture);
	};


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module Dependencies
	 */
	
	var matches = __webpack_require__(22)
	
	/**
	 * Export `closest`
	 */
	
	module.exports = closest
	
	/**
	 * Closest
	 *
	 * @param {Element} el
	 * @param {String} selector
	 * @param {Element} scope (optional)
	 */
	
	function closest (el, selector, scope) {
	  scope = scope || document.documentElement;
	
	  // walk up the dom
	  while (el && el !== scope) {
	    if (matches(el, selector)) return el;
	    el = el.parentNode;
	  }
	
	  // check scope for match
	  return matches(el, selector) ? el : null;
	}


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */
	
	var query = __webpack_require__(23);
	
	/**
	 * Element prototype.
	 */
	
	var proto = Element.prototype;
	
	/**
	 * Vendor function.
	 */
	
	var vendor = proto.matches
	  || proto.webkitMatchesSelector
	  || proto.mozMatchesSelector
	  || proto.msMatchesSelector
	  || proto.oMatchesSelector;
	
	/**
	 * Expose `match()`.
	 */
	
	module.exports = match;
	
	/**
	 * Match `el` to `selector`.
	 *
	 * @param {Element} el
	 * @param {String} selector
	 * @return {Boolean}
	 * @api public
	 */
	
	function match(el, selector) {
	  if (!el || el.nodeType !== 1) return false;
	  if (vendor) return vendor.call(el, selector);
	  var nodes = query.all(selector, el.parentNode);
	  for (var i = 0; i < nodes.length; ++i) {
	    if (nodes[i] == el) return true;
	  }
	  return false;
	}


/***/ },
/* 23 */
/***/ function(module, exports) {

	function one(selector, el) {
	  return el.querySelector(selector);
	}
	
	exports = module.exports = function(selector, el){
	  el = el || document;
	  return one(selector, el);
	};
	
	exports.all = function(selector, el){
	  el = el || document;
	  return el.querySelectorAll(selector);
	};
	
	exports.engine = function(obj){
	  if (!obj.one) throw new Error('.one callback required');
	  if (!obj.all) throw new Error('.all callback required');
	  one = obj.one;
	  exports.all = obj.all;
	  return exports;
	};


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */
	
	var Emitter = __webpack_require__(17);
	var clone = __webpack_require__(25);
	var type = __webpack_require__(26);
	var ease = __webpack_require__(27);
	
	/**
	 * Expose `Tween`.
	 */
	
	module.exports = Tween;
	
	/**
	 * Initialize a new `Tween` with `obj`.
	 *
	 * @param {Object|Array} obj
	 * @api public
	 */
	
	function Tween(obj) {
	  if (!(this instanceof Tween)) return new Tween(obj);
	  this._from = obj;
	  this.ease('linear');
	  this.duration(500);
	}
	
	/**
	 * Mixin emitter.
	 */
	
	Emitter(Tween.prototype);
	
	/**
	 * Reset the tween.
	 *
	 * @api public
	 */
	
	Tween.prototype.reset = function(){
	  this.isArray = 'array' === type(this._from);
	  this._curr = clone(this._from);
	  this._done = false;
	  this._start = Date.now();
	  return this;
	};
	
	/**
	 * Tween to `obj` and reset internal state.
	 *
	 *    tween.to({ x: 50, y: 100 })
	 *
	 * @param {Object|Array} obj
	 * @return {Tween} self
	 * @api public
	 */
	
	Tween.prototype.to = function(obj){
	  this.reset();
	  this._to = obj;
	  return this;
	};
	
	/**
	 * Set duration to `ms` [500].
	 *
	 * @param {Number} ms
	 * @return {Tween} self
	 * @api public
	 */
	
	Tween.prototype.duration = function(ms){
	  this._duration = ms;
	  return this;
	};
	
	/**
	 * Set easing function to `fn`.
	 *
	 *    tween.ease('in-out-sine')
	 *
	 * @param {String|Function} fn
	 * @return {Tween}
	 * @api public
	 */
	
	Tween.prototype.ease = function(fn){
	  fn = 'function' == typeof fn ? fn : ease[fn];
	  if (!fn) throw new TypeError('invalid easing function');
	  this._ease = fn;
	  return this;
	};
	
	/**
	 * Stop the tween and immediately emit "stop" and "end".
	 *
	 * @return {Tween}
	 * @api public
	 */
	
	Tween.prototype.stop = function(){
	  this.stopped = true;
	  this._done = true;
	  this.emit('stop');
	  this.emit('end');
	  return this;
	};
	
	/**
	 * Perform a step.
	 *
	 * @return {Tween} self
	 * @api private
	 */
	
	Tween.prototype.step = function(){
	  if (this._done) return;
	
	  // duration
	  var duration = this._duration;
	  var now = Date.now();
	  var delta = now - this._start;
	  var done = delta >= duration;
	
	  // complete
	  if (done) {
	    this._from = this._to;
	    this._update(this._to);
	    this._done = true;
	    this.emit('end');
	    return this;
	  }
	
	  // tween
	  var from = this._from;
	  var to = this._to;
	  var curr = this._curr;
	  var fn = this._ease;
	  var p = (now - this._start) / duration;
	  var n = fn(p);
	
	  // array
	  if (this.isArray) {
	    for (var i = 0; i < from.length; ++i) {
	      curr[i] = from[i] + (to[i] - from[i]) * n;
	    }
	
	    this._update(curr);
	    return this;
	  }
	
	  // objech
	  for (var k in from) {
	    curr[k] = from[k] + (to[k] - from[k]) * n;
	  }
	
	  this._update(curr);
	  return this;
	};
	
	/**
	 * Set update function to `fn` or
	 * when no argument is given this performs
	 * a "step".
	 *
	 * @param {Function} fn
	 * @return {Tween} self
	 * @api public
	 */
	
	Tween.prototype.update = function(fn){
	  if (0 == arguments.length) return this.step();
	  this._update = fn;
	  return this;
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */
	
	var type;
	try {
	  type = __webpack_require__(26);
	} catch (_) {
	  type = __webpack_require__(26);
	}
	
	/**
	 * Module exports.
	 */
	
	module.exports = clone;
	
	/**
	 * Clones objects.
	 *
	 * @param {Mixed} any object
	 * @api public
	 */
	
	function clone(obj){
	  switch (type(obj)) {
	    case 'object':
	      var copy = {};
	      for (var key in obj) {
	        if (obj.hasOwnProperty(key)) {
	          copy[key] = clone(obj[key]);
	        }
	      }
	      return copy;
	
	    case 'array':
	      var copy = new Array(obj.length);
	      for (var i = 0, l = obj.length; i < l; i++) {
	        copy[i] = clone(obj[i]);
	      }
	      return copy;
	
	    case 'regexp':
	      // from millermedeiros/amd-utils - MIT
	      var flags = '';
	      flags += obj.multiline ? 'm' : '';
	      flags += obj.global ? 'g' : '';
	      flags += obj.ignoreCase ? 'i' : '';
	      return new RegExp(obj.source, flags);
	
	    case 'date':
	      return new Date(obj.getTime());
	
	    default: // string, number, boolean, …
	      return obj;
	  }
	}


/***/ },
/* 26 */
/***/ function(module, exports) {

	/**
	 * toString ref.
	 */
	
	var toString = Object.prototype.toString;
	
	/**
	 * Return the type of `val`.
	 *
	 * @param {Mixed} val
	 * @return {String}
	 * @api public
	 */
	
	module.exports = function(val){
	  switch (toString.call(val)) {
	    case '[object Date]': return 'date';
	    case '[object RegExp]': return 'regexp';
	    case '[object Arguments]': return 'arguments';
	    case '[object Array]': return 'array';
	    case '[object Error]': return 'error';
	  }
	
	  if (val === null) return 'null';
	  if (val === undefined) return 'undefined';
	  if (val !== val) return 'nan';
	  if (val && val.nodeType === 1) return 'element';
	
	  val = val.valueOf
	    ? val.valueOf()
	    : Object.prototype.valueOf.apply(val)
	
	  return typeof val;
	};


/***/ },
/* 27 */
/***/ function(module, exports) {

	
	// easing functions from "Tween.js"
	
	exports.linear = function(n){
	  return n;
	};
	
	exports.inQuad = function(n){
	  return n * n;
	};
	
	exports.outQuad = function(n){
	  return n * (2 - n);
	};
	
	exports.inOutQuad = function(n){
	  n *= 2;
	  if (n < 1) return 0.5 * n * n;
	  return - 0.5 * (--n * (n - 2) - 1);
	};
	
	exports.inCube = function(n){
	  return n * n * n;
	};
	
	exports.outCube = function(n){
	  return --n * n * n + 1;
	};
	
	exports.inOutCube = function(n){
	  n *= 2;
	  if (n < 1) return 0.5 * n * n * n;
	  return 0.5 * ((n -= 2 ) * n * n + 2);
	};
	
	exports.inQuart = function(n){
	  return n * n * n * n;
	};
	
	exports.outQuart = function(n){
	  return 1 - (--n * n * n * n);
	};
	
	exports.inOutQuart = function(n){
	  n *= 2;
	  if (n < 1) return 0.5 * n * n * n * n;
	  return -0.5 * ((n -= 2) * n * n * n - 2);
	};
	
	exports.inQuint = function(n){
	  return n * n * n * n * n;
	}
	
	exports.outQuint = function(n){
	  return --n * n * n * n * n + 1;
	}
	
	exports.inOutQuint = function(n){
	  n *= 2;
	  if (n < 1) return 0.5 * n * n * n * n * n;
	  return 0.5 * ((n -= 2) * n * n * n * n + 2);
	};
	
	exports.inSine = function(n){
	  return 1 - Math.cos(n * Math.PI / 2 );
	};
	
	exports.outSine = function(n){
	  return Math.sin(n * Math.PI / 2);
	};
	
	exports.inOutSine = function(n){
	  return .5 * (1 - Math.cos(Math.PI * n));
	};
	
	exports.inExpo = function(n){
	  return 0 == n ? 0 : Math.pow(1024, n - 1);
	};
	
	exports.outExpo = function(n){
	  return 1 == n ? n : 1 - Math.pow(2, -10 * n);
	};
	
	exports.inOutExpo = function(n){
	  if (0 == n) return 0;
	  if (1 == n) return 1;
	  if ((n *= 2) < 1) return .5 * Math.pow(1024, n - 1);
	  return .5 * (-Math.pow(2, -10 * (n - 1)) + 2);
	};
	
	exports.inCirc = function(n){
	  return 1 - Math.sqrt(1 - n * n);
	};
	
	exports.outCirc = function(n){
	  return Math.sqrt(1 - (--n * n));
	};
	
	exports.inOutCirc = function(n){
	  n *= 2
	  if (n < 1) return -0.5 * (Math.sqrt(1 - n * n) - 1);
	  return 0.5 * (Math.sqrt(1 - (n -= 2) * n) + 1);
	};
	
	exports.inBack = function(n){
	  var s = 1.70158;
	  return n * n * (( s + 1 ) * n - s);
	};
	
	exports.outBack = function(n){
	  var s = 1.70158;
	  return --n * n * ((s + 1) * n + s) + 1;
	};
	
	exports.inOutBack = function(n){
	  var s = 1.70158 * 1.525;
	  if ( ( n *= 2 ) < 1 ) return 0.5 * ( n * n * ( ( s + 1 ) * n - s ) );
	  return 0.5 * ( ( n -= 2 ) * n * ( ( s + 1 ) * n + s ) + 2 );
	};
	
	exports.inBounce = function(n){
	  return 1 - exports.outBounce(1 - n);
	};
	
	exports.outBounce = function(n){
	  if ( n < ( 1 / 2.75 ) ) {
	    return 7.5625 * n * n;
	  } else if ( n < ( 2 / 2.75 ) ) {
	    return 7.5625 * ( n -= ( 1.5 / 2.75 ) ) * n + 0.75;
	  } else if ( n < ( 2.5 / 2.75 ) ) {
	    return 7.5625 * ( n -= ( 2.25 / 2.75 ) ) * n + 0.9375;
	  } else {
	    return 7.5625 * ( n -= ( 2.625 / 2.75 ) ) * n + 0.984375;
	  }
	};
	
	exports.inOutBounce = function(n){
	  if (n < .5) return exports.inBounce(n * 2) * .5;
	  return exports.outBounce(n * 2 - 1) * .5 + .5;
	};
	
	// aliases
	
	exports['in-quad'] = exports.inQuad;
	exports['out-quad'] = exports.outQuad;
	exports['in-out-quad'] = exports.inOutQuad;
	exports['in-cube'] = exports.inCube;
	exports['out-cube'] = exports.outCube;
	exports['in-out-cube'] = exports.inOutCube;
	exports['in-quart'] = exports.inQuart;
	exports['out-quart'] = exports.outQuart;
	exports['in-out-quart'] = exports.inOutQuart;
	exports['in-quint'] = exports.inQuint;
	exports['out-quint'] = exports.outQuint;
	exports['in-out-quint'] = exports.inOutQuint;
	exports['in-sine'] = exports.inSine;
	exports['out-sine'] = exports.outSine;
	exports['in-out-sine'] = exports.inOutSine;
	exports['in-expo'] = exports.inExpo;
	exports['out-expo'] = exports.outExpo;
	exports['in-out-expo'] = exports.inOutExpo;
	exports['in-circ'] = exports.inCirc;
	exports['out-circ'] = exports.outCirc;
	exports['in-out-circ'] = exports.inOutCirc;
	exports['in-back'] = exports.inBack;
	exports['out-back'] = exports.outBack;
	exports['in-out-back'] = exports.inOutBack;
	exports['in-bounce'] = exports.inBounce;
	exports['out-bounce'] = exports.outBounce;
	exports['in-out-bounce'] = exports.inOutBounce;


/***/ },
/* 28 */
/***/ function(module, exports) {

	/**
	 * Expose `requestAnimationFrame()`.
	 */
	
	exports = module.exports = window.requestAnimationFrame
	  || window.webkitRequestAnimationFrame
	  || window.mozRequestAnimationFrame
	  || fallback;
	
	/**
	 * Fallback implementation.
	 */
	
	var prev = new Date().getTime();
	function fallback(fn) {
	  var curr = new Date().getTime();
	  var ms = Math.max(0, 16 - (curr - prev));
	  var req = setTimeout(fn, ms);
	  prev = curr;
	  return req;
	}
	
	/**
	 * Cancel.
	 */
	
	var cancel = window.cancelAnimationFrame
	  || window.webkitCancelAnimationFrame
	  || window.mozCancelAnimationFrame
	  || window.clearTimeout;
	
	exports.cancel = function(id){
	  cancel.call(window, id);
	};


/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports = throttle;
	
	/**
	 * Returns a new function that, when invoked, invokes `func` at most once per `wait` milliseconds.
	 *
	 * @param {Function} func Function to wrap.
	 * @param {Number} wait Number of milliseconds that must elapse between `func` invocations.
	 * @return {Function} A new function that wraps the `func` function passed in.
	 */
	
	function throttle (func, wait) {
	  var ctx, args, rtn, timeoutID; // caching
	  var last = 0;
	
	  return function throttled () {
	    ctx = this;
	    args = arguments;
	    var delta = new Date() - last;
	    if (!timeoutID)
	      if (delta >= wait) call();
	      else timeoutID = setTimeout(call, wait - delta);
	    return rtn;
	  };
	
	  function call () {
	    timeoutID = 0;
	    last = +new Date();
	    rtn = func.apply(ctx, args);
	    ctx = null;
	    args = null;
	  }
	}


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var detect = __webpack_require__(10)
	var has3d = detect.has3d
	var transform = detect.transform
	
	/**
	 * Handlebar contructor
	 *
	 * @param {Element} scrollable
	 * @contructor
	 * @api public
	 */
	function handlebar(scrollable) {
	  var el = this.el = document.createElement('div')
	  el.className = 'iscroll-handlebar'
	  scrollable.appendChild(el)
	}
	
	/**
	 * Show the handlebar and resize it
	 *
	 * @param {Number} h
	 * @api public
	 */
	handlebar.prototype.resize = function (h) {
	  var s = this.el.style
	  s.height = h + 'px'
	  s.backgroundColor = 'rgba(0,0,0,0.3)'
	}
	
	/**
	 * Hide this handlebar
	 *
	 * @api public
	 */
	handlebar.prototype.hide = function () {
	  this.el.style.backgroundColor = 'transparent'
	}
	
	/**
	 * Move handlebar by translateY
	 *
	 * @param {Number} y
	 * @api public
	 */
	handlebar.prototype.translateY= function(y){
	  var s = this.el.style
	  if (has3d) {
	    s[transform] = 'translate3d(0, ' + y + 'px' + ', 0)'
	  } else {
	    s[transform] = 'translateY(' + y + 'px)'
	  }
	}
	
	module.exports = handlebar


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var classes = __webpack_require__(32)
	var domify = __webpack_require__(7)
	var once = __webpack_require__(34)
	var template = __webpack_require__(36)
	
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
	  this.el = el
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


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */
	
	var index = __webpack_require__(33);
	
	/**
	 * Whitespace regexp.
	 */
	
	var re = /\s+/;
	
	/**
	 * toString reference.
	 */
	
	var toString = Object.prototype.toString;
	
	/**
	 * Wrap `el` in a `ClassList`.
	 *
	 * @param {Element} el
	 * @return {ClassList}
	 * @api public
	 */
	
	module.exports = function(el){
	  return new ClassList(el);
	};
	
	/**
	 * Initialize a new ClassList for `el`.
	 *
	 * @param {Element} el
	 * @api private
	 */
	
	function ClassList(el) {
	  if (!el || !el.nodeType) {
	    throw new Error('A DOM element reference is required');
	  }
	  this.el = el;
	  this.list = el.classList;
	}
	
	/**
	 * Add class `name` if not already present.
	 *
	 * @param {String} name
	 * @return {ClassList}
	 * @api public
	 */
	
	ClassList.prototype.add = function(name){
	  // classList
	  if (this.list) {
	    this.list.add(name);
	    return this;
	  }
	
	  // fallback
	  var arr = this.array();
	  var i = index(arr, name);
	  if (!~i) arr.push(name);
	  this.el.className = arr.join(' ');
	  return this;
	};
	
	/**
	 * Remove class `name` when present, or
	 * pass a regular expression to remove
	 * any which match.
	 *
	 * @param {String|RegExp} name
	 * @return {ClassList}
	 * @api public
	 */
	
	ClassList.prototype.remove = function(name){
	  if ('[object RegExp]' == toString.call(name)) {
	    return this.removeMatching(name);
	  }
	
	  // classList
	  if (this.list) {
	    this.list.remove(name);
	    return this;
	  }
	
	  // fallback
	  var arr = this.array();
	  var i = index(arr, name);
	  if (~i) arr.splice(i, 1);
	  this.el.className = arr.join(' ');
	  return this;
	};
	
	/**
	 * Remove all classes matching `re`.
	 *
	 * @param {RegExp} re
	 * @return {ClassList}
	 * @api private
	 */
	
	ClassList.prototype.removeMatching = function(re){
	  var arr = this.array();
	  for (var i = 0; i < arr.length; i++) {
	    if (re.test(arr[i])) {
	      this.remove(arr[i]);
	    }
	  }
	  return this;
	};
	
	/**
	 * Toggle class `name`, can force state via `force`.
	 *
	 * For browsers that support classList, but do not support `force` yet,
	 * the mistake will be detected and corrected.
	 *
	 * @param {String} name
	 * @param {Boolean} force
	 * @return {ClassList}
	 * @api public
	 */
	
	ClassList.prototype.toggle = function(name, force){
	  // classList
	  if (this.list) {
	    if ("undefined" !== typeof force) {
	      if (force !== this.list.toggle(name, force)) {
	        this.list.toggle(name); // toggle again to correct
	      }
	    } else {
	      this.list.toggle(name);
	    }
	    return this;
	  }
	
	  // fallback
	  if ("undefined" !== typeof force) {
	    if (!force) {
	      this.remove(name);
	    } else {
	      this.add(name);
	    }
	  } else {
	    if (this.has(name)) {
	      this.remove(name);
	    } else {
	      this.add(name);
	    }
	  }
	
	  return this;
	};
	
	/**
	 * Return an array of classes.
	 *
	 * @return {Array}
	 * @api public
	 */
	
	ClassList.prototype.array = function(){
	  var className = this.el.getAttribute('class') || '';
	  var str = className.replace(/^\s+|\s+$/g, '');
	  var arr = str.split(re);
	  if ('' === arr[0]) arr.shift();
	  return arr;
	};
	
	/**
	 * Check if class `name` is present.
	 *
	 * @param {String} name
	 * @return {ClassList}
	 * @api public
	 */
	
	ClassList.prototype.has =
	ClassList.prototype.contains = function(name){
	  return this.list
	    ? this.list.contains(name)
	    : !! ~index(this.array(), name);
	};


/***/ },
/* 33 */
/***/ function(module, exports) {

	module.exports = function(arr, obj){
	  if (arr.indexOf) return arr.indexOf(obj);
	  for (var i = 0; i < arr.length; ++i) {
	    if (arr[i] === obj) return i;
	  }
	  return -1;
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var wrappy = __webpack_require__(35)
	module.exports = wrappy(once)
	
	once.proto = once(function () {
	  Object.defineProperty(Function.prototype, 'once', {
	    value: function () {
	      return once(this)
	    },
	    configurable: true
	  })
	})
	
	function once (fn) {
	  var f = function () {
	    if (f.called) return f.value
	    f.called = true
	    return f.value = fn.apply(this, arguments)
	  }
	  f.called = false
	  return f
	}


/***/ },
/* 35 */
/***/ function(module, exports) {

	// Returns a wrapper function that returns a wrapped callback
	// The wrapper function should do some stuff, and return a
	// presumably different callback function.
	// This makes sure that own properties are retained, so that
	// decorations and such are not lost along the way.
	module.exports = wrappy
	function wrappy (fn, cb) {
	  if (fn && cb) return wrappy(fn)(cb)
	
	  if (typeof fn !== 'function')
	    throw new TypeError('need wrapper function')
	
	  Object.keys(fn).forEach(function (k) {
	    wrapper[k] = fn[k]
	  })
	
	  return wrapper
	
	  function wrapper() {
	    var args = new Array(arguments.length)
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i]
	    }
	    var ret = fn.apply(this, args)
	    var cb = args[args.length-1]
	    if (typeof ret === 'function' && ret !== cb) {
	      Object.keys(cb).forEach(function (k) {
	        ret[k] = cb[k]
	      })
	    }
	    return ret
	  }
	}


/***/ },
/* 36 */
/***/ function(module, exports) {

	module.exports = "<div class=\"ptr_box\">\n  <div class=\"ptr_container\">\n    <div class=\"ptr_image\"></div>\n    <div class=\"ptr_text\">下拉刷新</div>\n  </div>\n</div>\n";

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map