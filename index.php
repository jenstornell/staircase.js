
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

<button class="add">Add</button>
<button class="delete">Delete</button>
<button class="rename">Rename</button>
<button class="open">Open</button>
<button class="close">Close</button>
<button class="select">Select</button>
<button class="deselect">Deselect</button>

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
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelector('.add').addEventListener('click', (e) => {
      staircase.add('/', 'callback_rootfilename.txt', 'file');
      staircase.add('/', 'callback_rootfolder', 'folder');
      staircase.add('/', 'aaa', 'file');
      staircase.add('/', 'bbb', 'folder');
    });

    document.querySelector('.delete').addEventListener('click', (e) => {
      staircase.delete('folder1/subfolder', 'folder');
    });

    document.querySelector('.rename').addEventListener('click', (e) => {
      staircase.rename('folder1/subfolder', 'new_foldername', 'folder');
    });

    document.querySelector('.open').addEventListener('click', (e) => {
      staircase.open('folder2/folder3');
    });

    document.querySelector('.close').addEventListener('click', (e) => {
      staircase.close('folder1/subfolder', 'folder');
    });

    document.querySelector('.select').addEventListener('click', (e) => {
      staircase.select('folder1/subfolder', 'folder');
    });

    document.querySelector('.deselect').addEventListener('click', (e) => {
      staircase.deselect('folder1/subfolder', 'folder');
    });
  });
</script>

</body>
</html>
