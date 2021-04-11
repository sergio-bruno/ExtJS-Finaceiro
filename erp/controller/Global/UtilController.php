<?php
$utltimoCaracter = substr($_SERVER['DOCUMENT_ROOT'], -1);
if ( $utltimoCaracter == '/' ) {
	include_once($_SERVER['DOCUMENT_ROOT'].'eHoplon/InitZend.php');	
	include_once($_SERVER['DOCUMENT_ROOT'].'eHoplon/erp/seguranca.php'); 
} else {
	include_once($_SERVER['DOCUMENT_ROOT'].'/eHoplon/InitZend.php');
	include_once($_SERVER['DOCUMENT_ROOT'].'/eHoplon/erp/seguranca.php'); 
}
protegePagina("../../login.php");

error_reporting(E_ALL);
ini_set('display_errors', 'off');

$op = $_GET['op'];

$erro = "Erro desconhecido.";

if($op == ""){
}
 
else if($op == 'verificarSessao') {
	//print($_SESSION["CD_USUARIO"]);die;
	if (!isset($_SESSION["CD_USUARIO"]) || $_SESSION["CD_USUARIO"] == '' || $_SESSION["CD_USUARIO"] == null) {
		print('false');
	} else {
		print('true');
	}
}

else if($op == 'getFuncionalidadeUsuario') {
	$svc = new FuncionalidadeService();
	if(isset($_GET['start'])){
		$svc->setInit($_GET['start']);
	}
	if(isset($_GET['limit'])){
		$svc->setCount($_GET['limit']);
	}
	
	if ($_SESSION['TP_NIVEL_ACESSO'] == 'A') {
		$query = " SELECT F.DS_ID_FUNCIONALIDADE
					 FROM funcionalidade F";
	} else {
		$query = " SELECT F.DS_ID_FUNCIONALIDADE
					 FROM funcionalidade F
						 JOIN perfil_funcionalidade PF ON PF.CD_FUNCIONALIDADE = F.CD_FUNCIONALIDADE
						 JOIN perfil_usuario PU ON PU.CD_PERFIL = PF.CD_PERFIL
					  AND PU.CD_USUARIO = ".$_SESSION['CD_USUARIO'];
	}
	
	$elmnts = $svc->getBySelect($query,false);
	$json = json_encode($elmnts);
	print("{\"totalCount\":".$svc->getTotal().", \"items\": ".$json."}");
}

else{
	print("'success': false,");
	print("'mensagem': $erro");
}


?>