<!DOCTYPE html>
<html >
	<head>
	  <meta charset="UTF-8">
	  <title>Formulário de Login</title>
		  <link rel="stylesheet" href="../resources/css/style.css">
	</head>
	<body>
		<html lang="en-US">
		<head>
			<meta charset="utf-8">
			<title>Login</title>
			<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:400,700">
		</head>
		<div id="login">
		<form name='form-login' method="post" action="valida.php">
			<span class="fontawesome-user"></span>
				<input type="text" id="user" placeholder="Username" name="usuario">
		   
			<span class="fontawesome-lock"></span>
				<input type="password" id"pass" placeholder="Password" name="senha">
			
			<input type="submit" value="Entrar">
		</form>
	</body>
</html>
