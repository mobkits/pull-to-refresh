# Pull-to-refresh

  [![Build Status](https://secure.travis-ci.org/chemzqm/pull-to-refresh.svg)](http://travis-ci.org/chemzqm/pull-to-refresh)
  [![Coverage Status](https://coveralls.io/repos/chemzqm/pull-to-refresh/badge.svg?branch=master&service=github)](https://coveralls.io/github/chemzqm/pull-to-refresh?branch=master)

  A pull to refresh component for developers who loves elegence solution.

  Now works with webpack and browserify, it's supposed to works with [iscroll-component](https://github.com/chemzqm/iscroll)

  To make them works reansonable, they are decoupled in 1.0.0

  [demo](http://chemzqm.github.io/pull-to-refresh).
  [code of demo](https://github.com/chemzqm/pull-to-refresh/blob/gh-pages/index.js)

## Features

* Call refresh as you need.
* Simplified code and API.
* Works with promise

## Installation

  Prefer to install with npm:

    $ npm install pull-to-refresh

  Install with [component(1)](http://component.io):

    $ component install chemzqm/pull-to-refresh

## Example
``` css
.scrollable {
  position: fixed;
  top: 50px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}
```
``` html
<div id="demo" class="scrollable">
  <div>
    <ul>
      <li></li>
    </ul>
  </div>
</div>
```

Notice the scrollable **must** have a single child for [iscroll-component](https://github.com/chemzqm/iscroll) to work

``` js
var el = document.getElementById('demo')
var Ptr = require('pull-to-refresh')
var is = Iscroll(el, { handlebar: true })
var ptr = new Ptr(el, function() {
    return ajax_and_prepend_dom( ) // refresh your data, should return promise
  })
})
```

You can think iscroll just add nagetive scrollTop value to the scrollable.

## API

### Ptr(el, [option], callback)

* `el` the scrollable element
* `callback` is called when loading start, the first argument which is a callback function should be called after the dom prepend to the list.
* `option.timeout` for the request timeout in millisecond.
* `option.template` contains a custom template(string or element) for the inserted element
* `option.timeout` millisecond of request timeout, default `10000`

### .refresh()

Perform refresh (with animation scroll to top at first).

### .unbind()

Unbind all event listeners

## License

  The MIT License (MIT)
