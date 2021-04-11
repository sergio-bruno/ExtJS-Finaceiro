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

$svc = new AreaAtuacaoService();

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

else if($op == 'getListaAreaAtuacao'){
	$dsAreaAtuacao = '';

	if (isset($_GET['dsAreaAtuacao'])) {
		$dsAreaAtuacao = strtoupper(trim($_GET['dsAreaAtuacao']));
	}
	
	$query = "SELECT CD_AREA_ATUACAO,
	                 DS_AREA_ATUACAO,
					 SN_ATIVO,
					 CD_EMPRESA	
			  FROM area_atuacao
              WHERE CD_EMPRESA = ".$_SESSION['CD_EMPRESA'];
	
	if ($dsAreaAtuacao != ""){
		$query = $query . '  AND DS_AREA_ATUACAO LIKE "%'.$dsAreaAtuacao.'%"';
	}	
    $query = $query . ' ORDER BY DS_AREA_ATUACAO';	
	 
	$elmnts = $svc->getBySelect($query);
	$json = json_encode($elmnts);
	print("{\"totalCount\":".$svc->getTotal().", \"items\": ".$json."}");
}

else if($op == 'inserir'){
	$data = json_decode(file_get_contents('php://input'));
	$elmnt = new AreaAtuacaoVO();
	$elmnt->DS_AREA_ATUACAO = $data->{'DS_AREA_ATUACAO'};
	$elmnt->CD_EMPRESA = $_SESSION['CD_EMPRESA'];
	$elmnt->SN_ATIVO = $data->{'SN_ATIVO'};
	
	$db = Zend_Db_Table::getDefaultAdapter();
	$db->beginTransaction();	
	try {	
		$svc->inserir($elmnt); 
		$elmnt->CD_AREA_ATUACAO = $svc->getLastInsertId(); 
		
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
	$elmnt = $svc->getVOByCD($data->{'CD_AREA_ATUACAO'});
	$elmnt->DS_AREA_ATUACAO = $data->{'DS_AREA_ATUACAO'};
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
		$svc->excluir($_POST['cdAreaAtuacao']); 
			
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