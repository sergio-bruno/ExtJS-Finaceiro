<?php
$utltimoCaracter = substr($_SERVER['DOCUMENT_ROOT'], -1);
if ( $utltimoCaracter == '/' ) {
	include_once($_SERVER['DOCUMENT_ROOT'].'eHoplon/erp/seguranca.php'); 
	include_once($_SERVER['DOCUMENT_ROOT'].'eHoplon/InitZend.php');	
	include_once($_SERVER['DOCUMENT_ROOT']."eHoplon/erp/controller/util.php");
} else {
	include_once($_SERVER['DOCUMENT_ROOT'].'/eHoplon/erp/seguranca.php'); 
	include_once($_SERVER['DOCUMENT_ROOT'].'/eHoplon/InitZend.php');
	include_once($_SERVER['DOCUMENT_ROOT']."/eHoplon/erp/controller/util.php");
}
protegePagina("../../login.php");

error_reporting(E_ALL);
ini_set('display_errors', 'on');

$op = $_GET['op'];

if($op == 'getListaPessoaPjCliente'){
	$svcPessoaPj = new PessoaPjService();
	$cdPessoaPj = '';
	$nmRazaoSocial = '';
	$nmFantasia = '';

	if (isset($_GET['cdPessoaPj'])) {
		$cdPessoaPj = $_GET['cdPessoaPj'];	
    }
	if (isset($_GET['nmRazaoSocial'])) {
		$nmRazaoSocial = $_GET['nmRazaoSocial'];	
    }
	if (isset($_GET['nmFantasia'])) {
		$nmFantasia = $_GET['nmFantasia'];	
    }

	$query = "SELECT pj.CD_PESSOA_PJ, pj.NM_RAZAO_SOCIAL, pj.NM_FANTASIA 
			  FROM pessoa_pj pj
			  JOIN pessoa_pj_cliente pc ON pc.CD_PESSOA_PJ = pj.CD_PESSOA_PJ
			  WHERE pj.SN_ATIVO = 'S' AND pj.CD_EMPRESA = ".$_SESSION['CD_EMPRESA'];
			
	if ($cdPessoaPj != ""){
		$query = $query . '  AND pc.CD_PESSOA_PJ = '.$cdPessoaPj;
	}
	if ($nmRazaoSocial != ""){
		$query = $query . '  AND pj.NM_RAZAO_SOCIAL LIKE "%'.$nmRazaoSocial.'%"';
	}
	if ($nmFantasia != ""){
		$query = $query . '  AND pj.NM_FANTASIA LIKE "%'.$nmFantasia.'%"';
	}
	$query = $query . ' ORDER BY pj.NM_RAZAO_SOCIAL';	
	
	$elmnts = $svcPessoaPj->getBySelect($query,false);
	$json = json_encode($elmnts);
	print("{\"totalCount\":".$svcPessoaPj->getTotal().", \"items\": ".$json."}");
}

else if($op == 'getListaPessoaPj'){
	$svcPessoaPj = new PessoaPjService();
	$cdPessoaPj = '';
	$nmRazaoSocial = '';
	$nmFantasia = '';

	if (isset($_GET['cdPessoaPj'])) {
		$cdPessoaPj = $_GET['cdPessoaPj'];
	}
	if (isset($_GET['nmRazaoSocial'])) {
		$nmRazaoSocial = $_GET['nmRazaoSocial'];
	}
	if (isset($_GET['nmFantasia'])) {
		$nmFantasia = $_GET['nmFantasia'];
	}

	$query = "SELECT pj.CD_PESSOA_PJ, pj.NM_RAZAO_SOCIAL, pj.NM_FANTASIA
			  FROM pessoa_pj pj
			  WHERE pj.SN_ATIVO = 'S' AND pj.CD_EMPRESA = ".$_SESSION['CD_EMPRESA'];
		
	if ($cdPessoaPj != ""){
		$query = $query . '  AND pj.CD_PESSOA_PJ = '.$cdPessoaPj;
	}
	if ($nmRazaoSocial != ""){
		$query = $query . '  AND pj.NM_RAZAO_SOCIAL LIKE "%'.$nmRazaoSocial.'%"';
	}
	if ($nmFantasia != ""){
		$query = $query . '  AND pj.NM_FANTASIA LIKE "%'.$nmFantasia.'%"';
	}
	$query = $query . ' ORDER BY pj.NM_RAZAO_SOCIAL';

	$elmnts = $svcPessoaPj->getBySelect($query,false);
	$json = json_encode($elmnts);
	print("{\"totalCount\":".$svcPessoaPj->getTotal().", \"items\": ".$json."}");
}

else if($op == 'getListaPessoa'){
	$svcPessoa = new PessoaService();
	$cdPessoa = '';
	$nmPessoa = '';

	if (isset($_GET['cdPessoa'])) {
		$cdPessoa = $_GET['cdPessoa'];
	}
	if (isset($_GET['nmPessoa'])) {
		$nmPessoa = $_GET['nmPessoa'];
	}

	$query = "SELECT CD_PESSOA, NM_PESSOA
			  FROM pessoa
			  WHERE SN_ATIVO = 'S' AND CD_EMPRESA = ".$_SESSION['CD_EMPRESA'];

	if ($cdPessoa != ""){
		$query = $query . '  AND CD_PESSOA = '.$cdPessoa;
	}
	if ($nmPessoa != ""){
		$query = $query . '  AND NM_PESSOA LIKE "%'.$nmPessoa.'%"';
	}
	$query = $query . ' ORDER BY NM_PESSOA';

	$elmnts = $svcPessoa->getBySelect($query,false);
	$json = json_encode($elmnts);
	print("{\"totalCount\":".$svcPessoa->getTotal().", \"items\": ".$json."}");
}


else if($op == 'getListaPlanoContaSinteticoDebito'){
	$svcPlanoConta = new PlanoContaService();
	$cdPlanoConta = '';
	$dsPlanoConta = '';

	if (isset($_GET['cdPlanoConta'])) {
		$cdPlanoConta = $_GET['cdPlanoConta'];
	}
	if (isset($_GET['dsPlanoConta'])) {
		$dsPlanoConta = $_GET['dsPlanoConta'];
	}

	$query = "SELECT CD_PLANO_CONTA, DS_PLANO_CONTA
			  FROM plano_conta
			  WHERE SN_ATIVO = 'S' AND TP_LANCAMENTO='D' AND TP_CONTA='S' AND CD_EMPRESA = ".$_SESSION['CD_EMPRESA'];

	if ($cdPlanoConta != ""){
		$query = $query . '  AND CD_PLANO_CONTA = '.$cdPlanoConta;
	}
	if ($dsPlanoConta != ""){
		$query = $query . '  AND DS_PLANO_CONTA LIKE "%'.$dsPlanoConta.'%"';
	}
	$query = $query . ' ORDER BY DS_PLANO_CONTA';

	$elmnts = $svcPlanoConta->getBySelect($query,false);
	$json = json_encode($elmnts);
	print("{\"totalCount\":".$svcPlanoConta->getTotal().", \"items\": ".$json."}");
}

else if($op == 'getListaPlanoContaSinteticoCredito'){
	$svcPlanoConta = new PlanoContaService();
	$cdPlanoConta = '';
	$dsPlanoConta = '';

	if (isset($_GET['cdPlanoConta'])) {
		$cdPlanoConta = $_GET['cdPlanoConta'];
	}
	if (isset($_GET['dsPlanoConta'])) {
		$dsPlanoConta = $_GET['dsPlanoConta'];
	}

	$query = "SELECT CD_PLANO_CONTA, DS_PLANO_CONTA
			  FROM plano_conta
			  WHERE SN_ATIVO = 'S' AND TP_LANCAMENTO='C' AND TP_CONTA='S' AND CD_EMPRESA = ".$_SESSION['CD_EMPRESA'];

	if ($cdPlanoConta != ""){
		$query = $query . '  AND CD_PLANO_CONTA = '.$cdPlanoConta;
	}
	if ($dsPlanoConta != ""){
		$query = $query . '  AND DS_PLANO_CONTA LIKE "%'.$dsPlanoConta.'%"';
	}
	$query = $query . ' ORDER BY DS_PLANO_CONTA';

	$elmnts = $svcPlanoConta->getBySelect($query,false);
	$json = json_encode($elmnts);
	print("{\"totalCount\":".$svcPlanoConta->getTotal().", \"items\": ".$json."}");
}

else if($op == 'getListaStatusFicha'){
	$cdStatusFicha = '';
	$dsStatusFicha = '';

	if (isset($_GET['cdStatusFicha'])) {
		$cdStatusFicha = $_GET['cdStatusFicha'];	
    }
	if (isset($_GET['dsStatusFicha'])) {
		$dsStatusFicha = $_GET['dsStatusFicha'];	
    }

	$query = "SELECT CD_STATUS_FICHA, DS_STATUS_FICHA FROM status_ficha
			  WHERE SN_ATIVO = 'S' AND CD_EMPRESA = ".$_SESSION['CD_EMPRESA'];
			
	if ($cdStatusFicha != ""){
		$query = $query . '  AND CD_STATUS_FICHA = '.$cdStatusFicha;
	}
	if ($dsStatusFicha != ""){
		$query = $query . '  AND DS_STATUS_FICHA LIKE "%'.$dsStatusFicha.'%"';
	}
	$query = $query . ' ORDER BY DS_STATUS_FICHA';	
	$svcStatusFicha = new TipoContatoService();
	$elmnts = $svcStatusFicha->getBySelect($query,false);
	$json = json_encode($elmnts);
	print("{\"totalCount\":".$svcStatusFicha->getTotal().", \"items\": ".$json."}");
}

else if($op == 'getListaAreaAtuacao'){
	$cdAreaAtuacao = '';
	$dsAreaAtuacao = '';

	if (isset($_GET['cdAreaAtuacao'])) {
		$cdAreaAtuacao = $_GET['cdAreaAtuacao'];	
    }
	if (isset($_GET['dsAreaAtuacao'])) {
		$dsAreaAtuacao = $_GET['dsAreaAtuacao'];	
    }

	$query = "SELECT CD_AREA_ATUACAO, DS_AREA_ATUACAO FROM area_atuacao
			  WHERE SN_ATIVO = 'S' AND CD_EMPRESA = ".$_SESSION['CD_EMPRESA'];
			
	if ($cdAreaAtuacao != ""){
		$query = $query . '  AND CD_AREA_ATUACAO = '.$cdAreaAtuacao;
	}
	if ($dsAreaAtuacao != ""){
		$query = $query . '  AND DS_AREA_ATUACAO LIKE "%'.$dsAreaAtuacao.'%"';
	}
	$query = $query . ' ORDER BY DS_AREA_ATUACAO';	
	$svcAreaAtuacao = new TipoContatoService();
	$elmnts = $svcAreaAtuacao->getBySelect($query,false);
	$json = json_encode($elmnts);
	print("{\"totalCount\":".$svcAreaAtuacao->getTotal().", \"items\": ".$json."}");
}

else if($op == 'getListaTipoServico'){
	$cdTipoServico = '';
	$dsTipoServico = '';

	if (isset($_GET['cdTipoServico'])) {
		$cdTipoServico = $_GET['cdTipoServico'];	
    }
	if (isset($_GET['dsTipoServico'])) {
		$dsTipoServico = $_GET['dsTipoServico'];	
    }

	$query = "SELECT CD_TIPO_SERVICO, DS_TIPO_SERVICO FROM tipo_servico
			  WHERE SN_ATIVO = 'S' AND CD_EMPRESA = ".$_SESSION['CD_EMPRESA'];
			
	if ($cdTipoServico != ""){
		$query = $query . '  AND CD_TIPO_SERVICO = '.$cdTipoServico;
	}
	if ($dsTipoServico != ""){
		$query = $query . '  AND DS_TIPO_SERVICO LIKE "%'.$dsTipoServico.'%"';
	}
	$query = $query . ' ORDER BY DS_TIPO_SERVICO';	
	$svcTipoServico = new TipoContatoService();
	$elmnts = $svcTipoServico->getBySelect($query,false);
	$json = json_encode($elmnts);
	print("{\"totalCount\":".$svcTipoServico->getTotal().", \"items\": ".$json."}");
}

else if($op == 'getListaEstadoCivil'){
	$svcEstadoCivil = new EstadoCivilService();
	$cdEstadoCivil = '';
	$dsEstadoCivil = '';

	if (isset($_GET['cdEstadoCivil'])) {
		$cdEstadoCivil = $_GET['cdEstadoCivil'];	
    }
	if (isset($_GET['dsEstadoCivil'])) {
		$dsEstadoCivil = $_GET['dsEstadoCivil'];	
    }

	$query = "SELECT CD_ESTADO_CIVIL, DS_ESTADO_CIVIL, SN_ATIVO FROM estado_civil
			  WHERE SN_ATIVO = 'S' ";
			
	if ($cdEstadoCivil != ""){
		$query = $query . '  AND CD_ESTADO_CIVIL = '.$cdEstadoCivil;
	}
	if ($dsEstadoCivil != ""){
		$query = $query . '  AND DS_ESTADO_CIVIL LIKE "%'.$dsEstadoCivil.'%"';
	}
	$query = $query . ' ORDER BY DS_ESTADO_CIVIL';	
	
	$elmnts = $svcEstadoCivil->getBySelect($query,false);
	$json = json_encode($elmnts);
	print("{\"totalCount\":".$svcEstadoCivil->getTotal().", \"items\": ".$json."}");
}

else if($op == 'getListaClassificacao'){
	$svcClassificacao = new ClassificacaoService();
	$cdClassificacao = '';
	$dsClassificacao = '';
	if (isset($_GET['cdClassificacao'])) {
		$cdClassificacao = $_GET['cdClassificacao'];	
    }
	if (isset($_GET['dsClassificacao'])) {
		$dsClassificacao = $_GET['dsClassificacao'];	
    }
	$query = "SELECT CD_CLASSIFICACAO, DS_CLASSIFICACAO FROM classificacao
			  WHERE SN_ATIVO = 'S' AND CD_EMPRESA = ".$_SESSION['CD_EMPRESA'];
			
	if ($cdClassificacao != ""){
		$query = $query . '  AND CD_CLASSIFICACAO = '.$cdClassificacao;
	}
	if ($dsClassificacao != ""){
		$query = $query . '  AND DS_CLASSIFICACAO LIKE "%'.$dsClassificacao.'%"';
	}
	$query = $query . ' ORDER BY DS_CLASSIFICACAO';	
	$elmnts = $svcClassificacao->getBySelect($query,false);
	$json = json_encode($elmnts);
	print("{\"totalCount\":".$svcClassificacao->getTotal().", \"items\": ".$json."}");
}

else if($op == 'getListaStatusCliente'){
	$svcStatusCliente = new StatusClienteService();
	$cdStatusCliente = '';
	$dsStatusCliente = '';
	if (isset($_GET['cdStatusCliente'])) {
		$cdStatusCliente = $_GET['cdStatusCliente'];	
    }
	if (isset($_GET['dsStatusCliente'])) {
		$dsStatusCliente = $_GET['dsStatusCliente'];	
    }
	$query = "SELECT CD_STATUS_CLIENTE, DS_STATUS_CLIENTE FROM status_cliente
			  WHERE SN_ATIVO = 'S' AND CD_EMPRESA = ".$_SESSION['CD_EMPRESA'];
			
	if ($cdStatusCliente != ""){
		$query = $query . '  AND CD_STATUS_CLIENTE = '.$cdStatusCliente;
	}
	if ($dsStatusCliente != ""){
		$query = $query . '  AND DS_STATUS_CLIENTE LIKE "%'.$dsStatusCliente.'%"';
	}
	$query = $query . ' ORDER BY DS_STATUS_CLIENTE';	
	$elmnts = $svcStatusCliente->getBySelect($query,false);
	$json = json_encode($elmnts);
	print("{\"totalCount\":".$svcStatusCliente->getTotal().", \"items\": ".$json."}");
}

else if($op == 'getListaEscolaridade'){
	$svcEscolaridade = new EscolaridadeService();
	$dsEscolaridade = '';
	$cdEscolaridade = '';

	if (isset($_GET['cdEscolaridade'])) {
		$cdEscolaridade = $_GET['cdEscolaridade'];	
    }
	if (isset($_GET['dsEscolaridade'])) {
		$dsEscolaridade = $_GET['dsEscolaridade'];	
    }

	$query = "SELECT CD_ESCOLARIDADE, DS_ESCOLARIDADE, SN_ATIVO FROM escolaridade
			  WHERE SN_ATIVO = 'S' ";
			
	if ($cdEscolaridade != ""){
		$query = $query . '  AND CD_ESCOLARIDADE = '.$cdEscolaridade;
	}
	if ($dsEscolaridade != ""){
		$query = $query . '  AND DS_ESCOLARIDADE LIKE "%'.$dsEscolaridade.'%"';
	}
	$query = $query . ' ORDER BY DS_ESCOLARIDADE';	
	
	$elmnts = $svcEscolaridade->getBySelect($query,false);
	$json = json_encode($elmnts);
	print("{\"totalCount\":".$svcEscolaridade->getTotal().", \"items\": ".$json."}");
}

else if($op == 'getListaReligiao'){
	$svcReligiao = new ReligiaoService();
	$cdReligiao = '';
	$dsReligiao = '';

	if (isset($_GET['cdReligiao'])) {
		$cdReligiao = $_GET['cdReligiao'];	
    }
	if (isset($_GET['dsReligiao'])) {
		$dsReligiao = $_GET['dsReligiao'];	
    }

	$query = "SELECT CD_RELIGIAO, DS_RELIGIAO, SN_ATIVO FROM religiao
			  WHERE SN_ATIVO = 'S' ";
			
	if ($cdReligiao != ""){
		$query = $query . '  AND CD_RELIGIAO ='.$cdReligiao;
	}
	if ($dsReligiao != ""){
		$query = $query . '  AND DS_RELIGIAO LIKE "%'.$dsReligiao.'%"';
	}
	$query = $query . ' ORDER BY DS_RELIGIAO';	
	
	$elmnts = $svcReligiao->getBySelect($query,false);
	$json = json_encode($elmnts);
	print("{\"totalCount\":".$svcReligiao->getTotal().", \"items\": ".$json."}");
}

else if($op == 'getListaTipoContato'){
	$cdTipoContato = '';
	$dsTipoContato = '';

	if (isset($_GET['cdTipoContato'])) {
		$cdTipoContato = $_GET['cdTipoContato'];	
    }
	if (isset($_GET['dsTipoContato'])) {
		$dsTipoContato = $_GET['dsTipoContato'];	
    }

	$query = "SELECT CD_TIPO_CONTATO, DS_TIPO_CONTATO FROM tipo_contato
			  WHERE SN_ATIVO = 'S' AND CD_EMPRESA = ".$_SESSION['CD_EMPRESA'];
			
	if ($cdTipoContato != ""){
		$query = $query . '  AND CD_TIPO_CONTATO = '.$cdTipoContato;
	}
	if ($dsTipoContato != ""){
		$query = $query . '  AND DS_TIPO_CONTATO LIKE "%'.$dsTipoContato.'%"';
	}
	$query = $query . ' ORDER BY DS_TIPO_CONTATO';	
	$svcTipoContato = new TipoContatoService();
	$elmnts = $svcTipoContato->getBySelect($query,false);
	$json = json_encode($elmnts);
	print("{\"totalCount\":".$svcTipoContato->getTotal().", \"items\": ".$json."}");
}

else if($op == 'getListaTipoEndereco'){
	$svcTipoEndereco = new TipoEnderecoService();
	$cdTipoEndereco = '';
	$dsTipoEndereco = '';

	if (isset($_GET['cdTipoEndereco'])) {
		$cdTipoEndereco = $_GET['cdTipoEndereco'];	
    }
	if (isset($_GET['dsTipoEndereco'])) {
		$dsTipoEndereco = $_GET['dsTipoEndereco'];	
    }

	$query = "SELECT CD_TIPO_ENDERECO, DS_TIPO_ENDERECO FROM tipo_endereco
			  WHERE SN_ATIVO = 'S' AND CD_EMPRESA = ".$_SESSION['CD_EMPRESA'];
			
	if ($cdTipoEndereco != ""){
		$query = $query . '  AND CD_TIPO_ENDERECO = '.$cdTipoEndereco;
	}
	if ($dsTipoEndereco != ""){
		$query = $query . '  AND DS_TIPO_ENDERECO LIKE "%'.$dsTipoEndereco.'%"';
	}
	$query = $query . ' ORDER BY DS_TIPO_ENDERECO';	
	
	$elmnts = $svcTipoEndereco->getBySelect($query,false);
	$json = json_encode($elmnts);
	print("{\"totalCount\":".$svcTipoEndereco->getTotal().", \"items\": ".$json."}");
}

else if($op == 'getListaTipoLogradouro'){
	$svcTipoLogradouro = new TipoLogradouroService();
	$cdTipoLogradouro = '';
	$dsTipoLogradouro = '';

	if (isset($_GET['cdTipoLogradouro'])) {
		$cdTipoLogradouro = $_GET['cdTipoLogradouro'];	
    }
	if (isset($_GET['dsTipoLogradouro'])) {
		$dsTipoLogradouro = $_GET['dsTipoLogradouro'];	
    }

	$query = "SELECT CD_TIPO_LOGRADOURO, DS_TIPO_LOGRADOURO, DS_TIPO_LOGRADOURO_ABREV 
			  FROM tipo_logradouro
			  WHERE 1 = 1 ";
			
	if ($cdTipoLogradouro != ""){
		$query = $query . '  AND CD_TIPO_LOGRADOURO = '.$cdTipoLogradouro;
	}
	if ($dsTipoLogradouro != ""){
		$query = $query . '  AND DS_TIPO_LOGRADOURO LIKE "%'.$dsTipoLogradouro.'%"';
	}
	$query = $query . ' ORDER BY DS_TIPO_LOGRADOURO';	
	
	$elmnts = $svcTipoLogradouro->getBySelect($query,false);
	$json = json_encode($elmnts);
	print("{\"totalCount\":".$svcTipoLogradouro->getTotal().", \"items\": ".$json."}");
}

else if($op == 'getListaCargo'){
	$cdCargo = '';
	$dsCargo = '';
	if (isset($_GET['cdCargo'])) {
		$cdCargo = $_GET['cdCargo'];	
    }
	if (isset($_GET['dsCargo'])) {
		$dsCargo = $_GET['dsCargo'];	
    }
	$query = "SELECT CD_CARGO, DS_CARGO FROM cargo
			  WHERE SN_ATIVO = 'S' AND CD_EMPRESA = ".$_SESSION['CD_EMPRESA'];
			
	if ($cdCargo != ""){
		$query = $query . '  AND CD_CARGO = '.$cdCargo;
	}
	if ($dsCargo != ""){
		$query = $query . '  AND DS_CARGO LIKE "%'.$dsCargo.'%"';
	}
	$query = $query . ' ORDER BY DS_CARGO';	
	try {
		$svcCargo = new CargoService();
		$elmnts = $svcCargo->getBySelect($query,false);
		$json = json_encode($elmnts);
		print("{\"totalCount\":".$svcCargo->getTotal().", \"items\": ".$json."}");
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

else if($op == 'getListaEspecieDocumento'){
	$cdEspecieDocumento = '';
	$dsEspecieDocumento = '';
	if (isset($_GET['cdEspecieDocumento'])) {
		$cdEspecieDocumento = $_GET['cdEspecieDocumento'];
	}
	if (isset($_GET['dsEspecieDocumento'])) {
		$dsEspecieDocumento = $_GET['dsEspecieDocumento'];
	}
	$query = "SELECT CD_ESPECIE_DOCUMENTO, DS_ESPECIE_DOCUMENTO, CD_EXTERNO FROM especie_documento
			  WHERE 1 = 1 ";
		
	if ($cdEspecieDocumento != ""){
		$query = $query . '  AND CD_ESPECIE_DOCUMENTO = '.$cdEspecieDocumento;
	}
	if ($dsEspecieDocumento != ""){
		$query = $query . '  AND DS_ESPECIE_DOCUMENTO LIKE "%'.$dsEspecieDocumento.'%"';
	}
	$query = $query . ' ORDER BY DS_ESPECIE_DOCUMENTO';
	try {
		$svcEspecieDocumento = new EspecieDocumentoService();
		$elmnts = $svcEspecieDocumento->getBySelect($query,false);
		$json = json_encode($elmnts);
		print("{\"totalCount\":".$svcEspecieDocumento->getTotal().", \"items\": ".$json."}");
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

else if($op == 'getListaCidade'){
	$cdCidade = '';
	$dsCidade = '';
	if (isset($_GET['cdCidade'])) {
		$cdCidade = trim($_GET['cdCidade']);
	}
	if (isset($_GET['dsCidade'])) {
		$dsCidade = strtoupper(trim($_GET['dsCidade']));
	}
	$query = "SELECT CD_CIDADE, CONCAT(CD_UF,' - ',DS_CIDADE) DS_CIDADE, SN_ATIVO, CD_IBGE, CD_UF 
		FROM cidade 
		WHERE SN_ATIVO = 'S' ";
	if ($cdCidade != ""){
		$query = $query . '  AND CD_CIDADE = '.$cdCidade;
	} else if ($dsCidade != ""){
		$query = $query . '  AND DS_CIDADE LIKE "%'.$dsCidade.'%"';
	}
	$query = $query . '  ORDER BY DS_CIDADE';
	try {
		$svc = new CidadeService();
		$elmnts = $svc->getBySelect($query,false);
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

else if($op == 'getListaRedeSocial'){
	$svcRedeSocial = new RedeSocialService();
	$cdRedeSocial = '';
	$dsRedeSocial = '';
	if (isset($_GET['cdRedeSocial'])) {
		$cdRedeSocial = $_GET['cdRedeSocial'];	
    }
	if (isset($_GET['dsRedeSocial'])) {
		$dsRedeSocial = $_GET['dsRedeSocial'];	
    }
	$query = "SELECT CD_REDE_SOCIAL, DS_REDE_SOCIAL FROM rede_social
			  WHERE SN_ATIVO = 'S' AND CD_EMPRESA = ".$_SESSION['CD_EMPRESA'];
			
	if ($cdRedeSocial != ""){
		$query = $query . '  AND CD_REDE_SOCIAL = '.$cdRedeSocial;
	}
	if ($dsRedeSocial != ""){
		$query = $query . '  AND DS_REDE_SOCIAL LIKE "%'.$dsRedeSocial.'%"';
	}
	$query = $query . ' ORDER BY DS_REDE_SOCIAL';	
	$elmnts = $svcRedeSocial->getBySelect($query,false);
	$json = json_encode($elmnts);
	print("{\"totalCount\":".$svcRedeSocial->getTotal().", \"items\": ".$json."}");
}



?>