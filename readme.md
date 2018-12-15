# staircase.js

Small ajax sidebar file tree browser without dependencies.

## In short

- Vanilla JS
- Zero dependencies
- Very small filesize
- Super simple setup
- Grouped files and folders
- Sorted files and folders
- Callback support

## Setup

### CSS

Put the CSS within `<head></head>`.

```html
<link rel="stylesheet" href="assets/css/dist/staircase.min.css">
```

## HTML

Put a `stair-case` element within `<body></body>`. You can change the element name with an option.

```html
<stair-case></stair-case>
```

### Javascript

Put the javascript before `</body>`.

```html
<script src="assets/js/src/staircase.js"></script>
<script>
  staircase.init();
</script>
```

## Options

All possible options in one go.

```js
staircase.init({
    ajaxPath: 'ajax.php',
    selector: 'stair-case',
    callbackActive: function(args) {
        console.log(args);
    },
    callbackAfterLoad: function(args) {
        console.log(args);
    }
});
```

### ajaxPath

Staircase requires ajax to work. To demonstrate how it works we will use PHP, in this case.

`ajaxPath` need a relative path to a file. In that file you can put something like below as a start.

```php
$post = json_decode(file_get_contents('php://input'), true);

print_r($post);

$data = [
    'one.txt',
    'two/',
    'three/',
    'file.png'
];

echo json_encode($data);
```

If you want to see that something really is loading with ajax, you can put the code below inside your PHP file. It will delay the result by 0.25 seconds.

```php
usleep(250000);
```

### selector

By default you add the custom element `<stair-case></stair-case>` to your HTML. With the option `selector` you can change `stair-case` to another selector.

### callbackActive

When you click a file or folder name it becomes active. If you add a callback function as an option you get access to some arguments.

**The `args` in this case contains these variables:**

- `id` is the file or folder path, something like `myfolder/myfile.txt`.
- `element` is the closest list element which also contains additional data to extract.
- `type` is the type like `file` or `folder`.

```js
callbackActive: function(args) {
    console.log(args);
},
```

### callbackAfterLoad

After a new list of files or folders has been loaded this callback is called if you have a function for it.

**The `args` in this case contains these variables:**

- `id` is the file or folder path, something like `myfolder/myfile.txt`.
- `element` is the closest list element which also contains additional data to extract.
- `success` is a check if the ajax has been loaded correctly. It contains `true` or `false`.

```js
callbackAfterLoad: function(args) {
    console.log(args);
}
```

## Help appreciated

You you want to help me improve staircase.js?

**I'm specially interested in these things:**

- Bug fixes if you find any.
- Enhancements and improvements that makes already existing things a bit better.
- Pull requests or code in an issue. Both are equally fine.

## Donate

Donate to [DevoneraAB](https://www.paypal.me/DevoneraAB) if you want.

## License

MIT