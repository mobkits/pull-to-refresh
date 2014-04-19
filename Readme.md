# Pull-to-refresh

  A pull to refresh component.

  [demo](http://chemzqm.github.io/pull-to-refresh).

  **works on touch device only**


## Installation

  Install with [component(1)](http://component.io):

    $ component install chemzqm/pull-to-refresh

## API

``` html
<div id="demo">
  <div class="ptr_scrollable">
    <div class="ptr_wrap">
      <ul>
        <li></li>
      </ul>
    <div>
  </div>
```
* dom tree should like this, `#demo` is used to define the scroll area.

### ptr(el, callback)

* `callback` is called when loading start, the first argument which is a callback function should be called after the dom prepend to the list.

## License

  The MIT License (MIT)
