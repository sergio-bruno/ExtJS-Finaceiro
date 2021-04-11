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

$svc = new SetorService();

if(isset($_GET['start'])){
	$svc->setInit($_GET['start']);
}
if(isset($_GET['limit'])){
	$svc->setCount($_GET['limit']);
}

if(isset($_GET['op'])){
	$op = $_GET['op'];
}

$erro = "Erro desconhecido.";

if($op == ""){
}

else if($op == 'getListaSetor'){
	$dsSetor = '';

	if (isset($_GET['dsSetor'])) {
		$dsSetor = strtoupper(trim($_GET['dsSetor']));
	}
	
	$query = "
			  SELECT CD_SETOR
					,DS_SETOR
                    ,SN_ATIVO
					,CD_EMPRESA
				FROM setor 
               WHERE CD_EMPRESA = ".$_SESSION['CD_EMPRESA'];
	
	if ($dsSetor != ""){
		$query = $query . '  AND DS_SETOR LIKE "%'.$dsSetor.'%"';
	}
     $query = $query . ' ORDER BY DS_SETOR';	

	try {
		$elmnts = $svc->getBySelect($query);
		$json = json_encode($elmnts);
		print("{\"totalCount\":".$svc->getTotal().", \"items\": ".$json."}");
	} catch (Zend_Exception $e) {
		print('
			{ 
				"success":false, 
				"message": {
					"status":"database",
					"statusText":" '.$e->getMessage().'"
				}
			}'
		);
	} 
}

else if($op == 'inserir'){
	$data =  json_decode($_POST['items']);
	$elmnt = new SetorVO();
	$elmnt->DS_SETOR = $data->{'DS_SETOR'};
	$elmnt->SN_ATIVO = $data->{'SN_ATIVO'};
	$elmnt->CD_EMPRESA = $_SESSION['CD_EMPRESA'];
	
	$db = Zend_Db_Table::getDefaultAdapter();
	$db->beginTransaction();	
	try {	

		//Cadastra o Planejamento
		$svc->inserir($elmnt); 
		$elmnt->CD_SETOR = $svc->getLastInsertId(); 
		
		$db->commit();	
		$json = json_encode($elmnt);
		print("{\"success\":true".", \"items\": ".$json."}");
		
	} catch (Zend_Exception $e) {
		$db->rollBack();
		print('
			{ 
				"success":false, 
				"message": {
					"status":"database",
					"statusText":" '.$e->getMessage().'"
				}
			}'
		);
	} 
}

else if($op == 'alterar'){
	$data =  json_decode($_POST['items']);
	$elmnt = $svc->getVOByCD($data->{'CD_SETOR'});
	$elmnt->DS_SETOR = $data->{'DS_SETOR'};
	$elmnt->SN_ATIVO = $data->{'SN_ATIVO'};
	$elmnt->CD_EMPRESA = $_SESSION['CD_EMPRESA'];
	
	$db = Zend_Db_Table::getDefaultAdapter();
	$db->beginTransaction();	
	try {	

			$svc->alterar($elmnt); 
			
			$db->commit();	
			$json = json_encode($elmnt);
			print("{\"success\":true".", \"items\": ".$json."}");
			
	} catch (Zend_Exception $e) {
		$db->rollBack();
		print('
			{ 
				"success":false, 
				"message": {
					"status":"database",
					"statusText":" '.$e->getMessage().'"
				}
			}'
		);
	}      
}

else if($op == 'excluir'){
	$data =  json_decode($_POST['items']);
	$db = Zend_Db_Table::getDefaultAdapter();
	$db->beginTransaction();	
	try {	
		$svc->excluir($data->{'CD_SETOR'});
		$db->commit();	
		print("{\"success\":true"."}");
	} catch (Zend_Exception $e) {
		$db->rollBack();
		print('
			{ 
				"success":false, 
				"message": {
					"status":"database",
					"statusText":" '.$e->getMessage().'"
				}
			}'
		);
	}     
}

else{
	print('
		{ 
			"success":false, 
			"message": {
				"status":"general",
				"statusText":"'.$erro.'"
			}
		}'
	);
}

?>