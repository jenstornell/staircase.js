<?php
$post = json_decode(file_get_contents('php://input'), true);

switch($post['id']) {
    case '/':
        $data = [
            'my_folder/',
            'my_folder2/',
            'my_file1.txt',
            'my_file2.png'
        ];
        break;
    case 'my_folder':
        $data = [
            'subfolder1/',
            'subfolder2/',
            'subfile1.txt',
            'subfile2.png'
        ];
        break;
}

echo json_encode($data);