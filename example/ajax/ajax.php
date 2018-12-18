<?php
$post = json_decode(file_get_contents('php://input'), true);

$root = __DIR__ . '/../tree';

$path = ($post['id'] == '/') ? '' : '/' . $post['id'];
$glob = glob($root . $path . '/*');

if($glob) {
    foreach($glob as $item) {
        $suffix = (is_dir($item)) ? '/' : '';
        $data[] = basename($item) . $suffix;
    }
}

usleep(250000);

echo json_encode($data);