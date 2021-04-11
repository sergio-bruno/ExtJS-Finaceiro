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
	$nome = "RelatorioCadastroCliente_$dataCadastro.pdf";	

	# Dados do cliente
	$query = "SELECT pj.CD_PESSOA_PJ, pj.NM_FANTASIA, pj.NM_RAZAO_SOCIAL, cl.DS_CLASSIFICACAO, sc.DS_STATUS_CLIENTE 
		FROM pessoa_pj pj
		JOIN pessoa_pj_cliente c on c.CD_PESSOA_PJ = pj.CD_PESSOA_PJ 
		LEFT JOIN classificacao cl ON cl.CD_CLASSIFICACAO = c.CD_CLASSIFICACAO
		LEFT JOIN status_cliente sc ON sc.CD_STATUS_CLIENTE = c.CD_STATUS_CLIENTE
		WHERE pj.SN_ATIVO = 'S' AND pj.CD_EMPRESA = ".$_SESSION['CD_EMPRESA'];
		
	$query = $query . " ORDER BY pj.NM_RAZAO_SOCIAL";
	$result = $svc->getBySelect($query,false);
	
	# INÍCIO DO RELATÓRIO
	$pdf = new PDF('L');
	$pdf->AliasNbPages();
	$pdf->AddPage();

	# Título 
	$pdf->SetLineWidth(0.3);	
	$pdf->SetFont('Arial', 'B', 11, 'C');
	$pdf->Cell(0, 0, utf8_decode('RELATÓRIO DE FICHA CADASTRAL DO CLIENTE'), 0,0, 'C');
	$pdf->SetFont('Arial', '', 8);
	
	# cabeçalho da página
	$pdf->Ln(10);
	$pdf->Cell(65,8,utf8_decode('Razão Social'),1);
	$pdf->Cell(40,8,utf8_decode('Classificação'),1);
	$pdf->Cell(40,8,utf8_decode('Status Cliente'),1);
	$pdf->Cell(55,8,utf8_decode('Cidade'),1);
	$pdf->Cell(6,8,utf8_decode('UF'),1);
	$pdf->Cell(25,8,utf8_decode('Última Visita'),1,0,'C');
	
	$pdf->Ln(3);
	
	$qtdRegistros = 0;
	
	foreach( $result as $row ){   
		$pdf->Ln(5);
		$pdf->Cell(65,8,utf8_decode($row["NM_RAZAO_SOCIAL"]),0);
		# $pdf->Cell(28,8,dataFormat($row["DT_ATENDIMENTO"]),0);
		$pdf->Cell(40,8,utf8_decode($row["DS_CLASSIFICACAO"]),0);
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

		# Localizar a última visita no cadastro do cliente
		$queryVisita = "SELECT * FROM visita WHERE CD_PESSOA_PJ = ".$row["CD_PESSOA_PJ"]."
					ORDER BY DT_VISITA DESC";
		$visitaAtualPessoa = $svcVisita->getBySelect($queryVisita, false);
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