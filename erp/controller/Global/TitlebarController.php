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

else if($op == 'getUsuarioLogado') {
	$svc = new UsuarioService();
	try{
		$elmnt = $svc->getVOByCD($_SESSION['CD_USUARIO']);
		$json = json_encode($elmnt,false);
		print("{\"success\":true".", \"items\": ".$json."}");	
	} catch (Zend_Exception $e) {
		print("{\"success\":false".", \"errorType\":'general'".", \"message\": \"".$e->getMessage()."\"}");
	}
}

else if($op == 'setSetorLogado') {
	
	$_SESSION['CD_SETOR'] = $_POST['cdSetor'];
	
	$svc = new SetorService();
	try{
		$elmnt = $svc->getVOByCD($_SESSION['CD_SETOR']);
		$json = json_encode($elmnt);
		print("{\"success\":true".", \"items\": ".$json."}");	
	} catch (Zend_Exception $e) {
		print("{\"success\":false".", \"errorType\":'general'".", \"message\": \"".$e->getMessage()."\"}");
	}	
	
}

else if($op == 'getSetorLogado') {
	
	$svc = new SetorService();
	try{
		if (isset($_SESSION['CD_SETOR']) || $_SESSION['CD_SETOR'] != NULL) {
			$elmnt = $svc->getVOByCD($_SESSION['CD_SETOR']);
			$json = json_encode($elmnt);
			print("{\"success\":true".", \"items\": ".$json."}");
		} else {
			print(NULL);
		}
	} catch (Zend_Exception $e) {
		print("{\"success\":false".", \"errorType\":'general'".", \"message\": \"".$e->getMessage()."\"}");
	}
	
	//print($_SESSION['CD_SETOR']);
}

else if($op == 'getSetorUsuario') {
	
	$svc = new SetorService();
	if(isset($_GET['start'])){
		$svc->setInit($_GET['start']);
	}
	if(isset($_GET['limit'])){
		$svc->setCount($_GET['limit']);
	}
	
	$query = '';
	$query = $query . ' SELECT s.CD_SETOR';
	$query = $query . '       ,s.DS_SETOR';
	$query = $query . '   FROM setor s';
	$query = $query . '  WHERE s.SN_ATIVO = "S"';
	$query = $query . '    AND s.CD_SETOR IN (SELECT CD_SETOR FROM usuario_setor WHERE CD_USUARIO = '.$_SESSION['CD_USUARIO'].')';
	$query = $query . ' ORDER BY s.DS_SETOR';
	
	$elmnts = $svc->getBySelect($query,false);
	$json = json_encode($elmnts);
	print("{\"totalCount\":".$svc->getTotal().", \"items\": ".$json."}");
}

else{
	print("'success': false,");
	print("'mensagem': $erro");
}


?>