<?php
error_reporting(0); 
//error_reporting(E_ALL);
ini_set('display_errors', 'on');
session_start(); 
$utltimoCaracter = substr($_SERVER['DOCUMENT_ROOT'], -1);
if ( $utltimoCaracter == '/' ) {
	include_once($_SERVER['DOCUMENT_ROOT'].'eHoplon/InitZend.php');	
} else {
	include_once($_SERVER['DOCUMENT_ROOT'].'/eHoplon/InitZend.php');
}

function validaUsuario($usuario, $senha, $empresa) {
	/*
	# $conecta = mysql_connect("50.116.86.15", "h2lvc364_root", "lssg@0611") or print (mysql_error()); 
	# mysql_select_db("h2lvc364_hoplon", $conecta) or print(mysql_error()); 
	
	$conecta = mysql_connect("localhost", "root", "root") or print (mysql_error()); 
	mysql_select_db("h2lvc364_hoplon", $conecta) or print(mysql_error()); 
	
	
	$sql = "SELECT * FROM area_atuacao"; 
	$result = mysql_query($sql, $conecta); 
	while($consulta = mysql_fetch_array($result)) { 
	   print "Coluna1: $consulta[CD_AREA_ATUACAO] - Coluna2: $consulta[DS_AREA_ATUACAO]<br>"; 
	} 
	mysql_free_result($result); 
	mysql_close($conecta); 	
	die;
	*/

	$nusuario = addslashes($usuario);
	$nsenha = addslashes($senha);
  
	$svcUsuario = new UsuarioService();
	$query = "SELECT u.CD_USUARIO, u.NM_LOGIN, u.CD_EMPRESA, u.DS_SENHA, u.TP_NIVEL_ACESSO, e.NM_RAZAO_SOCIAL, e.NM_FANTASIA
	        FROM usuario u
			JOIN empresa e ON e.CD_EMPRESA = u.CD_EMPRESA
			WHERE u.NM_LOGIN = '".$nusuario."'
			AND u.DS_SENHA = '".md5($nsenha)."'
			AND u.CD_EMPRESA = ".$empresa;
	$elmnts = $svcUsuario->getBySelect($query,false);
	
	if (count($elmnts) > 0) {	
		$_SESSION['CD_USUARIO'] = $elmnts[0]['CD_USUARIO']; 
		$_SESSION['CD_EMPRESA'] = $elmnts[0]['CD_EMPRESA']; 
		$_SESSION['TP_NIVEL_ACESSO'] = $elmnts[0]['TP_NIVEL_ACESSO']; 
		$_SESSION['NM_LOGIN'] = $elmnts[0]['NM_LOGIN'];
		$_SESSION['NM_RAZAO_SOCIAL'] = $elmnts[0]['NM_RAZAO_SOCIAL'];
		$_SESSION['NM_FANTASIA'] = $elmnts[0]['NM_FANTASIA'];
		
		# Localizar o banco da empresa
		$svcEmpresa = new EmpresaService();
		$query = "SELECT CD_BANCO FROM empresa WHERE CD_EMPRESA = ".$empresa;
		$elmntsBanco = $svcEmpresa->getBySelect($query,false);
		if (count($elmntsBanco) > 0) {
			$_SESSION['CD_BANCO'] = $elmnts[0]['CD_BANCO'];
		} 
		return true;
	} else {
		return false;
	}
}

function protegePagina($urlRedirect = "login.php") {
	if (!isset($_SESSION['CD_USUARIO']) OR !isset($_SESSION['CD_EMPRESA'])) {
		expulsaVisitante($urlRedirect);
	}
}

function expulsaVisitante($urlRedirect = "login.php") {
	unset($_SESSION['CD_USUARIO'], $_SESSION['CD_EMPRESA'], $_SESSION['TP_NIVEL_ACESSO'], $_SESSION['NM_LOGIN'], $_SESSION['CD_BANCO']);
	header("Location: $urlRedirect");
}

?>