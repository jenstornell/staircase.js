
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>staircase.js - Demo</title>
  <link rel="stylesheet" href="assets/css/dist/staircase.min.css?t=<?= time(); ?>">
</head>
<body>

<stair-case></stair-case>

<script src="assets/js/src/staircase.js?t=<?= time(); ?>"></script>
<script>
  staircase.init({
    ajaxPath: 'example/ajax/ajax.php',
    selector: 'stair-case',
    callbacks: {
      select: function(args) {
        console.log(args);
      },
      load: function(args) {
        console.log(args);
      },
      toggle: function(args) {
        console.log(args);
      }
    }
  });
</script>

</body>
</html>
