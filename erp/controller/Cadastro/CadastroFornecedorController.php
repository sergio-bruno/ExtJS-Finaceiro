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
$svcPessoaPjFornecedor = new PessoaPjFornecedorService();
$svcContatoPessoaPj = new ContatoPessoaPjService();
$svcContato = new ContatoService();

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

else if($op == 'getListaContatoFornecedor'){
	$svcContato = new ContatoService();
	$cdPessoaPj = '';

	if (isset($_GET['cdPessoaPj'])) {
		$cdPessoaPj = $_GET['cdPessoaPj'];	
    }

	$query = "SELECT ep.CD_CONTATO,ep.CD_PESSOA_PJ,e.CD_TIPO_CONTATO,tl.DS_TIPO_CONTATO,
			e.NM_CONTATO,e.DS_EMAIL,E.NR_TELEFONE_1,e.NR_TELEFONE_2,e.SN_ATIVO   
			FROM contato_pessoa_pj ep 
			INNER JOIN contato e ON e.CD_CONTATO =  ep.CD_CONTATO
			LEFT OUTER JOIN tipo_contato tl ON tl.CD_TIPO_CONTATO = e.CD_TIPO_CONTATO
			WHERE e.SN_ATIVO = 'S' ";
			
	if ($cdPessoaPj != ""){
		$query = $query . '  AND ep.CD_PESSOA_PJ = '.$cdPessoaPj;
	}
	
	$query = $query . ' ORDER BY ep.CD_CONTATO';	
	
	$elmnts = $svcContato->getBySelect($query);
	$json = json_encode($elmnts);
	print("{\"totalCount\":".$svcContato->getTotal().", \"items\": ".$json."}");
}

else if($op == 'getListaTipoContato'){
	$svcTipoContato = new TipoContatoService();
	$cdTipoContato = '';
	$dsTipoContato = '';

	if (isset($_GET['cdTipoContato'])) {
		$cdTipoContato = $_GET['cdTipoContato'];	
    }
	if (isset($_GET['dsTipoContato'])) {
		$dsTipoContato = $_GET['dsTipoContato'];	
    }

	$query = "SELECT CD_TIPO_CONTATO, DS_TIPO_CONTATO FROM tipo_contato
			  WHERE SN_ATIVO = 'S' ";
			
	if ($cdTipoContato != ""){
		$query = $query . '  AND CD_TIPO_CONTATO = '.$cdTipoContato;
	}
	if ($dsTipoContato != ""){
		$query = $query . '  AND DS_TIPO_CONTATO LIKE "%'.$dsTipoContato.'%"';
	}
	$query = $query . ' ORDER BY DS_TIPO_CONTATO';	
	
	$elmnts = $svcTipoContato->getBySelect($query);
	$json = json_encode($elmnts);
	print("{\"totalCount\":".$svcTipoContato->getTotal().", \"items\": ".$json."}");
}

else if($op == 'getListaEnderecoFornecedor'){
	$svcEndereco = new EnderecoService();
	$cdPessoaPj = '';

	if (isset($_GET['cdPessoaPj'])) {
		$cdPessoaPj = $_GET['cdPessoaPj'];	
    }

	$query = "SELECT ep.CD_ENDERECO,ep.CD_PESSOA_PJ,e.CD_TIPO_LOGRADOURO,tl.DS_TIPO_LOGRADOURO_ABREV,
			tl.DS_TIPO_LOGRADOURO,e.DS_LOGRADOURO,e.NR_ENDERECO,E.DS_COMPLEMENTO,e.NM_BAIRRO,
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
			  WHERE SN_ATIVO = 'S' ";
			
	if ($cdTipoEndereco != ""){
		$query = $query . '  AND CD_TIPO_ENDERECO = '.$cdTipoEndereco;
	}
	if ($dsTipoEndereco != ""){
		$query = $query . '  AND DS_TIPO_ENDERECO LIKE "%'.$dsTipoEndereco.'%"';
	}
	$query = $query . ' ORDER BY DS_TIPO_ENDERECO';	
	
	$elmnts = $svcTipoEndereco->getBySelect($query);
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
	
	$elmnts = $svcTipoLogradouro->getBySelect($query);
	$json = json_encode($elmnts);
	print("{\"totalCount\":".$svcTipoLogradouro->getTotal().", \"items\": ".$json."}");
}

else if($op == 'getListaFornecedor'){
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
				pj.NR_CPF
				FROM pessoa_pj pj 
				JOIN pessoa_pj_fornecedor f ON f.CD_PESSOA_PJ = pj.CD_PESSOA_PJ
				LEFT OUTER JOIN cnae c ON c.CD_CNAE = pj.CD_CNAE
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
		
		# Inserir o código criado na pessoa_pj_fornecedor 
		$elmntPessoaPjFornecedor = new PessoaPjFornecedorVO();
		$elmntPessoaPjFornecedor->CD_PESSOA_PJ = $elmnt->CD_PESSOA_PJ; 
		$svcPessoaPjFornecedor->inserir($elmntPessoaPjFornecedor); 
		
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
			$elmntContato->SN_ATIVO = 'S'; 
			$svcContato->inserir($elmntContato); 
			$elmntContato->CD_CONTATO = $svcContato->getLastInsertId(); 	

			# inserir o registro na entidade contato_pessoa
			$elmntContatoPessoaPj = new ContatoPessoaPjVO();
			$elmntContatoPessoaPj->CD_CONTATO = $elmntContato->CD_CONTATO; 
			$elmntContatoPessoaPj->CD_PESSOA_PJ = $elmnt->CD_PESSOA_PJ; 
			$svcContatoPessoaPj->inserir($elmntContatoPessoaPj); 
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
			$elmntContato->SN_ATIVO = 'S'; 
			
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