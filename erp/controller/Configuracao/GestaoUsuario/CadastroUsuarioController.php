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

$svc = new UsuarioService();
$svcPerfilUsuario = new PerfilUsuarioService();

if(isset($_GET['start'])){
	$svc->setInit($_GET['start']);
}
if(isset($_GET['limit'])){
	$svc->setCount($_GET['limit']);
}

function verificarLoginCadastrado($nmLogin,$cdUsuario) {
	$retorno = false;
	
	//Verifica se existe algum usuário cadastrado com o mesmo login
	$svc = new UsuarioService();
	$query = " SELECT COUNT(*) TOT 
	             FROM usuario 
			    WHERE NM_LOGIN = '".$nmLogin."' 
			      AND SN_ATIVO = 'S'
				  AND CD_EMPRESA = ".$_SESSION['CD_EMPRESA'];
	if ($cdUsuario != NULL) {
		$query .= "    AND CD_USUARIO <> ".$cdUsuario;
	}
	$array = $svc->getBySelect($query,false);
	
	if ($array[0]['TOT'] > 0) {
		$retorno = true;
	}
	return $retorno;
}

function verificarSenhaAtual($dsSenha,$cdUsuario) {
	$retorno = false;
	# Verifica se a senha informada corrsponde
	$svc = new UsuarioService();
	$query = " SELECT COUNT(*) TOT 
	             FROM usuario 
			    WHERE CD_USUARIO = ".$cdUsuario." AND CD_EMPRESA = ".$_SESSION['CD_EMPRESA']." AND DS_SENHA = '".$dsSenha."'";
	$array = $svc->getBySelect($query,false);
	if ($array[0]['TOT'] > 0) {
		$retorno = true;
	}
	return $retorno;
}

if(isset($_GET['op'])){
	$op = $_GET['op'];
}

$erro = "Erro desconhecido.";

if($op == ""){
}

else if($op == 'getListaUsuario'){
	$nmLogin = '';
	$cdUsuario = '';

	if (isset($_GET['nmLogin'])) {
		$nmLogin = trim($_GET['nmLogin']);
	}
	if (isset($_GET['cdUsuario'])) {
		$cdUsuario = trim($_GET['cdUsuario']);
	}
	
	$query = "";
	$query .= " SELECT CD_USUARIO,NM_LOGIN,TP_NIVEL_ACESSO,DS_EMAIL,
				DS_SENHA,DT_CADASTRO,SN_ATIVO,SN_ALTERA_SENHA_PROX_LOGON,
				DT_VALIDADE_SENHA,SN_ACESSO_BLOQUEADO,DT_ALTERACAO,CD_USUARIO_ALTERACAO,
				CD_EMPRESA 
				FROM usuario ";
	
	$query .= " WHERE CD_EMPRESA = ".$_SESSION['CD_EMPRESA'];
	if ($nmLogin != ''){
		$query = $query . "  AND USU.NM_LOGIN = '".$nmLogin."'";
	}
	if ($cdUsuario != ''){
		$query = $query . "  AND CD_USUARIO =".$cdUsuario;
	}	
	$query .= "  ORDER BY NM_LOGIN";
	$elmnts = $svc->getBySelect($query);
	$json = json_encode($elmnts);
	print("{\"totalCount\":".$svc->getTotal().", \"items\": ".$json."}");
}

else if($op == 'getListaPerfilUsuario'){
	$cdUsuario = '';

	if (isset($_GET['cdUsuario'])) {
		$cdUsuario = trim($_GET['cdUsuario']);
	}
	
	$query = '';
	$query = $query . ' SELECT PU.CD_USUARIO';
	$query = $query . '       ,P.CD_PERFIL';
	$query = $query . '       ,P.DS_PERFIL';
	$query = $query . '   FROM perfil_usuario PU';
	$query = $query . '        INNER JOIN perfil P ON P.CD_PERFIL = PU.CD_PERFIL';
	$query = $query . '  WHERE PU.CD_USUARIO = '.$cdUsuario;
	$query = $query . '  ORDER BY P.DS_PERFIL';

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
	$query = $query . " SELECT P.CD_PERFIL";
	$query = $query . "       ,P.DS_PERFIL";
	$query = $query . "   FROM perfil P";
	$query = $query . "  WHERE P.SN_ATIVO = 'S' AND CD_EMPRESA = ".$_SESSION['CD_EMPRESA'];
	if ($cdPerfil != ""){
		$query = $query . '  AND P.CD_PERFIL = '.$cdPerfil;
	} else if ($dsPerfil != ""){
		$query = $query . '  AND P.DS_PERFIL LIKE "%'.$dsPerfil.'%"';
	}
	$query = $query . '  ORDER BY P.DS_PERFIL';
	
	$elmnts = $svc->getBySelect($query);
	$json = json_encode($elmnts);
	print("{\"totalCount\":".$svc->getTotal().", \"items\": ".$json."}");
}

else if($op == 'inserir'){
	$data = json_decode(file_get_contents('php://input'));
 	
	$db = Zend_Db_Table::getDefaultAdapter();
	$db->beginTransaction();	
	try {	
		# Se não houver nenhum usuário cadastrado com o login informado
		if (!verificarLoginCadastrado($data->{'NM_LOGIN'},$data->{'CD_USUARIO'})) {
		
			# CADASTRA O USUÁRIO
			$elmntUsuario = new UsuarioVO();
			$elmntUsuario->NM_LOGIN = $data->{'NM_LOGIN'};
			$elmntUsuario->TP_NIVEL_ACESSO = $data->{'TP_NIVEL_ACESSO'};
			$elmntUsuario->DS_EMAIL = $data->{'DS_EMAIL'};
			$elmntUsuario->DS_SENHA = md5($data->{'DS_SENHA'});
			$elmntUsuario->DT_CADASTRO = date('Y-m-d H:i:s');
			$elmntUsuario->SN_ATIVO = $data->{'SN_ATIVO'};
			$elmntUsuario->SN_ALTERA_SENHA_PROX_LOGON = $data->{'SN_ALTERA_SENHA_PROX_LOGON'};
			# $elmntUsuario->DT_VALIDADE_SENHA = $data->{'DT_VALIDADE_SENHA'};
			$elmntUsuario->SN_ACESSO_BLOQUEADO = 'N';
			$elmntUsuario->DT_ALTERACAO = date('Y-m-d H:i:s');
			$elmntUsuario->CD_USUARIO_ALTERACAO = $_SESSION['CD_USUARIO'];
			$elmntUsuario->CD_EMPRESA = $_SESSION['CD_EMPRESA'];
			
			$svc->inserir($elmntUsuario); 
			$elmntUsuario->CD_USUARIO = $svc->getLastInsertId(); 
			
			$db->commit();
      		
			$json = json_encode($elmntUsuario);
			print("{\"success\":true".", \"items\": ".$json."}");
			
		} else {
			$db->rollBack();
			print("{\"success\":false".", \"errorType\":'business'".", \"message\": \"".'O login informado já está cadastrado.'."\"}");
		}
	} catch (Zend_Exception $e) {
		$db->rollBack();
		print("{\"success\":false".", \"errorType\":'general'".", \"message\": \"".$e->getMessage()."\"}");
	}    
}

else if($op == 'alterar'){
	$data = json_decode(file_get_contents('php://input'));
 	
	$db = Zend_Db_Table::getDefaultAdapter();
	$db->beginTransaction();	
	try {	
		$elmntUsuario = $svc->getVOByCD($data->{'CD_USUARIO'});
		
		//Se não houver nenhum usuário cadastrado com o login informado
		if (!verificarLoginCadastrado($data->{'NM_LOGIN'},$data->{'CD_USUARIO'})) {
		
			/*ALTERA O USUÁRIO*/			
			$elmntUsuario->NM_LOGIN = $data->{'NM_LOGIN'};
			$elmntUsuario->TP_NIVEL_ACESSO = $data->{'TP_NIVEL_ACESSO'};
			$elmntUsuario->DS_EMAIL = $data->{'DS_EMAIL'};
			# Não é possível descriptografar uma senha MD5, é necessário criar uma tela para alteração de senha
			# $elmntUsuario->DS_SENHA = md5($data->{'DS_SENHA'});
			$elmntUsuario->DT_CADASTRO = date('Y-m-d H:i:s');
			$elmntUsuario->SN_ATIVO = $data->{'SN_ATIVO'};
			$elmntUsuario->SN_ALTERA_SENHA_PROX_LOGON = $data->{'SN_ALTERA_SENHA_PROX_LOGON'};
			# $elmntUsuario->DT_VALIDADE_SENHA = $data->{'DT_VALIDADE_SENHA'};
			$elmntUsuario->SN_ACESSO_BLOQUEADO = 'N';
			$elmntUsuario->DT_ALTERACAO = date('Y-m-d H:i:s');
			$elmntUsuario->CD_USUARIO_ALTERACAO = $_SESSION['CD_USUARIO'];
			$elmntUsuario->CD_EMPRESA = $_SESSION['CD_EMPRESA'];
			
			$svc->alterar($elmntUsuario); 
			
			$db->commit();	
			$json = json_encode($elmntUsuario);
			print("{\"success\":true".", \"items\": ".$json."}");
		} else {
			$db->rollBack();
			print("{\"success\":false".", \"errorType\":'business'".", \"message\": \"".'O login informado já está cadastrado.'."\"}");
		}
	} catch (Zend_Exception $e) {
		$db->rollBack();
		print("{\"success\":false".", \"errorType\":'general'".", \"message\": \"".$e->getMessage()."\"}");
	}    
}

else if($op == 'excluir'){
	$db = Zend_Db_Table::getDefaultAdapter();
	$db->beginTransaction();	
	try {	

		//Exclui o usuario
		$svc->excluir($_POST['cdUsuario']); 
		
		$db->commit();	
		print("{\"success\":true"."}");
		
	} catch (Zend_Exception $e) {
		$db->rollBack();
		print("{\"success\":false".", \"errorType\":'general'".", \"message\": \"".$e->getMessage()."\"}");
	}    
}

else if($op == 'alterarSenha'){
	$data = json_decode(file_get_contents('php://input'));
 	
	$db = Zend_Db_Table::getDefaultAdapter();
	$db->beginTransaction();	
	try {	
		$elmntUsuario = $svc->getVOByCD($data->{'CD_USUARIO'});
		# Verificar se a senha atual confere
		if (verificarSenhaAtual(md5($data->{'DS_SENHA_ATUAL'}),$data->{'CD_USUARIO'})) {
			# Altera a senha do usuário
			$elmntUsuario->DS_SENHA = md5($data->{'DS_SENHA'});
			$elmntUsuario->DT_ALTERACAO = date('Y-m-d H:i:s');
			$elmntUsuario->CD_USUARIO_ALTERACAO = $_SESSION['CD_USUARIO'];
			
			$svc->alterar($elmntUsuario); 
			
			$db->commit();	
			$json = json_encode($elmntUsuario);
			print("{\"success\":true".", \"items\": ".$json."}");
		} else {
			$db->rollBack();
			print("{\"success\":false".", \"errorType\":'business'".", \"message\": \"".'A senha informada não confere com a cadastrada.'."\"}");
		}
	} catch (Zend_Exception $e) {
		$db->rollBack();
		print("{\"success\":false".", \"errorType\":'general'".", \"message\": \"".$e->getMessage()."\"}");
	}    
}

else if($op == 'inserirPerfilUsuario'){
	$data = json_decode(file_get_contents('php://input'));
	$elmnt = new PerfilUsuarioVO();
	$elmnt->CD_PERFIL = $data->{'CD_PERFIL'};
	$elmnt->CD_USUARIO = $data->{'CD_USUARIO'};
 	
	$db = Zend_Db_Table::getDefaultAdapter();
	$db->beginTransaction();	
	try {	
		//Cadastra o perfil
		$svcPerfilUsuario->inserir($elmnt); 
		$db->commit();	
		$json = json_encode($elmnt);
		print("{\"success\":true".", \"items\": ".$json."}");
		
	} catch (Zend_Exception $e) {
		$db->rollBack();
		print("{\"success\":false".", \"errorType\":'general'".", \"message\": \"".$e->getMessage()."\"}");
	}    
}

else if($op == 'excluirPerfilUsuario'){
	$db = Zend_Db_Table::getDefaultAdapter();
	$db->beginTransaction();	
	try {	
		//Exclui o perfil
		$svcPerfilUsuario->excluir($_POST['cdPerfil'],$_POST['cdUsuario']); 
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