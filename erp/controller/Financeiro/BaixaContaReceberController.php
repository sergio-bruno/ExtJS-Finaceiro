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
	$dtInicio = '';
	$dtFim = '';
	$tipoDataPesquisa = '';
	$tipoSituacaoPesquisa = '';
	
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
	if (isset($_GET['tipoSituacaoPesquisa'])) {
		$tipoSituacaoPesquisa = $_GET['tipoSituacaoPesquisa'];
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
			        END AS DS_SITUACAO
			  	FROM conta_receber ct
				LEFT OUTER JOIN pessoa p ON p.CD_PESSOA = ct.CD_PESSOA
				LEFT OUTER JOIN pessoa_pj pj ON pj.CD_PESSOA_PJ = ct.CD_PESSOA_PJ
				JOIN usuario uc ON uc.CD_USUARIO = ct.CD_USUARIO_CADASTRO
				LEFT OUTER JOIN usuario ua ON ua.CD_USUARIO = ct.CD_USUARIO_ALTERACAO
				LEFT OUTER JOIN plano_conta pc ON pc.CD_PLANO_CONTA = ct.CD_PLANO_CONTA
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
	
	if ( $tipoSituacaoPesquisa != "") {
		$query = $query . '  AND ct.CD_SITUACAO = "'.$tipoSituacaoPesquisa.'"';
	}
	
    $query = $query . ' ORDER BY DT_VENCIMENTO DESC';	
	 
    //die($query);
    
	$elmnts = $svc->getBySelect($query);
	$json = json_encode($elmnts);
	print("{\"totalCount\":".$svc->getTotal().", \"items\": ".$json."}");
}

else if($op == 'baixar'){
	$data = json_decode(file_get_contents('php://input'));
	$elmnt = $svc->getVOByCD( $data->{'CD_CONTA_RECEBER'} );
	$elmnt->CD_SITUACAO = $data->{'CD_SITUACAO'};
	$elmnt->DT_LIQUIDACAO = $data->{'DT_LIQUIDACAO'};
	$elmnt->VL_CONTA = $data->{'VL_CONTA'};
	$elmnt->VL_MORA_JURO = $data->{'VL_MORA_JURO'};
	$elmnt->VL_DESPESA = $data->{'VL_DESPESA'};
	$elmnt->VL_DESCONTO = $data->{'VL_DESCONTO'};
	$elmnt->VL_DESPESA_COBRANCA = $data->{'VL_DESPESA_COBRANCA'};
	$elmnt->VL_ABATIMENTO = $data->{'VL_ABATIMENTO'};
	$elmnt->VL_IOF = $data->{'VL_IOF'};
	$elmnt->VL_OUTROS_CREDITOS = $data->{'VL_OUTROS_CREDITOS'};
	$elmnt->VL_LIQUIDACAO = $data->{'VL_LIQUIDACAO'};
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

else{
	print("'success': false,");
	print("'mensagem': $erro");
}

?>