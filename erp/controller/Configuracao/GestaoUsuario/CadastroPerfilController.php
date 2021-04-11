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

$svc = new PerfilService();
$svcPerfilFuncionalidade = new PerfilFuncionalidadeService();
$svcPerfilUsuario = new PerfilUsuarioService();

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

else if($op == 'getListaFuncionalidadePerfilUsuario'){
	$cdPerfil = '';
	
	if (isset($_GET['cdPerfil'])) {
		$cdPerfil = trim($_GET['cdPerfil']);
	}

	$query = '';
	$query = $query . ' SELECT P.CD_PERFIL,F.CD_FUNCIONALIDADE,F.DS_FUNCIONALIDADE';
	$query = $query . '   FROM perfil_funcionalidade P';
	$query = $query . '   JOIN funcionalidade F ON P.CD_FUNCIONALIDADE=F.CD_FUNCIONALIDADE';
	$query = $query . " WHERE F.SN_ATIVO = 'S'";
	if ($cdPerfil != ""){
		$query = $query . ' AND P.CD_PERFIL = '.$cdPerfil;
	}
	$query = $query . '  ORDER BY F.DS_FUNCIONALIDADE';
	
	$elmnts = $svc->getBySelect($query);
	$json = json_encode($elmnts);
	print("{\"totalCount\":".$svc->getTotal().", \"items\": ".$json."}");
}

else if($op == "inserirFuncionalidadePerfilUsuario")  {
	$data = json_decode(file_get_contents('php://input'));
	# verificar se já foi cadastrada esta funcionalidade
	$query = "SELECT CD_PERFIL FROM perfil_funcionalidade
			WHERE CD_PERFIL = ".$data->{'CD_PERFIL'}." AND CD_FUNCIONALIDADE=".$data->{'CD_FUNCIONALIDADE'};
	$elmntsExisteItem = $svcPerfilFuncionalidade->getBySelect($query,false);
		
	if (count($elmntsExisteItem) == 0) {
		$elmnt = new PerfilFuncionalidadeVO();
		$elmnt->CD_PERFIL = $data->{'CD_PERFIL'};
		$elmnt->CD_FUNCIONALIDADE = $data->{'CD_FUNCIONALIDADE'};
		
		$db = Zend_Db_Table::getDefaultAdapter();
		$db->beginTransaction();	
		try {	
			//Cadastra a funcionalidade do perfil
			$svcPerfilFuncionalidade->inserir($elmnt); 
			
			$db->commit();	
			$json = json_encode($elmnt);
			print("{\"success\":true".", \"items\": ".$json."}");
		} catch (Zend_Exception $e) {
			$db->rollBack();
			print("{\"success\":false".", \"errorType\":'general'".", \"message\": \"".$e->getMessage()."\"}");
		}  
	}
	else {
		$json = json_encode($elmntsExisteItem);
		print("{\"success\":true".", \"items\": ".$json."}");		
	}	
}

else if($op == 'excluirFuncionalidadePerfilUsuario'){
	$db = Zend_Db_Table::getDefaultAdapter();
	$db->beginTransaction();
	try {	
		//Exclui o a funcionalidade do perfil
		$svcPerfilFuncionalidade->excluir($_POST['cdPerfil'], $_POST['cdFuncionalidade']); 
		$db->commit();	
		print("{\"success\":true"."}");
	} catch (Zend_Exception $e) {
		$db->rollBack();
		print("{\"success\":false".", \"errorType\":'general'".", \"message\": \"".$e->getMessage()."\"}");
	}    
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
	$query = $query . ' SELECT CD_FUNCIONALIDADE';
	$query = $query . '       ,DS_FUNCIONALIDADE';
	$query = $query . '   FROM funcionalidade';
	$query = $query . '  WHERE SN_ATIVO = "S"';
	if ($cdFuncionalidade != ""){
		$query = $query . '  AND CD_FUNCIONALIDADE = '.$cdFuncionalidade;
	} else if ($dsFuncionalidade != ""){
		$query = $query . '  AND DS_FUNCIONALIDADE LIKE "%'.$dsFuncionalidade.'%"';
	}
	$query = $query . "  AND CD_FUNCIONALIDADE IN 
							(SELECT DISTINCT CD_FUNCIONALIDADE 
								FROM empresa_software es
								JOIN software_funcionalidade sf ON sf.CD_SOFTWARE = es.CD_SOFTWARE
						WHERE es.CD_EMPRESA = ".$_SESSION['CD_EMPRESA'].")";
	$query = $query . '  ORDER BY DS_FUNCIONALIDADE';
	
	$elmnts = $svc->getBySelect($query);
	$json = json_encode($elmnts);
	print("{\"totalCount\":".$svc->getTotal().", \"items\": ".$json."}");
}

else if($op == 'getListaPerfil'){
	$cdPerfil = '';
	$dsPerfil = '';

	if (isset($_GET['cdPerfil'])) {
		$cdPerfil = trim($_GET['cdPerfil']);
	}
	if (isset($_GET['dsPerfil'])) {
		$dsPerfil = strtoupper(trim($_GET['dsPerfil']));
	}

	$query = '';
	$query = $query . ' SELECT CD_PERFIL';
	$query = $query . '       ,DS_PERFIL';
	$query = $query . '       ,SN_ATIVO';
	$query = $query . '       ,CD_EMPRESA';
	$query = $query . '   FROM perfil';
	$query = $query . '  WHERE CD_EMPRESA = '.$_SESSION['CD_EMPRESA'];
	if ($cdPerfil != ""){
		$query = $query . '  AND CD_PERFIL = '.$cdPerfil;
	}
	if ($dsPerfil != ""){
		$query = $query . '  AND DS_PERFIL LIKE "%'.$dsPerfil.'%"';
	}	

	$elmnts = $svc->getBySelect($query);
	$json = json_encode($elmnts);
	print("{\"totalCount\":".$svc->getTotal().", \"items\": ".$json."}");
}

else if($op == 'inserir'){
	$data = json_decode(file_get_contents('php://input'));
	$elmnt = new PerfilVO();
	$elmnt->CD_PERFIL = $data->{'CD_PERFIL'};
	$elmnt->DS_PERFIL = $data->{'DS_PERFIL'};
	$elmnt->SN_ATIVO = $data->{'SN_ATIVO'};
	$elmnt->CD_EMPRESA = $_SESSION['CD_EMPRESA'];
 	
	$db = Zend_Db_Table::getDefaultAdapter();
	$db->beginTransaction();	
	try {	

		//Cadastra o perfil
		$svc->inserir($elmnt); 
		$elmnt->CD_PERFIL = $svc->getLastInsertId(); 
		
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
	$elmnt = $svc->getVOByCD($data->{'CD_PERFIL'});
	//$elmnt->CD_PERFIL = $data->{'CD_PERFIL'};
	$elmnt->DS_PERFIL = $data->{'DS_PERFIL'};
	$elmnt->SN_ATIVO = $data->{'SN_ATIVO'};
	$elmnt->CD_EMPRESA = $_SESSION['CD_EMPRESA'];
 	
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
		print("{\"success\":false".", \"errorType\":'general'".", \"message\": \"".$e->getMessage()."\"}");
	}    
}
  
else if($op == 'excluir'){
	$db = Zend_Db_Table::getDefaultAdapter();
	$db->beginTransaction();	
	try {	
		# Excluir todas as funcionalidades relacionadas com este perfil
		$deleteFuncionalidade = "DELETE FROM perfil_funcionalidade WHERE CD_PERFIL = ".$_POST['cdPerfil'];
		$svcPerfilFuncionalidade->getBySelect($deleteFuncionalidade,false);
	
		# Excluir todos os usuários relacionados com este perfil
		$deleteUsuario = "DELETE FROM perfil_usuario WHERE CD_PERFIL = ".$_POST['cdPerfil'];
		$svcPerfilUsuario->getBySelect($deleteUsuario,false);
		
		# Exclui o perfil
		$svc->excluir($_POST['cdPerfil']); 
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