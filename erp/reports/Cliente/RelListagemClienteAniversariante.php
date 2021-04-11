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
	
	$svc = new PessoaService();

	if (isset($_GET['dtInicio'])) {
		$dtInicio = strtoupper(trim($_GET['dtInicio']));
	}
    $mes = substr($dtInicio, 5, 2);
    $dia = substr($dtInicio, 8, 2);

	# Data da Impressão
	$dataCadastro = date('d/m/Y H:i:s');

	# Nome do Arquivo pdf
	$nome = "RelatorioAniversariantes_$dataCadastro.pdf";	

	# Dados do cliente
	$query = "SELECT CD_PESSOA, NM_PESSOA, NR_TELEFONE, NR_CELULAR 
		FROM pessoa
		WHERE SN_ATIVO = 'S' AND MONTH(DT_NASCIMENTO) = ".$mes." AND DAY(DT_NASCIMENTO) = ".$dia;
		
	$query = $query . " ORDER BY NM_PESSOA";
		
	//die($query);
	
	$result = $svc->getBySelect($query,false);
	
	# INÍCIO DO RELATÓRIO
	$pdf = new PDF('L');
	$pdf->AliasNbPages();
	$pdf->AddPage();

	# Título 
	$pdf->SetLineWidth(0.3);	
	$pdf->SetFont('Arial', 'B', 11, 'C');
	$pdf->Cell(0, 0, utf8_decode('RELATÓRIO DE ANIVERSARIANTES EM '.$dia."/".$mes), 0,0, 'C');
	$pdf->SetFont('Arial', '', 8);
	
	# cabeçalho da página
	$pdf->Ln(10);
	$pdf->Cell(20,8,utf8_decode('Código'),1);
	$pdf->Cell(100,8,utf8_decode('Contato'),1);
	$pdf->Cell(40,8,utf8_decode('Telefone'),1);
	$pdf->Cell(40,8,utf8_decode('Celular'),1);
	
	$pdf->Ln(3);
	
	$qtdRegistros = 0;
	
	foreach( $result as $row ){   
		$pdf->Ln(5);
		$pdf->Cell(20,8,utf8_decode($row["CD_PESSOA"]),0);
		$pdf->Cell(100,8,utf8_decode($row["NM_PESSOA"]),0);
		$pdf->Cell(40,8,formataTelefone($row["NR_TELEFONE"]),0);
		$pdf->Cell(40,8,formataCelular($row["NR_CELULAR"]),0);

		$qtdRegistros++;
	}
	
	# imprimindo o total geral
	$pdf->Ln(8);
	$pdf->SetFont('Arial', 'B', 10, 'C');
	$pdf->Cell(40,8,utf8_decode("QTD. TOTAL DE REGISTROS : ").$qtdRegistros,0);
	
	# FIM DO CORPO DO DOCUMENTO
	$pdf->Output($nome, 'I');
?>