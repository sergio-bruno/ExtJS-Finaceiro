<?php
	require_once("seguranca.php");
	if ($_SERVER['REQUEST_METHOD'] == 'POST') {
		$usuario = (isset($_POST['usuario'])) ? $_POST['usuario'] : '';
		$senha = (isset($_POST['senha'])) ? $_POST['senha'] : '';
		$empresa = (isset($_POST['empresa'])) ? $_POST['empresa'] : '';
		if (validaUsuario($usuario, $senha, $empresa) == true) {
			header("Location: index.php");
		} else {
			expulsaVisitante();
		}
	}
?> 