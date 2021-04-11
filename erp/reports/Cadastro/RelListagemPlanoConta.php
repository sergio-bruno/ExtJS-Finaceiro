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
	
	$svc = new PessoaPjService();
	$svcEnderecoPessoaPj = new EnderecoPessoaPjService();
	$svcVisita = new VisitaService();

	# Data da Impressão
	$dataCadastro = date('d/m/Y H:i:s');

	# Nome do Arquivo pdf
	$nome = "RelatorioCadastroPlanoConta_$dataCadastro.pdf";	

	# relação das contas
	$query = "SELECT CD_CONTA,DS_PLANO_CONTA,TP_LANCAMENTO,
		CASE TP_LANCAMENTO
			WHEN 'D' THEN 'Débito'
			WHEN 'C' THEN 'Crédito'
		END AS DS_TP_LANCAMENTO,
		TP_CONTA,
		CASE TP_CONTA
			WHEN 'A' THEN 'Análitico'
			WHEN 'S' THEN 'Sintético'
		END AS DS_TP_CONTA,
		SN_CONTABILIZA,
		CASE SN_CONTABILIZA
			WHEN 'N' THEN 'Não'
			WHEN 'S' THEN 'Sim'
		END AS DS_SN_CONTABILIZA
		FROM plano_conta
		WHERE SN_ATIVO='S' AND CD_EMPRESA = ".$_SESSION['CD_EMPRESA']; 
	$query = $query . " ORDER BY CD_CONTA";
	$result = $svc->getBySelect($query,false);
	
	# INÍCIO DO RELATÓRIO
	$pdf = new PDF('L');
	$pdf->AliasNbPages();
	$pdf->AddPage();

	# Título 
	$pdf->SetLineWidth(0.3);	
	$pdf->SetFont('Arial', 'B', 11, 'C');
	$pdf->Cell(0, 0, utf8_decode('RELATÓRIO DE PLANO DE CONTAS ATIVOS'), 0,0, 'C');
	$pdf->SetFont('Arial', '', 8);
	
	# cabeçalho da página
	$pdf->Ln(10);
	$pdf->Cell(35,8,utf8_decode('Código'),1);
	$pdf->Cell(100,8,utf8_decode('Conta'),1);
	$pdf->Cell(30,8,utf8_decode('Lançamento'),1);
	$pdf->Cell(30,8,utf8_decode('Tipo'),1);
	$pdf->Cell(30,8,utf8_decode('Contabiliza'),1);
	
	$pdf->Ln(3);
	
	$qtdRegistros = 0;
	$qtdEspaco = 0;
	
	foreach( $result as $row ){   
		$pdf->Ln(5);
		
		$qtdEspaco = 0;
		
		$cdConta = $row["CD_CONTA"];
		
		if ( strlen($row["CD_CONTA"]) == 4 ) {
			$qtdEspaco = 5;
			$pdf->Cell(5,8,' ',0);
			$cdConta = substr($cdConta,0,2).".".substr($cdConta,2,2);
		} else if ( strlen($row["CD_CONTA"]) == 6 ) {
			$qtdEspaco = 10;
			$pdf->Cell(10,8,' ',0);
			$cdConta = substr($cdConta,0,2).".".substr($cdConta,2,2).".".substr($cdConta,4,2);
		} else if ( strlen($row["CD_CONTA"]) == 8 ) {
			$qtdEspaco = 15;
			$pdf->Cell(15,8,' ',0);
			$cdConta = substr($cdConta,0,2).".".substr($cdConta,2,2).".".substr($cdConta,4,2).".".substr($cdConta,6,2);
			
		}
		$pdf->Cell(35 - $qtdEspaco,8,utf8_decode($cdConta),0);
		$pdf->Cell(100,8,utf8_decode($row["DS_PLANO_CONTA"]),0);
		$pdf->Cell(30,8,utf8_decode($row["DS_TP_LANCAMENTO"]),0);
		$pdf->Cell(30,8,utf8_decode($row["DS_TP_CONTA"]),0);
		$pdf->Cell(30,8,utf8_decode($row["DS_SN_CONTABILIZA"]),0);

		$qtdRegistros++;
	}
	
	# imprimindo o total geral
	$pdf->Ln(8);
	$pdf->SetFont('Arial', 'B', 10, 'C');
	$pdf->Cell(40,8,utf8_decode("QTD. TOTAL DE REGISTROS : ").$qtdRegistros,0);
	
	# FIM DO CORPO DO DOCUMENTO
	$pdf->Output($nome, 'I');
?>