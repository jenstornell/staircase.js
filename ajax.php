<?php
$post = json_decode(file_get_contents('php://input'), true);

switch($post['id']) {
    case '/':
        $data = [
            'my_folder2/',
            'my_folder/',
            'my_file2.png',
            'my_file1.txt',
        ];
        break;
    case 'my_folder':
        $data = [
            'subfile1.txt',
            'subfolder1/',
            'subfolder2/',
            'subfile2.png'
        ];
        break;
    case 'my_folder/subfolder1':
        $data = [
            'one.txt',
            'two/',
            'three/',
            'file.png'
        ];
        break;
}

usleep(250000);

echo json_encode($data);