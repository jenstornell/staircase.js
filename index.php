
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
      callback: function(el) {
          //console.log(el);
      }
  });
</script>

</body>
</html>
