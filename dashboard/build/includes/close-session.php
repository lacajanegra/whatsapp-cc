
<?php
	session_start();
	$_SESSION['active-user']='no';
	session_destroy();
// die();
echo "<script>window.top.location='../../login.html'</script>"
	//die();
//header('Location: www.google.cl');


?>