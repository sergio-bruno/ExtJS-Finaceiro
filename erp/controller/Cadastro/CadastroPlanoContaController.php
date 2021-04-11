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

$svc = new PlanoContaService();

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

else if($op == 'getListaPlanoConta'){
	$dsPlanoConta = '';

	if (isset($_GET['dsPlanoConta'])) {
		$dsPlanoConta = strtoupper(trim($_GET['dsPlanoConta']));
	}
	
	$query = "SELECT CD_PLANO_CONTA,
					 CD_CONTA,
	                 DS_PLANO_CONTA,
					 TP_LANCAMENTO,
					 TP_CONTA,
					 SN_CONTABILIZA,
					 SN_ATIVO,
					 CD_EMPRESA	
			  FROM plano_conta
              WHERE CD_EMPRESA = ".$_SESSION['CD_EMPRESA'];
	
	if ($dsPlanoConta != ""){
		$query = $query . '  AND DS_PLANO_CONTA LIKE "%'.$dsPlanoConta.'%"';
	}	
    $query = $query . ' ORDER BY DS_PLANO_CONTA';	
	 
	$elmnts = $svc->getBySelect($query);
	$json = json_encode($elmnts);
	print("{\"totalCount\":".$svc->getTotal().", \"items\": ".$json."}");
}

else if($op == 'inserir'){
	$data = json_decode(file_get_contents('php://input'));
	
	$respContaValidada = validaConta( $data->{'CD_CONTA'},$data->{'TP_CONTA'} ); 
	
	if ( strlen($respContaValidada) > 0 ) {
		print("{\"success\":false".", \"errorType\":'general'".", \"message\": \"".$respContaValidada."\"}");
	} else {
		$elmnt = new PlanoContaVO();
		$elmnt->DS_PLANO_CONTA = $data->{'DS_PLANO_CONTA'};
		$elmnt->CD_CONTA = $data->{'CD_CONTA'};
		$elmnt->TP_LANCAMENTO = $data->{'TP_LANCAMENTO'};
		$elmnt->TP_CONTA = $data->{'TP_CONTA'};
		$elmnt->SN_CONTABILIZA = $data->{'SN_CONTABILIZA'};
		$elmnt->CD_EMPRESA = $_SESSION['CD_EMPRESA'];
		$elmnt->SN_ATIVO = $data->{'SN_ATIVO'};
		
		$db = Zend_Db_Table::getDefaultAdapter();
		$db->beginTransaction();	
		try {	
			$svc->inserir($elmnt); 
			$elmnt->CD_PLANO_CONTA = $svc->getLastInsertId(); 
			
			$db->commit();	
			$json = json_encode($elmnt);
			print("{\"success\":true".", \"items\": ".$json."}");
		} catch (Zend_Exception $e) {
			$db->rollBack();
			print("{\"success\":false".", \"errorType\":'general'".", \"message\": \"".$e->getMessage()."\"}");
		}   
	}
}

else if($op == 'alterar'){
	$data = json_decode(file_get_contents('php://input'));
	
	$respContaValidada = validaConta( $data->{'CD_CONTA'},$data->{'TP_CONTA'} );
	
	if ( strlen($respContaValidada) > 0 ) {
		print("{\"success\":false".", \"errorType\":'general'".", \"message\": \"".$respContaValidada."\"}");
	} else {
		$elmnt = $svc->getVOByCD($data->{'CD_PLANO_CONTA'});
		$elmnt->DS_PLANO_CONTA = $data->{'DS_PLANO_CONTA'};
		$elmnt->CD_CONTA = $data->{'CD_CONTA'};
		$elmnt->TP_LANCAMENTO = $data->{'TP_LANCAMENTO'};
		$elmnt->TP_CONTA = $data->{'TP_CONTA'};
		$elmnt->SN_CONTABILIZA = $data->{'SN_CONTABILIZA'};
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
}

else if($op == 'excluir'){
	$db = Zend_Db_Table::getDefaultAdapter();
	$db->beginTransaction();	
	try {	
		$svc->excluir($_POST['cdPlanoConta']); 
			
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

function validaConta($conta,$tipo) {
	$tamanhoConta = strlen(trim($conta));
	$resposta = "";
	$impar = array(1, 3, 5, 7);

	if ( in_array($tamanhoConta, $impar) ) {
		return "A quantidade de digitos informada está incorreta, a quantidade tem que ser par...";	
	} else if ( $tamanhoConta == 2 ) {
		if ( $tipo = "S" ) {
			return "Conta de 1° grau requer tipo analitica...";
		}
	} else if ( $tamanhoConta == 4 ) {
		# verificar se existe uma conta de grau superior
		$parteConta = substr($conta, 0, 2);
		if ( existeConta($parteConta) <= 0 ) {
			return "Não existe conta de grau superior: ".$parteConta;
		} else {
			return "";
		}
	} else if ( $tamanhoConta == 6 ) {
		# verificar se existe uma conta de grau superior
		$parteConta = substr($conta, 0, 4);
		if ( existeConta($parteConta) <= 0 ) {
			return "Não existe conta de grau superior: ".$parteConta;
		} else {
			return "";
		}
	} else if ( $tamanhoConta == 8 ) {
		# verificar se existe uma conta de grau superior
		$parteConta = substr($conta, 0, 6);
		if ( existeConta($parteConta) <= 0 ) {
			return "Não existe conta de grau superior: ".$parteConta;
		} else {
			if ( $tipo = "A" ) {
				return "Conta de 4° grau requer tipo sintética...";
			} else {
				return "";
			}
		}
	}
}

function existeConta($cdConta) {
	$svcPlanoConta = new PlanoContaService();
	$query = "SELECT COUNT(CD_PLANO_CONTA) AS QTD FROM plano_conta WHERE CD_CONTA = '".$cdConta."' AND CD_EMPRESA=".$_SESSION['CD_EMPRESA'];
	$array = $svcPlanoConta->getBySelect($query);
	return $array[0]['QTD'];
}

?>