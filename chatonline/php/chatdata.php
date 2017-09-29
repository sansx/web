<?php
require_once 'config.php';
$conn = mysqli_connect(LINK,USER,PWD,DB);
if (!$conn) {
	die('链接失败'.mysqli_connect_error());
}

$user = $_POST['name'];
$info = $_POST['info'];
$num = $_POST['num'];
if ($user!=''&&$info!='') {
	$sql = "INSERT INTO chats (info,user) VALUES ('{$info}','{$user}')";
	
	$arr = array(
		'name'=>$user,
		'info'=>$info
		);
	if (mysqli_query($conn,$sql)) {
		echo '插入成功';
	}
	$aa = json_encode($arr);
	print_r($aa);
}

if($num!=''&&$num!='del'){
	$asql = "CREATE TABLE IF NOT EXISTS chats(
		id int(6) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
		info mediumtext NOT NULL,
		user VARCHAR(100) NOT NULL
		)CHARSET=UTF8";
	mysqli_query($conn,$asql);
	$sql = "SELECT * FROM chats WHERE id>'{$num}' AND user!='{$user}'";
	$result = mysqli_query($conn,$sql);
	$arr = array();
	if(mysqli_num_rows($result)>0){
		while ($row=mysqli_fetch_assoc($result)) {
			array_push($arr,array('info'=>"{$row['info']}"));
		}
		$aa = json_encode($arr);
		print_r($aa);
	}
}else if ($num=='del') {
	$sql = 'DROP TABLE chats';
	if(!mysqli_query($conn,$sql)){
		echo(mysqli_error());
	}else{
		echo '开始删除';
	}
	
}
