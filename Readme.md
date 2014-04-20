# Pull-to-refresh

  A pull to refresh component for user loves elegence solution.

  [demo](http://chemzqm.github.io/pull-to-refresh).

  **works on touch device only**

  Tip: Avoid to use transition with dragging.


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

### ptr(el, [option], callback)

* `callback` is called when loading start, the first argument which is a callback function should be called after the dom prepend to the list.
* `option` object could contain `PULL_TEXT` `RELEASE_TEXT` `LOADING_TEXT` and `timeout` for the request timeout in millisecond.

### .refresh()

handy API to perform refresh.

## License

  The MIT License (MIT)
