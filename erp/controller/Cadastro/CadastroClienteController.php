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

$svc = new PessoaPjService();
$svcEndereco = new EnderecoService();
$svcEnderecoPessoaPj = new EnderecoPessoaPjService();
$svcPessoaPjCliente = new PessoaPjClienteService();
$svcContatoPessoaPj = new ContatoPessoaPjService();
$svcContato = new ContatoService();
$svcVisita = new VisitaService();

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

else if($op == 'getListaVisitaCliente'){
	$svcVisita = new VisitaService();
	$cdPessoaPj = '';

	if (isset($_GET['cdPessoaPj'])) {
		$cdPessoaPj = $_GET['cdPessoaPj'];	
    }

	$query = "SELECT CD_VISITA,NM_VISITANTE,DT_VISITA,CD_PESSOA_PJ FROM visita 
			WHERE 1 = 1 ";
			
	if ($cdPessoaPj != ""){
		$query = $query . '  AND CD_PESSOA_PJ = '.$cdPessoaPj;
	}
	
	$query = $query . ' ORDER BY DT_VISITA DESC';	
	
	$elmnts = $svcVisita->getBySelect($query);
	$json = json_encode($elmnts);
	print("{\"totalCount\":".$svcVisita->getTotal().", \"items\": ".$json."}");
}

else if($op == 'getListaContatoCliente'){
	$svcContato = new ContatoService();
	$cdPessoaPj = '';

	if (isset($_GET['cdPessoaPj'])) {
		$cdPessoaPj = $_GET['cdPessoaPj'];	
    }

	$query = "SELECT ep.CD_CONTATO,ep.CD_PESSOA_PJ,e.CD_TIPO_CONTATO,tl.DS_TIPO_CONTATO,
			e.NM_CONTATO,e.DS_EMAIL,e.NR_TELEFONE_1,e.NR_TELEFONE_2,e.CD_CARGO,c.DS_CARGO, 
			e.DS_ELO,e.SN_ATIVO   
			FROM contato_pessoa_pj ep 
			INNER JOIN contato e ON e.CD_CONTATO =  ep.CD_CONTATO
			LEFT OUTER JOIN tipo_contato tl ON tl.CD_TIPO_CONTATO = e.CD_TIPO_CONTATO
			LEFT OUTER JOIN cargo c ON c.CD_CARGO = e.CD_CARGO
			WHERE e.SN_ATIVO = 'S' ";
			
	if ($cdPessoaPj != ""){
		$query = $query . '  AND ep.CD_PESSOA_PJ = '.$cdPessoaPj;
	}
	
	$query = $query . ' ORDER BY ep.CD_CONTATO';	
	
	$elmnts = $svcContato->getBySelect($query);
	$json = json_encode($elmnts);
	print("{\"totalCount\":".$svcContato->getTotal().", \"items\": ".$json."}");
}

else if($op == 'getListaEnderecoCliente'){
	$svcEndereco = new EnderecoService();
	$cdPessoaPj = '';

	if (isset($_GET['cdPessoaPj'])) {
		$cdPessoaPj = $_GET['cdPessoaPj'];	
    }

	$query = "SELECT ep.CD_ENDERECO,ep.CD_PESSOA_PJ,e.CD_TIPO_LOGRADOURO,tl.DS_TIPO_LOGRADOURO_ABREV,
			tl.DS_TIPO_LOGRADOURO,e.DS_LOGRADOURO,e.NR_ENDERECO,e.DS_COMPLEMENTO,e.NM_BAIRRO,
			e.CD_CIDADE,c.DS_CIDADE,c.CD_IBGE,c.CD_UF,e.NR_CEP,e.CD_TIPO_ENDERECO,te.DS_TIPO_ENDERECO,
			e.SN_ATIVO   
			FROM endereco_pessoa_pj ep 
			INNER JOIN endereco e ON e.CD_ENDERECO =  ep.CD_ENDERECO
			INNER JOIN tipo_logradouro tl ON tl.CD_TIPO_LOGRADOURO = e.CD_TIPO_LOGRADOURO
			LEFT OUTER JOIN tipo_endereco te ON te.CD_TIPO_ENDERECO = e.CD_TIPO_ENDERECO
			INNER JOIN cidade c ON c.CD_CIDADE = e.CD_CIDADE
			WHERE e.SN_ATIVO = 'S' ";
			
	if ($cdPessoaPj != ""){
		$query = $query . '  AND ep.CD_PESSOA_PJ = '.$cdPessoaPj;
	}
	
	$query = $query . ' ORDER BY ep.CD_ENDERECO';	
	
	$elmnts = $svcEndereco->getBySelect($query);
	$json = json_encode($elmnts);
	print("{\"totalCount\":".$svcEndereco->getTotal().", \"items\": ".$json."}");
}

else if($op == 'getListaCliente'){
	$nmFantasia = '';
	$nmRazaoSocial = '';

	if (isset($_GET['nmFantasia'])) {
		$nmFantasia = strtoupper(trim($_GET['nmFantasia']));
	}
	if (isset($_GET['nmRazaoSocial'])) {
		$nmRazaoSocial = strtoupper(trim($_GET['nmRazaoSocial']));
	}
	
	$query = "SELECT 
				pj.CD_PESSOA_PJ,
				pj.NM_FANTASIA,
				pj.NM_RAZAO_SOCIAL,
				pj.DT_FUNDACAO,
				pj.NR_CNPJ,
				pj.NR_TELEFONE_1,
				pj.NR_TELEFONE_2,
				pj.NR_TELEFONE_3,
				pj.NR_TELEFONE_4,
				pj.NR_CELULAR,
				pj.DS_EMAIL,
				pj.DT_CADASTRO,
				pj.CD_USUARIO_CADASTRO,
				pj.SN_ATIVO,
				pj.CD_EMPRESA,
				pj.CD_CNAE,
				c.DS_SIGLA,
				c.DS_NOME,
				pj.NR_IM,
				pj.NR_IM,
				pj.NR_CPF,
				
				f.CD_STATUS_CLIENTE,
				sc.DS_STATUS_CLIENTE,
				f.CD_CLASSIFICACAO,
				cl.DS_CLASSIFICACAO
				
				FROM pessoa_pj pj 
				JOIN pessoa_pj_cliente f ON f.CD_PESSOA_PJ = pj.CD_PESSOA_PJ
				LEFT OUTER JOIN cnae c ON c.CD_CNAE = pj.CD_CNAE
				
				LEFT OUTER JOIN status_cliente sc ON sc.CD_STATUS_CLIENTE = f.CD_STATUS_CLIENTE
				LEFT OUTER JOIN classificacao cl ON cl.CD_CLASSIFICACAO = f.CD_CLASSIFICACAO
				
               WHERE pj.SN_ATIVO = 'S' AND pj.CD_EMPRESA = ".$_SESSION['CD_EMPRESA'];
	
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
	$elmnt = new PessoaPjVO();

	$elmnt->NM_FANTASIA = $data->{'NM_FANTASIA'};
	$elmnt->NM_RAZAO_SOCIAL = $data->{'NM_RAZAO_SOCIAL'};
	$elmnt->DT_FUNDACAO = $data->{'DT_FUNDACAO'};
	$elmnt->NR_CNPJ = $data->{'NR_CNPJ'};
	$elmnt->NR_TELEFONE_1 = $data->{'NR_TELEFONE_1'};
	$elmnt->NR_TELEFONE_2 = $data->{'NR_TELEFONE_2'};
	$elmnt->NR_TELEFONE_3 = $data->{'NR_TELEFONE_3'};
	$elmnt->NR_TELEFONE_4 = $data->{'NR_TELEFONE_4'};
	$elmnt->NR_CELULAR = $data->{'NR_CELULAR'};
	$elmnt->DS_EMAIL = $data->{'DS_EMAIL'};
	$elmnt->DT_CADASTRO = date('Y-m-d H:i:s');
	$elmnt->CD_USUARIO_CADASTRO = $_SESSION['CD_USUARIO'];
	$elmnt->SN_ATIVO = $data->{'SN_ATIVO'};
	$elmnt->CD_EMPRESA = $_SESSION['CD_EMPRESA'];
	$elmnt->CD_CNAE = $data->{'CD_CNAE'};
	$elmnt->NR_IE = $data->{'NR_IE'};
	$elmnt->NR_IM = $data->{'NR_IM'};
	$elmnt->NR_CPF = $data->{'NR_CPF'};
	
	$db = Zend_Db_Table::getDefaultAdapter();
	$db->beginTransaction();	
	try {	
		$svc->inserir($elmnt); 
		$elmnt->CD_PESSOA_PJ = $svc->getLastInsertId(); 
		
		# Inserir o código criado na pessoa_pj_cliente 
		$elmntPessoaPjCliente = new PessoaPjClienteVO();
		$elmntPessoaPjCliente->CD_PESSOA_PJ = $elmnt->CD_PESSOA_PJ; 
		$elmntPessoaPjCliente->CD_STATUS_CLIENTE = $data->{'CD_STATUS_CLIENTE'};
		$elmntPessoaPjCliente->CD_CLASSIFICACAO = $data->{'CD_CLASSIFICACAO'};
		$svcPessoaPjCliente->inserir($elmntPessoaPjCliente); 
		
		# Endereço -----------------------------------------------------------------------------
		$listaItEndereco = json_decode($data->{'IT_ENDERECOS'},true);
		foreach($listaItEndereco as $item) { 
			// inserir o registro na entidade endereço
			$elmntEndereco = new EnderecoVO();
			$elmntEndereco->DS_LOGRADOURO = $item['DS_LOGRADOURO']; 
			$elmntEndereco->NR_ENDERECO = $item['NR_ENDERECO']; 
			$elmntEndereco->DS_COMPLEMENTO = $item['DS_COMPLEMENTO']; 
			$elmntEndereco->NM_BAIRRO = $item['NM_BAIRRO']; 
			$elmntEndereco->CD_CIDADE = $item['CD_CIDADE']; 
			$elmntEndereco->NR_CEP = $item['NR_CEP']; 
			$elmntEndereco->CD_TIPO_LOGRADOURO = $item['CD_TIPO_LOGRADOURO']; 
			$elmntEndereco->CD_TIPO_ENDERECO = $item['CD_TIPO_ENDERECO']; 
			$elmntEndereco->SN_ATIVO = 'S'; 
			$svcEndereco->inserir($elmntEndereco); 
			$elmntEndereco->CD_ENDERECO = $svcEndereco->getLastInsertId(); 	
				
			// inserir o registro na entidade endereco_pessoa
			$elmntEnderecoPessoaPj = new EnderecoPessoaPjVO();
			$elmntEnderecoPessoaPj->CD_ENDERECO = $elmntEndereco->CD_ENDERECO; 
			$elmntEnderecoPessoaPj->CD_PESSOA_PJ = $elmnt->CD_PESSOA_PJ; 
			$svcEnderecoPessoaPj->inserir($elmntEnderecoPessoaPj); 
		}
		
		# Contato ------------------------------------------------------------------------------
		$listaItContato = json_decode($data->{'IT_CONTATOS'},true);
		foreach($listaItContato as $item) { 
			# inserir o registro na entidade contato
			$elmntContato = new ContatoVO();
			$elmntContato->NM_CONTATO = $item['NM_CONTATO']; 
			$elmntContato->DS_EMAIL = $item['DS_EMAIL']; 
			$elmntContato->NR_TELEFONE_1 = $item['NR_TELEFONE_1']; 
			$elmntContato->NR_TELEFONE_2 = $item['NR_TELEFONE_2']; 
			$elmntContato->CD_TIPO_CONTATO = $item['CD_TIPO_CONTATO']; 
			$elmntContato->CD_CARGO = $item['CD_CARGO']; 
			$elmntContato->DS_ELO = $item['DS_ELO'];
			$elmntContato->SN_ATIVO = 'S'; 
			$svcContato->inserir($elmntContato); 
			$elmntContato->CD_CONTATO = $svcContato->getLastInsertId(); 	

			# inserir o registro na entidade contato_pessoa
			$elmntContatoPessoaPj = new ContatoPessoaPjVO();
			$elmntContatoPessoaPj->CD_CONTATO = $elmntContato->CD_CONTATO; 
			$elmntContatoPessoaPj->CD_PESSOA_PJ = $elmnt->CD_PESSOA_PJ; 
			$svcContatoPessoaPj->inserir($elmntContatoPessoaPj); 
		}
		
		# Visita ------------------------------------------------------------------------------
		$listaItVisita = json_decode($data->{'IT_VISITAS'},true);
		foreach($listaItVisita as $item) { 
			# inserir o registro na entidade visita
			$elmntVisita = new VisitaVO();
			$elmntVisita->NM_VISITANTE = $item['NM_VISITANTE']; 
			$elmntVisita->DT_VISITA = $item['DT_VISITA']; 
			$elmntVisita->CD_PESSOA_PJ = $elmnt->CD_PESSOA_PJ; 
			$svcVisita->inserir($elmntVisita); 
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
	$elmnt = $svc->getVOByCD($data->{'CD_PESSOA_PJ'});

	$elmnt->NM_FANTASIA = $data->{'NM_FANTASIA'};
	$elmnt->NM_RAZAO_SOCIAL = $data->{'NM_RAZAO_SOCIAL'};
	$elmnt->DT_FUNDACAO = $data->{'DT_FUNDACAO'};
	$elmnt->NR_CNPJ = $data->{'NR_CNPJ'};
	$elmnt->NR_TELEFONE_1 = $data->{'NR_TELEFONE_1'};
	$elmnt->NR_TELEFONE_2 = $data->{'NR_TELEFONE_2'};
	$elmnt->NR_TELEFONE_3 = $data->{'NR_TELEFONE_3'};
	$elmnt->NR_TELEFONE_4 = $data->{'NR_TELEFONE_4'};
	$elmnt->NR_CELULAR = $data->{'NR_CELULAR'};
	$elmnt->DS_EMAIL = $data->{'DS_EMAIL'};
	$elmnt->DT_CADASTRO = date('Y-m-d H:i:s');
	$elmnt->CD_USUARIO_CADASTRO = $_SESSION['CD_USUARIO'];
	$elmnt->SN_ATIVO = $data->{'SN_ATIVO'};
	$elmnt->CD_EMPRESA = $_SESSION['CD_EMPRESA'];
	$elmnt->CD_CNAE = $data->{'CD_CNAE'};
	$elmnt->NR_IE = $data->{'NR_IE'};
	$elmnt->NR_IM = $data->{'NR_IM'};
	$elmnt->NR_CPF = $data->{'NR_CPF'};

	$db = Zend_Db_Table::getDefaultAdapter();
	$db->beginTransaction();	
	try {	
		$svc->alterar($elmnt); 

		# Alterar os dados na pessoa_pj_cliente 
		$elmntPessoaPjCliente = new PessoaPjClienteVO();
		$elmntPessoaPjCliente->CD_PESSOA_PJ = $elmnt->CD_PESSOA_PJ; 
		$elmntPessoaPjCliente->CD_STATUS_CLIENTE = $data->{'CD_STATUS_CLIENTE'};
		$elmntPessoaPjCliente->CD_CLASSIFICACAO = $data->{'CD_CLASSIFICACAO'};
		$svcPessoaPjCliente->alterar($elmntPessoaPjCliente); 
		
		# Endereço ---------------------------------------------------------------------------------------
		$listaItEndereco = json_decode($data->{'IT_ENDERECOS'},true);
		# 1º Inativar um endereço que foi excluído da lista
		$listaEnderecoAtualPessoa = $svcEnderecoPessoaPj->listarEnderecosPessoa($elmnt->CD_PESSOA_PJ);
		foreach ($listaEnderecoAtualPessoa as $key => $codEnderecoExistentes){
			# Caso o endereço não esteja no array, inativar o endereço
			$achou = 0;
			foreach($listaItEndereco as $item) { 
				if ( $item['CD_ENDERECO'] == $codEnderecoExistentes['CD_ENDERECO']) {
					$achou = 1;
				}
			}
			if ( $achou == 0 ) {
				$inativaEndereco = "UPDATE endereco SET SN_ATIVO='N' WHERE CD_ENDERECO = ".$codEnderecoExistentes['CD_ENDERECO'];
				$svcEndereco->getBySelect($inativaEndereco,false);
			}
		}	
		# 2º Incluir ou alterar um endereço
		foreach($listaItEndereco as $item) { 
			# inserir o registro na entidade endereço
			$elmntEndereco = new EnderecoVO();
			$elmntEndereco->DS_LOGRADOURO = $item['DS_LOGRADOURO']; 
			$elmntEndereco->NR_ENDERECO = $item['NR_ENDERECO']; 
			$elmntEndereco->DS_COMPLEMENTO = $item['DS_COMPLEMENTO']; 
			$elmntEndereco->NM_BAIRRO = $item['NM_BAIRRO']; 
			$elmntEndereco->CD_CIDADE = $item['CD_CIDADE']; 
			$elmntEndereco->NR_CEP = $item['NR_CEP']; 
			$elmntEndereco->CD_TIPO_LOGRADOURO = $item['CD_TIPO_LOGRADOURO']; 
			$elmntEndereco->CD_TIPO_ENDERECO = $item['CD_TIPO_ENDERECO']; 
			$elmntEndereco->SN_ATIVO = 'S'; 
			
			if ( $item['CD_ENDERECO'] != "" && $item['CD_ENDERECO'] != null ) {
				$elmntEndereco->CD_ENDERECO = $item['CD_ENDERECO'];
				$svcEndereco->alterar($elmntEndereco); 	
			} else {
				$svcEndereco->inserir($elmntEndereco); 
				$elmntEndereco->CD_ENDERECO = $svcEndereco->getLastInsertId(); 	
				# inserir o registro na entidade endereco_pessoa
				$elmntEnderecoPessoaPj = new EnderecoPessoaPjVO();
				$elmntEnderecoPessoaPj->CD_ENDERECO = $elmntEndereco->CD_ENDERECO; 
				$elmntEnderecoPessoaPj->CD_PESSOA_PJ = $elmnt->CD_PESSOA_PJ; 
				$svcEnderecoPessoaPj->inserir($elmntEnderecoPessoaPj); 
			}
				
		}
		
		# Contato ---------------------------------------------------------------------------------------
		$listaItContato = json_decode($data->{'IT_CONTATOS'},true);
		# 1º Inativar um contato que foi excluído da lista
		$listaContatoAtualPessoa = $svcContatoPessoaPj->listarContatosPessoa($elmnt->CD_PESSOA_PJ);
		foreach ($listaContatoAtualPessoa as $key => $codContatoExistentes){
			# Caso o endereço não esteja no array, inativar o endereço
			$achou = 0;
			foreach($listaItContato as $item) { 
				if ( $item['CD_CONTATO'] == $codContatoExistentes['CD_CONTATO']) {
					$achou = 1;
				}
			}
			if ( $achou == 0 ) {
				$inativaContato = "UPDATE contato SET SN_ATIVO='N' WHERE CD_CONTATO = ".$codContatoExistentes['CD_CONTATO'];
				$svcContato->getBySelect($inativaContato,false);
			}
		}	
		# 2º Incluir ou alterar um contato
		foreach($listaItContato as $item) { 
			# inserir o registro na entidade contato
			$elmntContato = new ContatoVO();
			$elmntContato->NM_CONTATO = $item['NM_CONTATO']; 
			$elmntContato->DS_EMAIL = $item['DS_EMAIL']; 
			$elmntContato->NR_TELEFONE_1 = $item['NR_TELEFONE_1']; 
			$elmntContato->NR_TELEFONE_2 = $item['NR_TELEFONE_2']; 
			$elmntContato->CD_TIPO_CONTATO = $item['CD_TIPO_CONTATO']; 
			$elmntContato->DS_ELO = $item['DS_ELO'];
			$elmntContato->SN_ATIVO = 'S'; 
			$elmntContato->CD_CARGO = $item['CD_CARGO']; 
			if ( $item['CD_CONTATO'] != "" && $item['CD_CONTATO'] != null ) {
				$elmntContato->CD_CONTATO = $item['CD_CONTATO'];
				$svcContato->alterar($elmntContato); 	
			} else {
				$svcContato->inserir($elmntContato); 
				$elmntContato->CD_CONTATO = $svcContato->getLastInsertId(); 	
				# inserir o registro na entidade contato_pessoa
				$elmntContatoPessoaPj = new ContatoPessoaPjVO();
				$elmntContatoPessoaPj->CD_CONTATO = $elmntContato->CD_CONTATO; 
				$elmntContatoPessoaPj->CD_PESSOA_PJ = $elmnt->CD_PESSOA_PJ; 
				$svcContatoPessoaPj->inserir($elmntContatoPessoaPj); 
			}
		}

		# Visita ---------------------------------------------------------------------------------------
		$listaItVisita = json_decode($data->{'IT_VISITAS'},true);
		# 1º Excluir uma visita que foi excluído da lista
		$listaVisitaAtualPessoa = $svcVisita->listarVisitasPessoa($elmnt->CD_PESSOA_PJ);
		foreach ($listaVisitaAtualPessoa as $key => $codVisitaExistentes){
			# Caso a visita não esteja no array, excluir a visita
			$achou = 0;
			foreach($listaItVisita as $item) { 
				if ( $item['CD_VISITA'] == $codVisitaExistentes['CD_VISITA']) {
					$achou = 1;
				}
			}
			if ( $achou == 0 ) {
				$excluirVisita = "DELETE FROM visita WHERE CD_VISITA = ".$codVisitaExistentes['CD_VISITA'];
				$svcVisita->getBySelect($excluirVisita,false);
			}
		}	
		# 2º Incluir ou alterar uma visita
		foreach($listaItVisita as $item) { 
			# inserir o registro na entidade contato
			$elmntVisita = new VisitaVO();
			$elmntVisita->NM_VISITANTE = $item['NM_VISITANTE']; 
			$elmntVisita->DT_VISITA = $item['DT_VISITA']; 
			$elmntVisita->CD_PESSOA_PJ = $elmnt->CD_PESSOA_PJ; 
			if ( $item['CD_VISITA'] != "" && $item['CD_VISITA'] != null ) {
				$elmntVisita->CD_VISITA = $item['CD_VISITA'];
				$svcVisita->alterar($elmntVisita); 	
			} else {
				$svcVisita->inserir($elmntVisita); 
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