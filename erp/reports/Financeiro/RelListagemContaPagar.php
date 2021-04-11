<?php
$utltimoCaracter = substr($_SERVER['DOCUMENT_ROOT'], -1);
if ( $utltimoCaracter == '/' ) {
	include_once($_SERVER['DOCUMENT_ROOT'].'eHoplon/erp/seguranca.php');
	include_once($_SERVER['DOCUMENT_ROOT'].'eHoplon/InitZend.php');
	include_once($_SERVER['DOCUMENT_ROOT'].'eHoplon/lib/phpjasperxml_0.9d/class/tcpdf/tcpdf.php');
	include_once($_SERVER['DOCUMENT_ROOT'].'eHoplon/lib/phpjasperxml_0.9d/class/PHPJasperXML.inc.php');
	include_once($_SERVER['DOCUMENT_ROOT'].'eHoplon/ReportConfig.php');
	include_once($_SERVER['DOCUMENT_ROOT'].'eHoplon/erp/controller/util.php');
} else {
	include_once($_SERVER['DOCUMENT_ROOT'].'/eHoplon/erp/seguranca.php');
	include_once($_SERVER['DOCUMENT_ROOT'].'/eHoplon/InitZend.php');
	include_once($_SERVER['DOCUMENT_ROOT'].'/eHoplon/lib/phpjasperxml_0.9d/class/tcpdf/tcpdf.php');
	include_once($_SERVER['DOCUMENT_ROOT'].'/eHoplon/lib/phpjasperxml_0.9d/class/PHPJasperXML.inc.php');
	include_once($_SERVER['DOCUMENT_ROOT'].'/eHoplon/ReportConfig.php');
	include_once($_SERVER['DOCUMENT_ROOT'].'/eHoplon/erp/controller/util.php');
}
protegePagina("../../login.php");

error_reporting(E_ALL);
ini_set('display_errors', 'on');

if (isset($_GET['cdPessoaPj'])) {
	$cdPessoaPj = strtoupper(trim($_GET['cdPessoaPj']));
}
if (isset($_GET['cdPessoa'])) {
	$cdPessoa = strtoupper(trim($_GET['cdPessoa']));
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

$query = " SELECT ct.CD_CONTA,ct.CD_PARCELA,ct.DS_CONTA_PAGAR,ct.CD_PESSOA,p.NM_PESSOA,
	ct.CD_PESSOA_PJ,pj.NM_FANTASIA,pj.NM_RAZAO_SOCIAL,ct.DT_VENCIMENTO,
	ct.DT_PREVISAO_CONTA,ct.DT_LIQUIDACAO,ct.VL_CONTA,ct.VL_MORA_JURO,
	ct.VL_DESPESA,ct.VL_DESCONTO,ct.VL_LIQUIDACAO,ct.CD_SITUACAO,
	CASE ct.CD_SITUACAO
	    WHEN 'A' THEN 'Aberta'
		WHEN 'D' THEN 'Devolvida'
		WHEN 'L' THEN 'Liquidada'
		WHEN 'C' THEN 'Cancelada'
		WHEN 'N' THEN 'Negativada'
	END AS DS_SITUACAO,
	DATE_FORMAT(ct.DT_VENCIMENTO,'%d/%m/%Y') AS STR_DT_VENCIMENTO,
	DATE_FORMAT(ct.DT_LIQUIDACAO,'%d/%m/%Y') AS STR_DT_LIQUIDACAO,
	CONCAT('R$ ',   
               REPLACE  
                 (REPLACE  
                   (REPLACE  
                     (FORMAT(ct.VL_LIQUIDACAO, 2), '.', '|'), ',', '.'), '|', ',')) AS STR_VL_LIQUIDACAO		
	FROM conta_pagar ct
	LEFT OUTER JOIN pessoa p ON p.CD_PESSOA = ct.CD_PESSOA
	LEFT OUTER JOIN pessoa_pj pj ON pj.CD_PESSOA_PJ = ct.CD_PESSOA_PJ
	WHERE ct.CD_EMPRESA = ".$_SESSION['CD_EMPRESA'];
	
if ($cdPessoaPj != ""){
	$query = $query . '  AND ct.CD_PESSOA_PJ = '.$cdPessoaPj;
}
if ($cdPessoa != ""){
	$query = $query . '  AND ct.CD_PESSOA = '.$cdPessoa;
}

$parametros = "";
$atributoData = "";
if ($tipoDataPesquisa == "P"){
	$atributoData = "DT_PREVISAO_CONTA";
	$parametros = "Período de filtragem por data de previsão de pagamento ";
} else if ($tipoDataPesquisa == "V"){
	$atributoData = "DT_VENCIMENTO";
	$parametros = "Período de filtragem por data de vencimento ";
} else if ($tipoDataPesquisa == "L"){
	$atributoData = "DT_LIQUIDACAO";
	$parametros = "Período de filtragem por data de liquidação ";
}
if ( $atributoData != "") {
	if ($dtInicio != "" && $dtFim != ""){
		$query = $query . '  AND DATE('.$atributoData.') BETWEEN "'.$dtInicio.'" AND "'.$dtFim.'"';
		$parametros = $parametros . " de ".dataFormatDe_Ymd_Para_dmY($dtInicio)." até ".dataFormatDe_Ymd_Para_dmY($dtFim); 
	} else if ($dtInicio != ""){
		$query = $query . '  AND DATE('.$atributoData.') >= "'.$dtInicio.'"';
		$parametros = $parametros . " a partir de ".dataFormatDe_Ymd_Para_dmY($dtInicio);
	} else if ($dtFim != ""){
		$query = $query . '  AND DATE('.$atributoData.') <= "'.$dtFim.'"';
		$parametros = $parametros . " antes de ".dataFormatDe_Ymd_Para_dmY($dtFim);
	} else {
		$parametros = "";
	}
}

$query = $query . ' ORDER BY DT_VENCIMENTO';

$PHPJasperXML = new PHPJasperXML();
$PHPJasperXML->arrayParameter=array("P_NM_LOGIN"=>$_SESSION['NM_LOGIN']
								   ,"P_TITULO"=>"Relatório de Contas a Pagar"
								   ,"P_PARAMETROS"=>$parametros
								   ,"P_SQL_QUERY"=>$query);
$PHPJasperXML->load_xml_file('RelListagemContaPagar.jrxml');
$PHPJasperXML->transferDBtoArray($servidorMySQL,$usuarioMySQL,$senhaMySQL,$bancoMySQL,"mysql");
$PHPJasperXML->outpage("I");    
?>
