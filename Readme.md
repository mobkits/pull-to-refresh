# Pull-to-refresh

  A pull to refresh component for user loves elegence solution.

  [demo](http://chemzqm.github.io/pull-to-refresh).

  **works on ios touch device only**

  Tip: Avoid to use transition with dragging.

## Features

* origin scroll, better performance.
* optional options for setting texts and timeout.
* call refresh as you need.
* simplified code and API.

## Installation

  Install with [component(1)](http://component.io):

    $ component install chemzqm/pull-to-refresh

## Example

``` html
<div id="demo" class="ptr_scrollable">
  <div class="ptr_wrap">
    <ul>
      <li></li>
    </ul>
  <div>
</div>
```
* dom tree should like this, `#demo` is used to define the scroll area.

``` js
  var el = document.getElementById('demo');
  var ptr = require('pull-to-refresh');
  var domify = require('domify');
  var list =el.querySelector('.content');
  var my_ptr = ptr(el, function(cb) {
      ajax_and_prepend_dom( )//load your data and append them to the list
      cb(); //don't forget to call callback!
    }, 1000);
  });
```

## API

### ptr(el, [option], callback)

* `callback` is called when loading start, the first argument which is a callback function should be called after the dom prepend to the list.
* `option` object could contain `PULL_TEXT` `RELEASE_TEXT` `LOADING_TEXT` and `timeout` for the request timeout in millisecond.

### .refresh()

Perform refresh (with animation scroll to top at first).

## License

  The MIT License (MIT)
