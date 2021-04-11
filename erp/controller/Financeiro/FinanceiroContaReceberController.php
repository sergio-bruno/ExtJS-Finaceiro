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
ini_set('display_errors', 'on');

$svc = new ContaReceberService();
$svcBoletoBancario = new BoletoBancarioService();

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

else if($op == 'getListaContaReceber'){
	$dsContaReceber = '';

	if (isset($_GET['dsContaReceber'])) {
		$dsContaReceber = strtoupper(trim($_GET['dsContaReceber']));
	}
	if (isset($_GET['dtInicio'])) {
		$dtInicio = strtoupper(trim($_GET['dtInicio']));
	}
	if (isset($_GET['dtFim'])) {
		$dtFim = strtoupper(trim($_GET['dtFim']));
	}
	if (isset($_GET['tipoDataPesquisa'])) {
		$tipoDataPesquisa = $_GET['tipoDataPesquisa'];
	}
	
	$query = "SELECT ct.CD_CONTA_RECEBER,
                 	ct.DS_CONTA_RECEBER,
					ct.CD_EMPRESA,
					ct.CD_PESSOA,
					p.NM_PESSOA,
					ct.CD_PESSOA_PJ,
					pj.NM_FANTASIA,
					pj.NM_RAZAO_SOCIAL,
					ct.DT_CADASTRO,
					ct.DT_ALTERACAO,
					ct.DT_PREVISAO_CONTA,
					ct.CD_USUARIO_CADASTRO,
					uc.NM_LOGIN AS DS_USUARIO_CADASTRO,
					ct.CD_USUARIO_ALTERACAO,
					ua.NM_LOGIN AS DS_USUARIO_ALTERACAO,
					ct.DT_LIQUIDACAO,
					ct.VL_CONTA,
					ct.DT_VENCIMENTO,
					ct.VL_MORA_JURO,
					ct.VL_DESPESA,
					ct.VL_DESCONTO,
					ct.VL_DESPESA_COBRANCA,
					ct.VL_ABATIMENTO,
					ct.VL_IOF,
					ct.VL_OUTROS_CREDITOS,
					ct.VL_LIQUIDACAO,
					ct.CD_PLANO_CONTA,
					pc.DS_PLANO_CONTA,
					ct.CD_CONTA,
					ct.CD_PARCELA,
					ct.DS_OBSERVACAO,
					ct.CD_SITUACAO,
			        CASE ct.CD_SITUACAO
				        WHEN 'A' THEN 'Aberta'
						WHEN 'D' THEN 'Devolvida'
						WHEN 'L' THEN 'Liquidada'
						WHEN 'C' THEN 'Cancelada'
						WHEN 'N' THEN 'Negativada'
			        END AS DS_SITUACAO,
					bl.CD_BOLETO_BANCARIO,
					bl.DS_LOCAL_PAGAMENTO,
					bl.DT_DOCUMENTO,    
					bl.CD_ESPECIE_DOCUMENTO, 
					ed.DS_ESPECIE_DOCUMENTO,	
					bl.DS_ACEITE,             
					bl.CD_NOSSO_NUMERO,       
					bl.DS_CARTEIRA,           
					bl.DT_PROTESTO,           
					bl.DT_ABATIMENTO,         
					bl.DT_DESCONTO,           
					bl.DS_INSTRUCOES			
			  	FROM conta_receber ct
				LEFT OUTER JOIN pessoa p ON p.CD_PESSOA = ct.CD_PESSOA
				LEFT OUTER JOIN pessoa_pj pj ON pj.CD_PESSOA_PJ = ct.CD_PESSOA_PJ
				JOIN usuario uc ON uc.CD_USUARIO = ct.CD_USUARIO_CADASTRO
				LEFT OUTER JOIN usuario ua ON ua.CD_USUARIO = ct.CD_USUARIO_ALTERACAO
				LEFT OUTER JOIN plano_conta pc ON pc.CD_PLANO_CONTA = ct.CD_PLANO_CONTA
				LEFT OUTER JOIN boleto_bancario bl ON bl.CD_CONTA_RECEBER = ct.CD_CONTA_RECEBER
				LEFT OUTER JOIN especie_documento ed ON ed.CD_ESPECIE_DOCUMENTO = bl.CD_ESPECIE_DOCUMENTO
              	WHERE ct.CD_EMPRESA = ".$_SESSION['CD_EMPRESA'];
	
	if ($dsContaReceber != ""){
		$query = $query . '  AND DS_CONTA_RECEBER LIKE "%'.$dsContaReceber.'%"';
	}

	$atributoData = "";
	if ($tipoDataPesquisa == "P"){
		$atributoData = "DT_PREVISAO_CONTA";
	} else if ($tipoDataPesquisa == "V"){
		$atributoData = "DT_VENCIMENTO";
	} else if ($tipoDataPesquisa == "L"){
		$atributoData = "DT_LIQUIDACAO";
	}   
	
	if ( $atributoData != "") {
		if ($dtInicio != "" && $dtFim != ""){
			$query = $query . '  AND DATE('.$atributoData.') BETWEEN "'.$dtInicio.'" AND "'.$dtFim.'"';
		} else if ($dtInicio != ""){
			$query = $query . '  AND DATE('.$atributoData.') >= "'.$dtInicio.'"';
		} else if ($dtFim != ""){
			$query = $query . '  AND DATE('.$atributoData.') <= "'.$dtFim.'"';
		}
	}
	
    $query = $query . ' ORDER BY DT_VENCIMENTO DESC';	
    
	$elmnts = $svc->getBySelect($query);
	$json = json_encode($elmnts);
	print("{\"totalCount\":".$svc->getTotal().", \"items\": ".$json."}");
}

else if($op == 'baixar'){
	$elmnt = $svc->getVOByCD($_POST['cdContaReceber']);
	$elmnt->CD_SITUACAO = $_POST['novaSituacao'];
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

else if($op == 'inserir'){
	$data = json_decode(file_get_contents('php://input'));
	$elmnt = new ContaReceberVO();
	$elmnt->DS_CONTA_RECEBER = $data->{'DS_CONTA_RECEBER'};
	$elmnt->CD_EMPRESA = $_SESSION['CD_EMPRESA'];
	$elmnt->DT_CADASTRO = date('Y-m-d H:i:s');
	$elmnt->CD_USUARIO_CADASTRO = $_SESSION['CD_USUARIO'];
	# $elmnt->CD_USUARIO_ALTERACAO = $_SESSION['CD_USUARIO'];
	# $elmnt->DT_ALTERACAO = date('Y-m-d H:i:s');
	if ( $data->{'CD_PESSOA'} ==  -1 ) {
		$elmnt->CD_PESSOA = null;
	} else {
		$elmnt->CD_PESSOA = $data->{'CD_PESSOA'};
	}
	if ( $data->{'CD_PESSOA_PJ'} ==  -1 ) {
		$elmnt->CD_PESSOA_PJ = null;
	} else {
		$elmnt->CD_PESSOA_PJ = $data->{'CD_PESSOA_PJ'};
	}
	if ( $data->{'CD_PLANO_CONTA'} ==  -1 ) {
		$elmnt->CD_PLANO_CONTA = null;
	} else {
		$elmnt->CD_PLANO_CONTA = $data->{'CD_PLANO_CONTA'};
	}
	$elmnt->DT_PREVISAO_CONTA = $data->{'DT_PREVISAO_CONTA'};
	$elmnt->DT_LIQUIDACAO = $data->{'DT_LIQUIDACAO'};
	$elmnt->VL_CONTA = $data->{'VL_CONTA'};
	$elmnt->DT_VENCIMENTO = $data->{'DT_VENCIMENTO'};
	$elmnt->VL_MORA_JURO = $data->{'VL_MORA_JURO'};
	$elmnt->VL_DESPESA = $data->{'VL_DESPESA'};
	$elmnt->VL_DESCONTO = $data->{'VL_DESCONTO'};
	$elmnt->VL_DESPESA_COBRANCA = $data->{'VL_DESPESA_COBRANCA'};
	$elmnt->VL_ABATIMENTO = $data->{'VL_ABATIMENTO'};
	$elmnt->VL_IOF = $data->{'VL_IOF'};
	$elmnt->VL_OUTROS_CREDITOS = $data->{'VL_OUTROS_CREDITOS'};
	$elmnt->VL_LIQUIDACAO = $data->{'VL_LIQUIDACAO'};
	$elmnt->CD_CONTA = $data->{'CD_CONTA'};
	$elmnt->CD_PARCELA = $data->{'CD_PARCELA'};
	$elmnt->DS_OBSERVACAO = $data->{'DS_OBSERVACAO'};
	$elmnt->CD_SITUACAO = $data->{'CD_SITUACAO'};
	$elmnt->DS_CONTA_RECEBER = $data->{'DS_CONTA_RECEBER'};
	
	$db = Zend_Db_Table::getDefaultAdapter();
	$db->beginTransaction();	
	try {	
		$svc->inserir($elmnt); 
		$elmnt->CD_CONTA_RECEBER = $svc->getLastInsertId(); 
		
		# 1º) Boleto Bancário -----------------------------------------------------------------------------
		if ( $data->{'CD_NOSSO_NUMERO'} != "" && $data->{'CD_NOSSO_NUMERO'} != null  ) {
			$elmntBoletoBancario = new BoletoBancarioVO();
			$elmntBoletoBancario->CD_CONTA_RECEBER = $data->{'CD_CONTA_RECEBER'};
			$elmntBoletoBancario->DS_LOCAL_PAGAMENTO = $data->{'DS_LOCAL_PAGAMENTO'};
			$elmntBoletoBancario->DT_DOCUMENTO = $data->{'DT_DOCUMENTO'};
			$elmntBoletoBancario->CD_ESPECIE_DOCUMENTO = $data->{'CD_ESPECIE_DOCUMENTO'};
			$elmntBoletoBancario->DS_ACEITE = $data->{'DS_ACEITE'};
			$elmntBoletoBancario->CD_NOSSO_NUMERO = $data->{'CD_NOSSO_NUMERO'};
			$elmntBoletoBancario->DS_CARTEIRA = $data->{'DS_CARTEIRA'};
			$elmntBoletoBancario->DT_PROTESTO = $data->{'DT_PROTESTO'};
			$elmntBoletoBancario->DT_ABATIMENTO = $data->{'DT_ABATIMENTO'};
			$elmntBoletoBancario->DT_DESCONTO = $data->{'DT_DESCONTO'};
			$elmntBoletoBancario->DS_INSTRUCOES = $data->{'DS_INSTRUCOES'};
			$svcBoletoBancario->inserir($elmntBoletoBancario);
		}
		
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
	$elmnt = $svc->getVOByCD($data->{'CD_CONTA_RECEBER'});
	$elmnt->DS_CONTA_RECEBER = $data->{'DS_CONTA_RECEBER'};
	$elmnt->CD_EMPRESA = $_SESSION['CD_EMPRESA'];
	# $elmnt->DT_CADASTRO = date('Y-m-d H:i:s');
	# $elmnt->CD_USUARIO_CADASTRO = $_SESSION['CD_USUARIO'];
	$elmnt->CD_USUARIO_ALTERACAO = $_SESSION['CD_USUARIO'];
	$elmnt->DT_ALTERACAO = date('Y-m-d H:i:s');
	if ( $data->{'CD_PESSOA'} ==  -1 ) {
		$elmnt->CD_PESSOA = null;
	} else {
		$elmnt->CD_PESSOA = $data->{'CD_PESSOA'};
	}
	if ( $data->{'CD_PESSOA_PJ'} ==  -1 ) {
		$elmnt->CD_PESSOA_PJ = null;
	} else {
		$elmnt->CD_PESSOA_PJ = $data->{'CD_PESSOA_PJ'};
	}
	if ( $data->{'CD_PLANO_CONTA'} ==  -1 ) {
		$elmnt->CD_PLANO_CONTA = null;
	} else {
		$elmnt->CD_PLANO_CONTA = $data->{'CD_PLANO_CONTA'};
	}
	$elmnt->DT_PREVISAO_CONTA = $data->{'DT_PREVISAO_CONTA'};
	$elmnt->DT_LIQUIDACAO = $data->{'DT_LIQUIDACAO'};
	$elmnt->VL_CONTA = $data->{'VL_CONTA'};
	$elmnt->DT_VENCIMENTO = $data->{'DT_VENCIMENTO'};
	$elmnt->VL_MORA_JURO = $data->{'VL_MORA_JURO'};
	$elmnt->VL_DESPESA = $data->{'VL_DESPESA'};
	$elmnt->VL_DESCONTO = $data->{'VL_DESCONTO'};
	$elmnt->VL_DESPESA_COBRANCA = $data->{'VL_DESPESA_COBRANCA'};
	$elmnt->VL_ABATIMENTO = $data->{'VL_ABATIMENTO'};
	$elmnt->VL_IOF = $data->{'VL_IOF'};
	$elmnt->VL_OUTROS_CREDITOS = $data->{'VL_OUTROS_CREDITOS'};
	$elmnt->VL_LIQUIDACAO = $data->{'VL_LIQUIDACAO'};
	$elmnt->CD_CONTA = $data->{'CD_CONTA'};
	$elmnt->CD_PARCELA = $data->{'CD_PARCELA'};
	$elmnt->DS_OBSERVACAO = $data->{'DS_OBSERVACAO'};
	$elmnt->CD_SITUACAO = $data->{'CD_SITUACAO'};
	$elmnt->DS_CONTA_RECEBER = $data->{'DS_CONTA_RECEBER'};
	
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
		$svc->excluir($_POST['cdContaReceber']); 
			
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