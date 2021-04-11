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

$svc = new OsService();
$svcOsAcaoComercial = new OsAcaoComercialService();
$svcOsContrato = new OsContratoService();
$svcOsInvestimento = new OsInvestimentoService();
$svcOsLicitacao = new OsLicitacaoService();
$svcOsVisita = new OsVisitaService();

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

# 1º Relacionametno contrato anterior
else if($op == 'getListaContratoAnteriorFichaServico'){
	$svcOsVisita = new OsVisitaService();
	$cdOs = '';

	if (isset($_GET['cdOs'])) {
		$cdOs = $_GET['cdOs'];	
    }

	$query = "SELECT CD_OS_CONTRATO,NR_OS,DS_OBSERVACOES FROM os_contrato
			WHERE 1 = 1 ";
			
	if ($cdOs != ""){
		$query = $query . '  AND NR_OS = '.$cdOs;
	}
	
	$query = $query . ' ORDER BY CD_OS_CONTRATO';	
	
	$elmnts = $svcOsVisita->getBySelect($query);
	$json = json_encode($elmnts);
	print("{\"totalCount\":".$svcOsVisita->getTotal().", \"items\": ".$json."}");
}

# 2º Relacionametno investimento
else if($op == 'getListaInvestimentoFichaServico'){
	$svcOsInvestimento = new OsInvestimentoService();
	$cdOs = '';

	if (isset($_GET['cdOs'])) {
		$cdOs = $_GET['cdOs'];	
    }

	$query = "SELECT CD_OS_INVESTIMENTO,NR_OS,DS_INVESTIMENTO,VL_INVESTIMENTO FROM os_investimento
			WHERE 1 = 1 ";
			
	if ($cdOs != ""){
		$query = $query . '  AND NR_OS = '.$cdOs;
	}
	
	$query = $query . ' ORDER BY CD_OS_INVESTIMENTO';	
	
	$elmnts = $svcOsInvestimento->getBySelect($query);
	$json = json_encode($elmnts);
	print("{\"totalCount\":".$svcOsInvestimento->getTotal().", \"items\": ".$json."}");
}

# 3º Relacionametno licitação realizada
else if($op == 'getListaLicitacaoRealizadaFichaServico'){
	$svcOsLicitacao = new OsLicitacaoService();
	$cdOs = '';

	if (isset($_GET['cdOs'])) {
		$cdOs = $_GET['cdOs'];	
    }

	$query = "SELECT CD_OS_LICITACAO,NR_OS,CD_LICITACAO,DS_OBSERVACOES,
				CASE WHEN SN_PARTICIPA = 'S' THEN 'Sim' WHEN SN_PARTICIPA = 'N' THEN 'Não' END AS SN_PARTICIPA,
				CASE WHEN SN_REALIZADA = 'S' THEN 'Sim' WHEN SN_REALIZADA = 'N' THEN 'Não' END AS SN_REALIZADA
			FROM os_licitacao
			WHERE SN_REALIZADA = 'S' ";
			
	if ($cdOs != ""){
		$query = $query . '  AND NR_OS = '.$cdOs;
	}
	
	$query = $query . ' ORDER BY CD_OS_LICITACAO';	
	
	$elmnts = $svcOsLicitacao->getBySelect($query);
	$json = json_encode($elmnts);
	print("{\"totalCount\":".$svcOsLicitacao->getTotal().", \"items\": ".$json."}");
}

# 4º Relacionamento visitas
else if($op == 'getListaVisitaFichaServico'){
	$svcOsVisita = new OsVisitaService();
	$cdOs = '';

	if (isset($_GET['cdOs'])) {
		$cdOs = $_GET['cdOs'];	
    }

	$query = "SELECT CD_OS_VISITA,NR_OS,DS_OBSERVACOES,DT_VISITA FROM 
			os_visita
			WHERE 1 = 1 ";
			
	if ($cdOs != ""){
		$query = $query . '  AND NR_OS = '.$cdOs;
	}
	
	$query = $query . ' ORDER BY CD_OS_VISITA';	
	
	$elmnts = $svcOsVisita->getBySelect($query);
	$json = json_encode($elmnts);
	print("{\"totalCount\":".$svcOsVisita->getTotal().", \"items\": ".$json."}");
}

# 5º Relacionamento ações comerciais
else if($op == 'getListaAcaoComercialFichaServico'){
	$svcOsAcaoComercial = new OsAcaoComercialService();
	$cdOs = '';

	if (isset($_GET['cdOs'])) {
		$cdOs = $_GET['cdOs'];	
    }

	$query = "SELECT CD_OS_ACAO_COMERCIAL,NR_OS,DS_OBSERVACOES,DT_ACAO_COMERCIAL FROM 
			os_acao_comercial
			WHERE 1 = 1 ";
			
	if ($cdOs != ""){
		$query = $query . '  AND NR_OS = '.$cdOs;
	}
	
	$query = $query . ' ORDER BY CD_OS_ACAO_COMERCIAL';	
	
	$elmnts = $svcOsAcaoComercial->getBySelect($query);
	$json = json_encode($elmnts);
	print("{\"totalCount\":".$svcOsAcaoComercial->getTotal().", \"items\": ".$json."}");
}

# 6º Relacionametno licitação a realizar
else if($op == 'getListaLicitacaoRealizarFichaServico'){
	$svcOsLicitacao = new OsLicitacaoService();
	$cdOs = '';

	if (isset($_GET['cdOs'])) {
		$cdOs = $_GET['cdOs'];	
    }

	$query = "SELECT CD_OS_LICITACAO,NR_OS,CD_LICITACAO,DS_OBSERVACOES,
			CASE WHEN SN_PARTICIPA = 'S' THEN 'Sim' WHEN SN_PARTICIPA = 'N' THEN 'Não' END AS SN_PARTICIPA,
			CASE WHEN SN_REALIZADA = 'S' THEN 'Sim' WHEN SN_REALIZADA = 'N' THEN 'Não' END AS SN_REALIZADA
			FROM os_licitacao
			WHERE SN_REALIZADA = 'N' ";
			
	if ($cdOs != ""){
		$query = $query . '  AND NR_OS = '.$cdOs;
	}
	
	$query = $query . ' ORDER BY CD_OS_LICITACAO';	
	
	$elmnts = $svcOsLicitacao->getBySelect($query);
	$json = json_encode($elmnts);
	print("{\"totalCount\":".$svcOsLicitacao->getTotal().", \"items\": ".$json."}");
}

else if($op == 'getListaFichaServico'){
	$nmFantasia = '';
	$nmRazaoSocial = '';

	if (isset($_GET['nmFantasia'])) {
		$nmFantasia = strtoupper(trim($_GET['nmFantasia']));
	}
	if (isset($_GET['nmRazaoSocial'])) {
		$nmRazaoSocial = strtoupper(trim($_GET['nmRazaoSocial']));
	}
	
	$query = "SELECT 
				o.CD_OS,
				o.CD_EMPRESA,
				o.NR_SEQUENCIAL_EMPRESA,
				o.CD_STATUS_FICHA,
				sf.DS_STATUS_FICHA,
				o.NM_CONTRATANTE,
				o.CD_TIPO_SERVICO,
				ts.DS_TIPO_SERVICO,
				o.CD_AREA_ATUACAO,
				at.DS_AREA_ATUACAO,
				o.DS_PERFIL_GESTOR,
				o.DS_BARREIRA,
				o.VL_TOTAL_OS,
				o.CD_PESSOA_PJ,
				pj.NM_FANTASIA,
				pj.NM_RAZAO_SOCIAL,
				o.DT_ABERTURA				
				
				FROM os o 
				JOIN status_ficha sf ON sf.CD_STATUS_FICHA = o.CD_STATUS_FICHA
				JOIN tipo_servico ts ON ts.CD_TIPO_SERVICO = o.CD_TIPO_SERVICO
				JOIN area_atuacao at ON at.CD_AREA_ATUACAO = o.CD_AREA_ATUACAO
				JOIN pessoa_pj pj ON pj.CD_PESSOA_PJ = o.CD_PESSOA_PJ
				
               WHERE o.CD_EMPRESA = ".$_SESSION['CD_EMPRESA'];
	
	if ($nmFantasia != ""){
		$query = $query . ' AND pj.NM_FANTASIA LIKE "%'.$nmFantasia.'%"';
	}
	if ($nmRazaoSocial != ""){
		$query = $query . ' AND pj.NM_RAZAO_SOCIAL LIKE "%'.$nmRazaoSocial.'%"';
	}
    
	$query = $query . ' ORDER BY pj.NM_FANTASIA';	

	try {
		$elmnts = $svc->getBySelect($query);
		$json = json_encode($elmnts);
		print("{\"totalCount\":".$svc->getTotal().", \"items\": ".$json."}");
	} catch (Zend_Exception $e) {
		print('
			{ 
				"success":false, 
				"message": {
					"status":"database",
					"statusText":" '.$e->getMessage().'"
				}
			}'
		);
	} 
}

else if($op == 'inserir'){
	$data = json_decode(file_get_contents('php://input'));
	$elmnt = new OsVO();

	$elmnt->NR_SEQUENCIAL_EMPRESA = $data->{'NR_SEQUENCIAL_EMPRESA'};
	$elmnt->CD_STATUS_FICHA = $data->{'CD_STATUS_FICHA'};
	$elmnt->NM_CONTRATANTE = $data->{'NM_CONTRATANTE'};
	$elmnt->CD_TIPO_SERVICO = $data->{'CD_TIPO_SERVICO'};
	$elmnt->CD_AREA_ATUACAO = $data->{'CD_AREA_ATUACAO'};
	$elmnt->DS_PERFIL_GESTOR = $data->{'DS_PERFIL_GESTOR'};
	$elmnt->DS_BARREIRA = $data->{'DS_BARREIRA'};
	$elmnt->VL_TOTAL_OS = $data->{'VL_TOTAL_OS'};
	$elmnt->CD_PESSOA_PJ = $data->{'CD_PESSOA_PJ'};
	$elmnt->DT_ABERTURA = date('Y-m-d');
	$elmnt->CD_EMPRESA = $_SESSION['CD_EMPRESA'];
	
	$db = Zend_Db_Table::getDefaultAdapter();
	$db->beginTransaction();	
	try {	
		$svc->inserir($elmnt); 
		$elmnt->CD_OS = $svc->getLastInsertId(); 
		
		# 1º) Contratos -----------------------------------------------------------------------------
		$listaItContratoAnterior = json_decode($data->{'IT_CONTRATOS_ANTERIORES'},true);
		foreach($listaItContratoAnterior as $item) { 
			$elmntOsContrato = new OsContratoVO();
			$elmntOsContrato->NR_OS = $elmnt->CD_OS; 
			$elmntOsContrato->DS_OBSERVACOES = $item['DS_OBSERVACOES']; 
			$svcOsContrato->inserir($elmntOsContrato); 
		}
		
		# 2º) Investimentos -------------------------------------------------------------------------
		$listaItInvestimentoAnterior = json_decode($data->{'IT_INVESTIMENTOS'},true);
		foreach($listaItInvestimentoAnterior as $item) { 
			$elmntOsInvestimento = new OsInvestimentoVO();
			$elmntOsInvestimento->NR_OS = $elmnt->CD_OS; 
			$elmntOsInvestimento->DS_INVESTIMENTO = $item['DS_INVESTIMENTO']; 
			$elmntOsInvestimento->VL_INVESTIMENTO = $item['VL_INVESTIMENTO']; 
			$svcOsInvestimento->inserir($elmntOsInvestimento); 
		}

		# 3º) Licitações realizadas -----------------------------------------------------------------
		$listaItLicitacaoRealizada = json_decode($data->{'IT_LICITACOES_REALIZADAS'},true);
		foreach($listaItLicitacaoRealizada as $item) { 
			$elmntOsLicitacao = new OsLicitacaoVO();
			$elmntOsLicitacao->NR_OS = $elmnt->CD_OS; 
			$elmntOsLicitacao->CD_LICITACAO = $item['CD_LICITACAO']; 
			$elmntOsLicitacao->DS_OBSERVACOES = $item['DS_OBSERVACOES']; 
			$elmntOsLicitacao->SN_PARTICIPA = $item['SN_PARTICIPA']; 
			$elmntOsLicitacao->SN_REALIZADA = $item['SN_REALIZADA']; 
			$svcOsLicitacao->inserir($elmntOsLicitacao); 
		}
		
		# 4º) Visitas -------------------------------------------------------------------------------
		$listaItVisita = json_decode($data->{'IT_VISITAS'},true);
		foreach($listaItVisita as $item) { 
			$elmntOsVisita = new OsVisitaVO();
			$elmntOsVisita->NR_OS = $elmnt->CD_OS; 
			$elmntOsVisita->DS_OBSERVACOES = $item['DS_OBSERVACOES']; 
			$elmntOsVisita->DT_VISITA = $item['DT_VISITA']; 
			$svcOsVisita->inserir($elmntOsVisita); 
		}

		# 5º) Ação comercial ------------------------------------------------------------------------
		$listaItAcaoComercial = json_decode($data->{'IT_ACOES_COMERCIAIS'},true);
		foreach($listaItAcaoComercial as $item) { 
			$elmntOsAcaoComercial = new OsAcaoComercialVO();
			$elmntOsAcaoComercial->NR_OS = $elmnt->CD_OS; 
			$elmntOsAcaoComercial->DS_OBSERVACOES = $item['DS_OBSERVACOES']; 
			$elmntOsAcaoComercial->DT_ACAO_COMERCIAL = $item['DT_ACAO_COMERCIAL']; 
			$svcOsAcaoComercial->inserir($elmntOsAcaoComercial); 
		}
		
		# 6º) Licitações a realizar -----------------------------------------------------------------
		$listaItLicitacaoRealizar = json_decode($data->{'IT_LICITACOES_REALIZAR'},true);
		foreach($listaItLicitacaoRealizar as $item) { 
			$elmntOsLicitacao = new OsLicitacaoVO();
			$elmntOsLicitacao->NR_OS = $elmnt->CD_OS; 
			$elmntOsLicitacao->CD_LICITACAO = $item['CD_LICITACAO']; 
			$elmntOsLicitacao->DS_OBSERVACOES = $item['DS_OBSERVACOES']; 
			$elmntOsLicitacao->SN_PARTICIPA = $item['SN_PARTICIPA']; 
			$elmntOsLicitacao->SN_REALIZADA = $item['SN_REALIZADA']; 
			$svcOsLicitacao->inserir($elmntOsLicitacao); 
		}
		
		$db->commit();	
		$json = json_encode($elmnt);
		print("{\"success\":true".", \"items\": ".$json."}");
		
	} catch (Zend_Exception $e) {
		$db->rollBack();
		print('
			{ 
				"success":false, 
				"message": {
					"status":"database",
					"statusText":" '.$e->getMessage().'"
				}
			}'
		);
	} 
}

else if($op == 'alterar'){
	$data = json_decode(file_get_contents('php://input'));
	$elmnt = $svc->getVOByCD($data->{'CD_OS'});

	$elmnt->NR_SEQUENCIAL_EMPRESA = $data->{'NR_SEQUENCIAL_EMPRESA'};
	$elmnt->CD_STATUS_FICHA = $data->{'CD_STATUS_FICHA'};
	$elmnt->NM_CONTRATANTE = $data->{'NM_CONTRATANTE'};
	$elmnt->CD_TIPO_SERVICO = $data->{'CD_TIPO_SERVICO'};
	$elmnt->CD_AREA_ATUACAO = $data->{'CD_AREA_ATUACAO'};
	$elmnt->DS_PERFIL_GESTOR = $data->{'DS_PERFIL_GESTOR'};
	$elmnt->DS_BARREIRA = $data->{'DS_BARREIRA'};
	$elmnt->VL_TOTAL_OS = $data->{'VL_TOTAL_OS'};
	$elmnt->CD_PESSOA_PJ = $data->{'CD_PESSOA_PJ'};
	# $elmnt->DT_ABERTURA = date('Y-m-d');
	# $elmnt->CD_EMPRESA = $_SESSION['CD_EMPRESA'];

	$db = Zend_Db_Table::getDefaultAdapter();
	$db->beginTransaction();	
	try {	
		$svc->alterar($elmnt); 

		# 1º) Contratos anteriores ---------------------------------------------------------------------
		$listaItContratoAtualizado = json_decode($data->{'IT_CONTRATOS_ANTERIORES'},true);
		# Excluir um contrato que foi excluído da lista
		$queryOsContrato = "SELECT CD_OS_CONTRATO FROM os_contrato WHERE NR_OS = ".$data->{'CD_OS'};
		$listaItContratoExistente = $svcOsContrato->getBySelect($queryOsContrato,false);
		foreach ($listaItContratoExistente as $key => $codOsContratoExistentes){
			# Caso o contrato não esteja no array, excluir o contrato
			$achou = 0;
			foreach($listaItContratoAtualizado as $item) { 
				if ( $item['CD_OS_CONTRATO'] == $codOsContratoExistentes['CD_OS_CONTRATO']) {
					$achou = 1;
				}
			}
			if ( $achou == 0 ) {
				$queryOsContrato = "DELETE FROM os_contrato WHERE CD_OS_CONTRATO = ".$codOsContratoExistentes['CD_OS_CONTRATO'];
				$svcOsContrato->getBySelect($queryOsContrato,false);
			}
		}	
		# Incluir ou alterar um contrato
		foreach($listaItContratoAtualizado as $item) { 
			# inserir o registro na entidade os_contrato
			$elmntOsContrato = new OsContratoVO();
			$elmntOsContrato->DS_OBSERVACOES = $item['DS_OBSERVACOES']; 
			$elmntOsContrato->NR_OS = $data->{'CD_OS'};
			if ( $item['CD_OS_CONTRATO'] != "" && $item['CD_OS_CONTRATO'] != null ) {
				$elmntOsContrato->CD_OS_CONTRATO = $item['CD_OS_CONTRATO'];
				$svcOsContrato->alterar($elmntOsContrato); 	
			} else {
				$svcOsContrato->inserir($elmntOsContrato); 
			}
		}
		
		# 2º) Investimentos      ---------------------------------------------------------------------
		$listaItInvestimentoAtualizado = json_decode($data->{'IT_INVESTIMENTOS'},true);
		# Excluir um investimento que foi excluído da lista
		$queryOsInvestimento = "SELECT CD_OS_INVESTIMENTO FROM os_investimento WHERE NR_OS = ".$data->{'CD_OS'};
		$listaItInvestimentoExistente = $svcOsInvestimento->getBySelect($queryOsInvestimento,false);
		foreach ($listaItInvestimentoExistente as $key => $codOsInvestimentoExistentes){
			# Caso o investimento não esteja no array, excluir o investimento
			$achou = 0;
			foreach($listaItInvestimentoAtualizado as $item) { 
				if ( $item['CD_OS_INVESTIMENTO'] == $codOsInvestimentoExistentes['CD_OS_INVESTIMENTO']) {
					$achou = 1;
				}
			}
			if ( $achou == 0 ) {
				$queryOsInvestimento = "DELETE FROM os_investimento WHERE CD_OS_INVESTIMENTO = ".$codOsInvestimentoExistentes['CD_OS_INVESTIMENTO'];
				$svcOsInvestimento->getBySelect($queryOsInvestimento,false);
			}
		}	
		# Incluir ou alterar um investimento
		foreach($listaItInvestimentoAtualizado as $item) { 
			# inserir o registro na entidade os_investimento
			$elmntOsInvestimento = new OsInvestimentoVO();
			$elmntOsInvestimento->NR_OS = $data->{'CD_OS'};
			$elmntOsInvestimento->DS_INVESTIMENTO = $item['DS_INVESTIMENTO']; 
			$elmntOsInvestimento->VL_INVESTIMENTO = $item['VL_INVESTIMENTO']; 
			if ( $item['CD_OS_INVESTIMENTO'] != "" && $item['CD_OS_INVESTIMENTO'] != null ) {
				$elmntOsInvestimento->CD_OS_INVESTIMENTO = $item['CD_OS_INVESTIMENTO'];
				$svcOsInvestimento->alterar($elmntOsInvestimento); 	
			} else {
				$svcOsInvestimento->inserir($elmntOsInvestimento); 
			}
		}
		
		# 3º) Licitações realizadas ---------------------------------------------------------------------
		$listaItLicitacaoAtualizado = json_decode($data->{'IT_LICITACOES_REALIZADAS'},true);
		# Excluir uma licitação que foi excluído da lista
		$queryOsLicitacao = "SELECT CD_OS_LICITACAO FROM os_licitacao WHERE SN_REALIZADA = 'S' AND NR_OS = ".$data->{'CD_OS'};
		$listaItLicitacaoExistente = $svcOsLicitacao->getBySelect($queryOsLicitacao,false);
		foreach ($listaItLicitacaoExistente as $key => $codOsLicitacaoExistentes){
			# Caso a licitacao não esteja no array, excluir o licitacao
			$achou = 0;
			foreach($listaItLicitacaoAtualizado as $item) { 
				if ( $item['CD_OS_LICITACAO'] == $codOsLicitacaoExistentes['CD_OS_LICITACAO']) {
					$achou = 1;
				}
			}
			if ( $achou == 0 ) {
				$queryOsLicitacao = "DELETE FROM os_licitacao WHERE CD_OS_LICITACAO = ".$codOsLicitacaoExistentes['CD_OS_LICITACAO'];
				$svcOsLicitacao->getBySelect($queryOsLicitacao,false);
			}
		}	
		# Incluir ou alterar uma licitacao
		foreach($listaItLicitacaoAtualizado as $item) { 
			# inserir o registro na entidade os_licitacao
			$elmntOsLicitacao = new OsLicitacaoVO();
			$elmntOsLicitacao->DS_OBSERVACOES = $item['DS_OBSERVACOES']; 
			$elmntOsLicitacao->NR_OS = $data->{'CD_OS'};
			$elmntOsLicitacao->CD_LICITACAO = $item['CD_LICITACAO'];
			$elmntOsLicitacao->SN_PARTICIPA = $item['SN_PARTICIPA'];
			$elmntOsLicitacao->SN_REALIZADA = $item['SN_REALIZADA'];
			if ( $item['CD_OS_LICITACAO'] != "" && $item['CD_OS_LICITACAO'] != null ) {
				$elmntOsLicitacao->CD_OS_LICITACAO = $item['CD_OS_LICITACAO'];
				$svcOsLicitacao->alterar($elmntOsLicitacao); 	
			} else {
				$svcOsLicitacao->inserir($elmntOsLicitacao); 
			}
		}
		
		# 4º) Visitas      ---------------------------------------------------------------------
		$listaItVisitaAtualizado = json_decode($data->{'IT_VISITAS'},true);
		# Excluir uma visita que foi excluído da lista
		$queryOsVisita = "SELECT CD_OS_VISITA FROM os_visita WHERE NR_OS = ".$data->{'CD_OS'};
		$listaItVisitaExistente = $svcOsVisita->getBySelect($queryOsVisita,false);
		foreach ($listaItVisitaExistente as $key => $codOsVisitaExistentes){
			# Caso a visita não esteja no array, excluir a visita
			$achou = 0;
			foreach($listaItVisitaAtualizado as $item) { 
				if ( $item['CD_OS_VISITA'] == $codOsVisitaExistentes['CD_OS_VISITA']) {
					$achou = 1;
				}
			}
			if ( $achou == 0 ) {
				$queryOsVisita = "DELETE FROM os_visita WHERE CD_OS_VISITA = ".$codOsVisitaExistentes['CD_OS_VISITA'];
				$svcOsVisita->getBySelect($queryOsVisita,false);
			}
		}	
		# Incluir ou alterar uma visita
		foreach($listaItVisitaAtualizado as $item) { 
			# inserir o registro na entidade os_visita
			$elmntOsVisita = new OsVisitaVO();
			$elmntOsVisita->NR_OS = $data->{'CD_OS'};
			$elmntOsVisita->DS_OBSERVACOES = $item['DS_OBSERVACOES']; 
			$elmntOsVisita->DT_VISITA = $item['DT_VISITA']; 
			if ( $item['CD_OS_VISITA'] != "" && $item['CD_OS_VISITA'] != null ) {
				$elmntOsVisita->CD_OS_VISITA = $item['CD_OS_VISITA'];
				$svcOsVisita->alterar($elmntOsVisita); 	
			} else {
				$svcOsVisita->inserir($elmntOsVisita); 
			}
		}

		# 5º) Ação comercial ---------------------------------------------------------------------
		$listaItAcaoComercialAtualizado = json_decode($data->{'IT_ACOES_COMERCIAIS'},true);
		# Excluir uma ação comercial que foi excluído da lista
		$queryOsAcaoComercial = "SELECT CD_OS_ACAO_COMERCIAL FROM os_acao_comercial WHERE NR_OS = ".$data->{'CD_OS'};
		$listaItAcaoComercialExistente = $svcOsAcaoComercial->getBySelect($queryOsAcaoComercial,false);
		foreach ($listaItAcaoComercialExistente as $key => $codOsAcaoComercialExistentes){
			# Caso a ação comercial não esteja no array, excluir a ação comercial
			$achou = 0;
			foreach($listaItAcaoComercialAtualizado as $item) { 
				if ( $item['CD_OS_ACAO_COMERCIAL'] == $codOsAcaoComercialExistentes['CD_OS_ACAO_COMERCIAL']) {
					$achou = 1;
				}
			}
			if ( $achou == 0 ) {
				$queryOsAcaoComercial = "DELETE FROM os_acao_comercial WHERE CD_OS_ACAO_COMERCIAL = ".$codOsAcaoComercialExistentes['CD_OS_ACAO_COMERCIAL'];
				$svcOsAcaoComercial->getBySelect($queryOsAcaoComercial,false);
			}
		}	
		# Incluir ou alterar uma ação comercial
		foreach($listaItAcaoComercialAtualizado as $item) { 
			# inserir o registro na entidade os_acao_comercial
			$elmntOsAcaoComercial = new OsAcaoComercialVO();
			$elmntOsAcaoComercial->NR_OS = $data->{'CD_OS'};
			$elmntOsAcaoComercial->DS_OBSERVACOES = $item['DS_OBSERVACOES']; 
			$elmntOsAcaoComercial->DT_ACAO_COMERCIAL = $item['DT_ACAO_COMERCIAL']; 
			if ( $item['CD_OS_ACAO_COMERCIAL'] != "" && $item['CD_OS_ACAO_COMERCIAL'] != null ) {
				$elmntOsAcaoComercial->CD_OS_ACAO_COMERCIAL = $item['CD_OS_ACAO_COMERCIAL'];
				$svcOsAcaoComercial->alterar($elmntOsAcaoComercial); 	
			} else {
				$svcOsAcaoComercial->inserir($elmntOsAcaoComercial); 
			}
		}
		
		# 6º) Licitações a realizar ---------------------------------------------------------------------
		$listaItLicitacaoAtualizado = json_decode($data->{'IT_LICITACOES_REALIZAR'},true);
		# Excluir uma licitação que foi excluído da lista
		$queryOsLicitacao = "SELECT CD_OS_LICITACAO FROM os_licitacao WHERE SN_REALIZADA = 'N' AND NR_OS = ".$data->{'CD_OS'};
		$listaItLicitacaoExistente = $svcOsLicitacao->getBySelect($queryOsLicitacao,false);
		foreach ($listaItLicitacaoExistente as $key => $codOsLicitacaoExistentes){
			# Caso a licitacao não esteja no array, excluir o licitacao
			$achou = 0;
			foreach($listaItLicitacaoAtualizado as $item) { 
				if ( $item['CD_OS_LICITACAO'] == $codOsLicitacaoExistentes['CD_OS_LICITACAO']) {
					$achou = 1;
				}
			}
			if ( $achou == 0 ) {
				$queryOsLicitacao = "DELETE FROM os_licitacao WHERE CD_OS_LICITACAO = ".$codOsLicitacaoExistentes['CD_OS_LICITACAO'];
				$svcOsLicitacao->getBySelect($queryOsLicitacao,false);
			}
		}	
		# Incluir ou alterar uma licitacao
		foreach($listaItLicitacaoAtualizado as $item) { 
			# inserir o registro na entidade os_licitacao
			$elmntOsLicitacao = new OsLicitacaoVO();
			$elmntOsLicitacao->DS_OBSERVACOES = $item['DS_OBSERVACOES']; 
			$elmntOsLicitacao->NR_OS = $data->{'CD_OS'};
			$elmntOsLicitacao->CD_LICITACAO = $item['CD_LICITACAO'];
			$elmntOsLicitacao->SN_PARTICIPA = $item['SN_PARTICIPA'];
			$elmntOsLicitacao->SN_REALIZADA = $item['SN_REALIZADA'];
			if ( $item['CD_OS_LICITACAO'] != "" && $item['CD_OS_LICITACAO'] != null ) {
				$elmntOsLicitacao->CD_OS_LICITACAO = $item['CD_OS_LICITACAO'];
				$svcOsLicitacao->alterar($elmntOsLicitacao); 	
			} else {
				$svcOsLicitacao->inserir($elmntOsLicitacao); 
			}
		}
		
		$db->commit();	
		$json = json_encode($elmnt);
		print("{\"success\":true".", \"items\": ".$json."}");
			
	} catch (Zend_Exception $e) {
		$db->rollBack();
		print('
			{ 
				"success":false, 
				"message": {
					"status":"database",
					"statusText":" '.$e->getMessage().'"
				}
			}'
		);
	}      
}

else if($op == 'excluir'){
	$db = Zend_Db_Table::getDefaultAdapter();
	$db->beginTransaction();	
	try {
		$svc->inativarPessoaPj($_POST['cdPessoaPj']);
		$db->commit();	
		print("{\"success\":true"."}");
	} catch (Zend_Exception $e) {
		$db->rollBack();
		print('
			{ 
				"success":false, 
				"message": {
					"status":"database",
					"statusText":" '.$e->getMessage().'"
				}
			}'
		);
	}     
}

else{
	print('
		{ 
			"success":false, 
			"message": {
				"status":"general",
				"statusText":"'.$erro.'"
			}
		}'
	);
}

?>