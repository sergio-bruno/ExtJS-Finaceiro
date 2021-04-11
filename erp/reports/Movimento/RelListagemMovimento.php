<?php
	$utltimoCaracter = substr($_SERVER['DOCUMENT_ROOT'], -1);
	if ( $utltimoCaracter == '/' ) {
		include_once($_SERVER['DOCUMENT_ROOT'].'eHoplon/erp/seguranca.php'); 
		include_once($_SERVER['DOCUMENT_ROOT'].'eHoplon/InitZend.php');	
		include_once($_SERVER['DOCUMENT_ROOT']."eHoplon/lib/fpdf/fpdf.php");
		include_once($_SERVER['DOCUMENT_ROOT']."eHoplon/erp/controller/util.php");
	} else {
		include_once($_SERVER['DOCUMENT_ROOT'].'/eHoplon/erp/seguranca.php'); 
		include_once($_SERVER['DOCUMENT_ROOT'].'/eHoplon/InitZend.php');
		include_once($_SERVER['DOCUMENT_ROOT']."/eHoplon/lib/fpdf/fpdf.php");
		include_once($_SERVER['DOCUMENT_ROOT']."/eHoplon/erp/controller/util.php");
	}
	protegePagina("../../login.php");

	error_reporting(E_ALL);
	ini_set('display_errors', 'off');
	
	$svc = new OsService();
	$svcEnderecoPessoaPj = new EnderecoPessoaPjService();
	$svcOsVisita = new OsVisitaService();

	# Data da Impressão
	$dataCadastro = date('d/m/Y H:i:s');

	# Nome do Arquivo pdf
	$nome = "RelatorioMovimentoFichaServico_$dataCadastro.pdf";	

	# Variáveis via POST
	$cdStatusFicha = '';
	if (isset($_GET['cdStatusFicha'])) {
		$cdStatusFicha = strtoupper(trim($_GET['cdStatusFicha']));
	}
	$cdStatusCliente = '';
	if (isset($_GET['cdStatusCliente'])) {
		$cdStatusCliente = strtoupper(trim($_GET['cdStatusCliente']));
	}
	
	# Dados da ficha de serviço do cliente
	$query = "SELECT o.CD_OS,o.CD_EMPRESA,o.CD_PESSOA_PJ,pj.NM_FANTASIA,
       	pj.NM_RAZAO_SOCIAL,pc.CD_CLASSIFICACAO,c.DS_CLASSIFICACAO,
       	o.NR_SEQUENCIAL_EMPRESA,pc.CD_STATUS_CLIENTE,sc.DS_STATUS_CLIENTE,
	   	o.CD_STATUS_FICHA,sf.DS_STATUS_FICHA
	    FROM os o 
		JOIN status_ficha sf ON sf.CD_STATUS_FICHA = o.CD_STATUS_FICHA
		JOIN pessoa_pj pj ON pj.CD_PESSOA_PJ = o.CD_PESSOA_PJ
		JOIN pessoa_pj_cliente pc ON pc.CD_PESSOA_PJ = pj.CD_PESSOA_PJ
		JOIN classificacao c ON c.CD_CLASSIFICACAO = pc.CD_CLASSIFICACAO
		LEFT JOIN status_cliente sc ON sc.CD_STATUS_CLIENTE = pc.CD_STATUS_CLIENTE
		WHERE o.CD_EMPRESA = ".$_SESSION['CD_EMPRESA'];
	
		if ( $cdStatusFicha != '' ) {
			$query = $query . '  AND o.CD_STATUS_FICHA = '.$cdStatusFicha;
		}
		if ( $cdStatusCliente != '' ) {
			$query = $query . '  AND pc.CD_STATUS_CLIENTE = '.$cdStatusCliente;
		}
		
	$result = $svc->getBySelect($query,false);
	
	# INÍCIO DO RELATÓRIO
	$pdf = new PDF('L');
	$pdf->AliasNbPages();
	$pdf->AddPage();

	# Título 
	$pdf->SetLineWidth(0.3);	
	$pdf->SetFont('Arial', 'B', 11, 'C');
	$pdf->Cell(0, 0, utf8_decode('RELATÓRIO DE FICHA DE SERVIÇOS'), 0,0, 'C');
	$pdf->SetFont('Arial', '', 8);
	
	# Cabeçalho da página
	$pdf->Ln(10);
	$pdf->Cell(65,8,utf8_decode('Razão Social'),1);
	$pdf->Cell(40,8,utf8_decode('Classificação'),1);
	$pdf->Cell(20,8,utf8_decode('Número'),1);
	$pdf->Cell(40,8,utf8_decode('Status Cliente'),1);
	$pdf->Cell(55,8,utf8_decode('Cidade'),1);
	$pdf->Cell(6,8,utf8_decode('UF'),1);
	$pdf->Cell(30,8,utf8_decode('Status da Ficha'),1);
	$pdf->Cell(25,8,utf8_decode('Última Visita'),1,0,'C');
	
	$pdf->Ln(3);
	
	$qtdRegistros = 0;
	
	foreach( $result as $row ){   
		$pdf->Ln(5);
		$pdf->Cell(65,8,utf8_decode($row["NM_RAZAO_SOCIAL"]),0);
		$pdf->Cell(40,8,utf8_decode($row["DS_CLASSIFICACAO"]),0);
		$pdf->Cell(20,8,utf8_decode($row["NR_SEQUENCIAL_EMPRESA"]),0);
		$pdf->Cell(40,8,utf8_decode($row["DS_STATUS_CLIENTE"]),0);
		# Localizar o 1º endereço cadastrado do cliente
		$enderecoAtualPessoa = $svcEnderecoPessoaPj->listarEnderecosCompletoPessoaPj($row["CD_PESSOA_PJ"]);
		if (count($enderecoAtualPessoa) > 0) {
			$pdf->Cell(55,8,utf8_decode($enderecoAtualPessoa[0]["DS_CIDADE"]),0);
			$pdf->Cell(6,8,utf8_decode($enderecoAtualPessoa[0]["CD_UF"]),0);
		} else {
			$pdf->Cell(55,8,"",0);
			$pdf->Cell(6,8,"",0);
		}
		$pdf->Cell(30,8,utf8_decode($row["DS_STATUS_FICHA"]),0);
		# Localizar a última visita na ficha do cliente
		$queryVisita = "SELECT ov.* FROM os_visita ov 
						JOIN os o ON o.CD_OS = ov.NR_OS 
						WHERE o.CD_PESSOA_PJ = ".$row["CD_PESSOA_PJ"]."
						ORDER BY DT_VISITA DESC";
		$visitaAtualPessoa = $svcOsVisita->getBySelect($queryVisita, false);
		if (count($visitaAtualPessoa) > 0) {
			$pdf->Cell(25,8,dataFormatDe_Ymd_Para_dmY($visitaAtualPessoa[0]["DT_VISITA"]),0,0,'C');
		} else {
			$pdf->Cell(25,8,"",0);
		}

		$qtdRegistros++;
	}
	
	# imprimindo o total geral
	$pdf->Ln(8);
	$pdf->SetFont('Arial', 'B', 10, 'C');
	$pdf->Cell(40,8,utf8_decode("QTD. TOTAL DE REGISTROS : ").$qtdRegistros,0);
	
	# FIM DO CORPO DO DOCUMENTO
	$pdf->Output($nome, 'I');
?>