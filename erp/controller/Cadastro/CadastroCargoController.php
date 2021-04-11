<?php
$utltimoCaracter = substr($_SERVER['DOCUMENT_ROOT'], -1);
if ( $utltimoCaracter == '/' ) {
	include_once($_SERVER['DOCUMENT_ROOT'].'eHoplon/erp/seguranca.php'); 
	include_once($_SERVER['DOCUMENT_ROOT'].'eHoplon/InitZend.php');	
} else {
	include_once($_SERVER['DOCUMENT_ROOT'].'/eHoplon/erp/seguranca.php'); 
	include_once($_SERVER['DOCUMENT_ROOT'].'/eHoplon/InitZend.php');
}
protegePagina("../../login.php");

error_reporting(E_ALL);
ini_set('display_errors', 'off');

$svc = new CargoService();

if(isset($_GET['start'])){
	$svc->setInit($_GET['start']);
}
if(isset($_GET['limit'])){
	$svc->setCount($_GET['limit']);
}

if(isset($_GET['op'])){
	$op = $_GET['op'];
}

$erro = "Erro desconhecido (funcao PHP não encontrada - ".$op.").";

if($op == ""){
}

else if($op == 'getListaCargo'){
	$dsCargo = '';

	if (isset($_GET['dsCargo'])) {
		$dsCargo = strtoupper(trim($_GET['dsCargo']));
	}
	
	$query = "SELECT CD_CARGO,
	                 DS_CARGO,
					 SN_ATIVO,
					 CD_EMPRESA	
			  FROM cargo
              WHERE CD_EMPRESA = ".$_SESSION['CD_EMPRESA'];
	
	if ($dsCargo != ""){
		$query = $query . '  AND DS_CARGO LIKE "%'.$dsCargo.'%"';
	}	
    $query = $query . ' ORDER BY DS_CARGO';	
	 
	$elmnts = $svc->getBySelect($query);
	$json = json_encode($elmnts);
	print("{\"totalCount\":".$svc->getTotal().", \"items\": ".$json."}");
}

else if($op == 'inserir'){
	$data = json_decode(file_get_contents('php://input'));
	$elmnt = new CargoVO();
	$elmnt->DS_CARGO = $data->{'DS_CARGO'};
	$elmnt->CD_EMPRESA = $_SESSION['CD_EMPRESA'];
	$elmnt->SN_ATIVO = $data->{'SN_ATIVO'};
	
	$db = Zend_Db_Table::getDefaultAdapter();
	$db->beginTransaction();	
	try {	
		$svc->inserir($elmnt); 
		$elmnt->CD_CARGO = $svc->getLastInsertId(); 
		
		$db->commit();	
		$json = json_encode($elmnt);
		print("{\"success\":true".", \"items\": ".$json."}");
	} catch (Zend_Exception $e) {
		$db->rollBack();
		print("{\"success\":false".", \"errorType\":'general'".", \"message\": \"".$e->getMessage()."\"}");
	}    
}

else if($op == 'alterar'){
	$data = json_decode(file_get_contents('php://input'));
	$elmnt = $svc->getVOByCD($data->{'CD_CARGO'});
	$elmnt->DS_CARGO = $data->{'DS_CARGO'};
	$elmnt->CD_EMPRESA = $_SESSION['CD_EMPRESA'];
	$elmnt->SN_ATIVO = $data->{'SN_ATIVO'};
	
	$db = Zend_Db_Table::getDefaultAdapter();
	$db->beginTransaction();	
	try {	
		$svc->alterar($elmnt); 
			
		$db->commit();	
		$json = json_encode($elmnt);
		print("{\"success\":true".", \"items\": ".$json."}");
	} catch (Zend_Exception $e) {
		$db->rollBack();
		print("{\"success\":false".", \"errorType\":'general'".", \"message\": \"".$e->getMessage()."\"}");
	}    
}

else if($op == 'excluir'){
	$db = Zend_Db_Table::getDefaultAdapter();
	$db->beginTransaction();	
	try {	
		$svc->excluir($_POST['cdCargo']); 
			
		$db->commit();	
		print("{\"success\":true"."}");
	} catch (Zend_Exception $e) {
		$db->rollBack();
		print("{\"success\":false".", \"errorType\":'general'".", \"message\": \"".$e->getMessage()."\"}");
	}    
}

else{
	print("'success': false,");
	print("'mensagem': $erro");
}

?>