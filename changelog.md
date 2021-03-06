# Changelog

## 1.9

- Added `staircase.join()`
- Added `staircase.basename()`
- Added `staircase.dirname()`
- Change icons from FontAwesome to Remixicon
- Added `open` callback

## 1.8

- Switched from static class to const.
- Fixed bug with `staircase.deselect()`
- Fixed bug with `staircase.refresh()`
- Minor fixes

## 1.7

- Changed `staircase.delete(id)`, no need for type.
- Changed `staircase.add(id, type)`, shorter syntax.
- Changed `staircase.rename(id, new_name)`, no need for type.
- Changed `staircase.select(id, callback)`, no need for type.
- Changed `staircase.deselect(callback)`, no need for id or type.

## 1.6

- Bug fixes
- Added `callback` as third argument to `staircase.refresh()`

## 1.5

- Added staircase.refresh() method

## 1.4

- Minor CSS fixes.
- Rewritten syntax. Options is now added in html.
- Rewritten callback. Now you setup a class with callbacks.
- staircase.add()
- staircase.delete()
- staircase.open()
- staircase.close()
- staircase.sort()
- staircase.rename()
- staircase.select()
- staircase.deselect()

## 1.3

- Converted to ES6 javascript version.
- Changed syntax from `staircase.init();` to `staircase();`

## 1.2

- Fixed bug with callback that was called multiple times.
- Fixed the CSS to get better alignment.
- Changed the way to use callbacks. See docs.
- Added callback for toggling already loaded folders.

## 1.1

- Query selector does no longer affect data attributes outside of scope.
- Replaced `:scope` to get it work with Edge.
- Added `fetchParams` as option.

## 1.0

- Initial release