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

$svc = new FuncionalidadeService();

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

else if($op == 'getListaFuncionalidade'){

	$cdFuncionalidade = '';
	$dsFuncionalidade = '';

	if (isset($_GET['cdFuncionalidade'])) {
		$cdFuncionalidade = trim($_GET['cdFuncionalidade']);
	}
	if (isset($_GET['dsFuncionalidade'])) {
		$dsFuncionalidade = strtoupper(trim($_GET['dsFuncionalidade']));
	}

	$query = '';
	$query = $query . ' SELECT P.CD_FUNCIONALIDADE';
	$query = $query . '       ,P.DS_FUNCIONALIDADE';
	$query = $query . '       ,P.DS_ID_FUNCIONALIDADE';
	$query = $query . '       ,P.SN_ATIVO';
	$query = $query . '   FROM funcionalidade P';
	$query = $query . '  WHERE 1 = 1';
	if ($cdFuncionalidade != ""){
		$query = $query . '  AND P.CD_FUNCIONALIDADE = '.$cdFuncionalidade;
	}
	if ($dsFuncionalidade != ""){
		$query = $query . '  AND P.DS_FUNCIONALIDADE LIKE "%'.$dsFuncionalidade.'%"';
	}	

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
	$elmnt = new FuncionalidadeVO();
	$elmnt->CD_FUNCIONALIDADE = $data->{'CD_FUNCIONALIDADE'};
	$elmnt->DS_FUNCIONALIDADE = $data->{'DS_FUNCIONALIDADE'};
	$elmnt->DS_ID_FUNCIONALIDADE = $data->{'DS_ID_FUNCIONALIDADE'};
	$elmnt->SN_ATIVO = $data->{'SN_ATIVO'};
 	
	$db = Zend_Db_Table::getDefaultAdapter();
	$db->beginTransaction();	
	try {	

		//Cadastra o perfil
		$svc->inserir($elmnt); 
		$elmnt->CD_FUNCIONALIDADE = $svc->getLastInsertId(); 
		
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
	$elmnt = $svc->getVOByCD($data->{'CD_FUNCIONALIDADE'});
	//$elmnt->CD_FUNCIONALIDADE = $data->{'CD_FUNCIONALIDADE'};
	$elmnt->DS_FUNCIONALIDADE = $data->{'DS_FUNCIONALIDADE'};
	$elmnt->DS_ID_FUNCIONALIDADE = $data->{'DS_ID_FUNCIONALIDADE'};
	$elmnt->SN_ATIVO = $data->{'SN_ATIVO'};
 	
	$db = Zend_Db_Table::getDefaultAdapter();
	$db->beginTransaction();	
	try {	

		//Altera o perfil
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

		//Exclui o perfil
		$svc->excluir($data->{'CD_FUNCIONALIDADE'}); 
		
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