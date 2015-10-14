
<?php
	session_start();
	$_SESSION["userId"] = $_POST['email'];
	$pass = $_POST['password'];
	$_SESSION['active-user']='yes';
// die();
echo "<script>window.top.location='../../index.php'</script>"
	//die();
//header('Location: www.google.cl');


?>