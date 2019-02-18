
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>staircase.js - Demo</title>
  <link rel="stylesheet" href="assets/css/dist/staircase.min.css?t=<?= time(); ?>">
</head>
<body data-staircase-selector="stair-case">

<stair-case data-staircase-path="example/ajax/ajax.php"></stair-case>

<button class="add">Add to root</button>
<button class="delete-root">Delete root</button>
<button class="rename-root">Rename root</button>
<button class="open">Open</button>
<button class="close">Close</button>
<button class="select-root">Select root</button>
<button class="deselect-root">Deselect root</button>
<button class="refresh-root">Refresh root</button>
<button class="refresh-child">Refresh child</button>

<script src="assets/js/dist/staircase.js?t=<?= time(); ?>"></script>
<script>
  class StaircaseCallbacks {
    load(params) {
      //console.log(params);
    }
    toggle(params) {
      //console.log(params);
    }
    select(params) {
      //console.log(params);
    }
    open(params) {
      console.log(params);
      staircase.select(params.id + '/filder3.txd');
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelector('.add').addEventListener('click', (e) => {
      staircase.add('new_file.txt', 'file');
      staircase.add('new_folder', 'folder');
    });

    document.querySelector('.delete-root').addEventListener('click', (e) => {
      staircase.delete('folder1');
    });

    document.querySelector('.rename-root').addEventListener('click', (e) => {
      staircase.rename('folder1', 'new_name');
    });

    document.querySelector('.open').addEventListener('click', (e) => {
      staircase.open('folder2/folder3');
    });

    document.querySelector('.close').addEventListener('click', (e) => {
      staircase.close('folder1/subfolder', 'folder');
    });

    document.querySelector('.select-root').addEventListener('click', (e) => {
      staircase.select('folder1');
    });

    document.querySelector('.deselect-root').addEventListener('click', (e) => {
      staircase.deselect('folder1');
    });

    document.querySelector('.refresh-root').addEventListener('click', (e) => {
      staircase.refresh('folder1');
    });

    document.querySelector('.refresh-child').addEventListener('click', (e) => {
      staircase.refresh('folder1/subfolder');
    });
  });
</script>

</body>
</html>
