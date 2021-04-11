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

$svc = new PessoaService();

$svcEndereco = new EnderecoService();
$svcEnderecoPessoa = new EnderecoPessoaService();

$svcRedeSocial = new RedeSocialService();
$svcRedeSocialPessoa = new RedeSocialPessoaService();


if(isset($_GET['start'])){
	$svc->setInit($_GET['start']);
}
if(isset($_GET['limit'])){
	$svc->setCount($_GET['limit']);
}

if(isset($_GET['op'])){
	$op = $_GET['op'];
}

$erro = "Erro desconhecido.";

if($op == ""){
}

else if($op == 'getListaRedeSocialPessoa'){
	$svcEndereco = new EnderecoService();
	$cdPessoa = '';

	if (isset($_GET['cdPessoa'])) {
		$cdPessoa = $_GET['cdPessoa'];	
    }

	$query = "SELECT rsp.CD_REDE_SOCIAL_PESSOA,rsp.DS_REDE_SOCIAL_PESSOA,rsp.CD_PESSOA,rsp.CD_REDE_SOCIAL,rs.DS_REDE_SOCIAL,
			rsp.SN_ATIVO, rsp.CD_EMPRESA   
			FROM rede_social_pessoa rsp 
			INNER JOIN rede_social rs ON rs.CD_REDE_SOCIAL =  rsp.CD_REDE_SOCIAL
			WHERE rsp.SN_ATIVO = 'S' AND rsp.CD_EMPRESA = ".$_SESSION['CD_EMPRESA'];
			
	if ($cdPessoa != ""){
		$query = $query . '  AND rsp.CD_PESSOA = '.$cdPessoa;
	}
	
	$query = $query . ' ORDER BY rs.DS_REDE_SOCIAL,rsp.DS_REDE_SOCIAL_PESSOA ';	
	
	$elmnts = $svcEndereco->getBySelect($query);
	$json = json_encode($elmnts);
	print("{\"totalCount\":".$svcEndereco->getTotal().", \"items\": ".$json."}");
}

else if($op == 'getListaEnderecoPessoa'){
	$svcEndereco = new EnderecoService();
	$cdPessoa = '';

	if (isset($_GET['cdPessoa'])) {
		$cdPessoa = $_GET['cdPessoa'];	
    }

	$query = "SELECT ep.CD_ENDERECO,ep.CD_PESSOA,e.CD_TIPO_LOGRADOURO,tl.DS_TIPO_LOGRADOURO_ABREV,
			tl.DS_TIPO_LOGRADOURO,e.DS_LOGRADOURO,e.NR_ENDERECO,E.DS_COMPLEMENTO,e.NM_BAIRRO,
			e.CD_CIDADE,c.DS_CIDADE,c.CD_IBGE,c.CD_UF,e.NR_CEP,e.CD_TIPO_ENDERECO,te.DS_TIPO_ENDERECO,
			e.SN_ATIVO   
			FROM endereco_pessoa ep 
			INNER JOIN endereco e ON e.CD_ENDERECO =  ep.CD_ENDERECO
			INNER JOIN tipo_logradouro tl ON tl.CD_TIPO_LOGRADOURO = e.CD_TIPO_LOGRADOURO
			LEFT OUTER JOIN tipo_endereco te ON te.CD_TIPO_ENDERECO = e.CD_TIPO_ENDERECO
			INNER JOIN cidade c ON c.CD_CIDADE = e.CD_CIDADE
			WHERE e.SN_ATIVO = 'S' ";
			
	if ($cdPessoa != ""){
		$query = $query . '  AND ep.CD_PESSOA = '.$cdPessoa;
	}
	
	$query = $query . ' ORDER BY ep.CD_ENDERECO';	
	
	$elmnts = $svcEndereco->getBySelect($query);
	$json = json_encode($elmnts);
	print("{\"totalCount\":".$svcEndereco->getTotal().", \"items\": ".$json."}");
}

else if($op == 'getListaPessoa'){
	$nmPessoa = '';

	if (isset($_GET['nmPessoa'])) {
		$nmPessoa = strtoupper(trim($_GET['nmPessoa']));
	}
	
	$query = "SELECT 
				CD_PESSOA,
				NM_PESSOA,
				DT_NASCIMENTO,
				TP_SEXO,
				TP_SANGUINEO,
				NR_RG,
				DS_ORGAO_EXPEDIDOR_RG,
				CD_UF_RG,
				DT_EXPEDICAO_RG,
				NR_CPF,
				NR_TITULO_ELEITORAL,
				NR_ZONA_TITULO_ELEITORAL,
				NR_SECAO_TITULO_ELEITORAL,
				CD_UF_TITULO_ELEITORAL,
				NR_RESERVISTA,
				NR_SERIE_RESERVISTA,
				NR_TIPO_RESERVISTA,
				NR_RM_RESERVISTA,
				NR_CATEGORIA_RESERVISTA,
				NR_PIS_PASEP,
				NR_CNH,
				CD_UF_CNH,
				DT_VALIDADE_CNH,
				TP_CATEGORIA_CNH,
				NR_REGISTRO_CNH,
				CD_ESTADO_CIVIL,
				CD_ESCOLARIDADE,
				CD_RELIGIAO,
				NR_TELEFONE,
				NR_CELULAR,
				NM_PAI,
				NM_MAE,
				NM_CONJUGE,
				DS_NATURALIDADE,
				CD_UF_NATURALIDADE,
				DS_NACIONALIDADE,
				DS_EMAIL,
				DT_CADASTRO,
				CD_USUARIO_CADASTRO,
				SN_ATIVO,
				CD_EMPRESA
				FROM pessoa 
               WHERE CD_EMPRESA = ".$_SESSION['CD_EMPRESA'];
	
	if ($nmPessoa != ""){
		$query = $query . ' AND NM_PESSOA LIKE "%'.$nmPessoa.'%"';
	}
     $query = $query . ' ORDER BY NM_PESSOA';	

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
	$elmnt = new PessoaVO();
	$elmnt->NM_PESSOA = $data->{'NM_PESSOA'};
	$elmnt->SN_ATIVO = $data->{'SN_ATIVO'};
	$elmnt->CD_EMPRESA = $_SESSION['CD_EMPRESA'];
	$elmnt->DT_CADASTRO = date('Y-m-d H:i:s');
	$elmnt->CD_USUARIO_CADASTRO = $_SESSION['CD_USUARIO'];
	
	# Documentos
	$elmnt->NR_RG = $data->{'NR_RG'};
	$elmnt->DS_ORGAO_EXPEDIDOR_RG = $data->{'DS_ORGAO_EXPEDIDOR_RG'};
	if ( $data->{'CD_UF_RG'} != "" ) {
		$elmnt->CD_UF_RG = $data->{'CD_UF_RG'};
	}
	$elmnt->DT_EXPEDICAO_RG = $data->{'DT_EXPEDICAO_RG'};
	$elmnt->NR_CPF = $data->{'NR_CPF'};
	$elmnt->NR_TITULO_ELEITORAL = $data->{'NR_TITULO_ELEITORAL'};
	$elmnt->NR_ZONA_TITULO_ELEITORAL = $data->{'NR_ZONA_TITULO_ELEITORAL'};
	$elmnt->NR_SECAO_TITULO_ELEITORAL = $data->{'NR_SECAO_TITULO_ELEITORAL'};
	if ( $data->{'CD_UF_TITULO_ELEITORAL'} != "" ) {
		$elmnt->CD_UF_TITULO_ELEITORAL = $data->{'CD_UF_TITULO_ELEITORAL'};
	}
	$elmnt->NR_PIS_PASEP = $data->{'NR_PIS_PASEP'};
	$elmnt->NR_RESERVISTA = $data->{'NR_RESERVISTA'};
	$elmnt->NR_SERIE_RESERVISTA = $data->{'NR_SERIE_RESERVISTA'};
	$elmnt->NR_TIPO_RESERVISTA = $data->{'NR_TIPO_RESERVISTA'};
	$elmnt->NR_RM_RESERVISTA = $data->{'NR_RM_RESERVISTA'};
	$elmnt->NR_CATEGORIA_RESERVISTA = $data->{'NR_CATEGORIA_RESERVISTA'};
	$elmnt->NR_CNH = $data->{'NR_CNH'};
	if ( $data->{'CD_UF_CNH'} != "" ) {
		$elmnt->CD_UF_CNH = $data->{'CD_UF_CNH'};
	}
	$elmnt->DT_VALIDADE_CNH = $data->{'DT_VALIDADE_CNH'};
	$elmnt->TP_CATEGORIA_CNH = $data->{'TP_CATEGORIA_CNH'};
	$elmnt->NR_REGISTRO_CNH = $data->{'NR_REGISTRO_CNH'};

	# Outras informações
	$elmnt->DT_NASCIMENTO = $data->{'DT_NASCIMENTO'};
	if ( $data->{'TP_SEXO'} != "" ) {
		$elmnt->TP_SEXO = $data->{'TP_SEXO'};
	}
	if ( $data->{'TP_SANGUINEO'} != "" ) {
		$elmnt->TP_SANGUINEO = $data->{'TP_SANGUINEO'};
	}
	$elmnt->NR_TELEFONE = $data->{'NR_TELEFONE'};
	$elmnt->NR_CELULAR = $data->{'NR_CELULAR'};
	$elmnt->DS_EMAIL = $data->{'DS_EMAIL'};
	$elmnt->NM_PAI = $data->{'NM_PAI'};
	$elmnt->NM_MAE = $data->{'NM_MAE'};
	$elmnt->NM_CONJUGE = $data->{'NM_CONJUGE'};
	$elmnt->DS_NATURALIDADE = $data->{'DS_NATURALIDADE'};
	if ( $data->{'CD_UF_NATURALIDADE'} != "" ) {
		$elmnt->CD_UF_NATURALIDADE = $data->{'CD_UF_NATURALIDADE'};
	}
	if ( $data->{'CD_ESTADO_CIVIL'} != "" && $data->{'CD_ESTADO_CIVIL'} != -1 ) {
		$elmnt->CD_ESTADO_CIVIL = $data->{'CD_ESTADO_CIVIL'};
	}
	if ( $data->{'CD_ESCOLARIDADE'} != "" && $data->{'CD_ESCOLARIDADE'} != -1 ) {
		$elmnt->CD_ESCOLARIDADE = $data->{'CD_ESCOLARIDADE'};
	}
	if ( $data->{'CD_RELIGIAO'} != "" && $data->{'CD_RELIGIAO'} != -1 ) {
		$elmnt->CD_RELIGIAO = $data->{'CD_RELIGIAO'};
	}
	$elmnt->DS_NACIONALIDADE = $data->{'DS_NACIONALIDADE'};
	
	$db = Zend_Db_Table::getDefaultAdapter();
	$db->beginTransaction();	
	try {	
		$svc->inserir($elmnt); 
		$elmnt->CD_PESSOA = $svc->getLastInsertId(); 
		
		# Endereço
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
			$elmntEnderecoPessoa = new EnderecoPessoaVO();
			$elmntEnderecoPessoa->CD_ENDERECO = $elmntEndereco->CD_ENDERECO; 
			$elmntEnderecoPessoa->CD_PESSOA = $elmnt->CD_PESSOA; 
			$svcEnderecoPessoa->inserir($elmntEnderecoPessoa); 
		}

		# Rede Social
		$listaItRedeSocial = json_decode($data->{'IT_REDES_SOCIAIS'},true);
		foreach($listaItRedeSocial as $item) { 
			// inserir o registro na entidade endereço
			$elmntRedeSocial = new RedeSocialPessoaVO();
			$elmntRedeSocial->DS_REDE_SOCIAL_PESSOA = $item['DS_REDE_SOCIAL_PESSOA']; 
			$elmntRedeSocial->CD_REDE_SOCIAL = $item['CD_REDE_SOCIAL']; 
			$elmntRedeSocial->CD_PESSOA = $elmnt->CD_PESSOA; 
			$elmntRedeSocial->CD_EMPRESA = $_SESSION['CD_EMPRESA']; 
			$elmntRedeSocial->SN_ATIVO = 'S'; 
			$svcRedeSocialPessoa->inserir($elmntRedeSocial); 
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
	$elmnt = $svc->getVOByCD($data->{'CD_PESSOA'});

	$elmnt->NM_PESSOA = $data->{'NM_PESSOA'};
	$elmnt->SN_ATIVO = $data->{'SN_ATIVO'};

	# Documentos
	$elmnt->NR_RG = $data->{'NR_RG'};
	$elmnt->DS_ORGAO_EXPEDIDOR_RG = $data->{'DS_ORGAO_EXPEDIDOR_RG'};
	if ( $data->{'CD_UF_RG'} != "" ) {
		$elmnt->CD_UF_RG = $data->{'CD_UF_RG'};
	}
	$elmnt->DT_EXPEDICAO_RG = $data->{'DT_EXPEDICAO_RG'};
	$elmnt->NR_CPF = $data->{'NR_CPF'};
	$elmnt->NR_TITULO_ELEITORAL = $data->{'NR_TITULO_ELEITORAL'};
	$elmnt->NR_ZONA_TITULO_ELEITORAL = $data->{'NR_ZONA_TITULO_ELEITORAL'};
	$elmnt->NR_SECAO_TITULO_ELEITORAL = $data->{'NR_SECAO_TITULO_ELEITORAL'};
	if ( $data->{'CD_UF_TITULO_ELEITORAL'} != "" ) {
		$elmnt->CD_UF_TITULO_ELEITORAL = $data->{'CD_UF_TITULO_ELEITORAL'};
	}
	$elmnt->NR_PIS_PASEP = $data->{'NR_PIS_PASEP'};
	$elmnt->NR_RESERVISTA = $data->{'NR_RESERVISTA'};
	$elmnt->NR_SERIE_RESERVISTA = $data->{'NR_SERIE_RESERVISTA'};
	$elmnt->NR_TIPO_RESERVISTA = $data->{'NR_TIPO_RESERVISTA'};
	$elmnt->NR_RM_RESERVISTA = $data->{'NR_RM_RESERVISTA'};
	$elmnt->NR_CATEGORIA_RESERVISTA = $data->{'NR_CATEGORIA_RESERVISTA'};
	$elmnt->NR_CNH = $data->{'NR_CNH'};
	if ( $data->{'CD_UF_CNH'} != "" ) {
		$elmnt->CD_UF_CNH = $data->{'CD_UF_CNH'};
	}
	$elmnt->DT_VALIDADE_CNH = $data->{'DT_VALIDADE_CNH'};
	$elmnt->TP_CATEGORIA_CNH = $data->{'TP_CATEGORIA_CNH'};
	$elmnt->NR_REGISTRO_CNH = $data->{'NR_REGISTRO_CNH'};

	# Outras informações
	$elmnt->DT_NASCIMENTO = $data->{'DT_NASCIMENTO'};
	if ( $data->{'TP_SEXO'} != "" ) {
		$elmnt->TP_SEXO = $data->{'TP_SEXO'};
	}
	if ( $data->{'TP_SANGUINEO'} != "" ) {
		$elmnt->TP_SANGUINEO = $data->{'TP_SANGUINEO'};
	}
	$elmnt->NR_TELEFONE = $data->{'NR_TELEFONE'};
	$elmnt->NR_CELULAR = $data->{'NR_CELULAR'};
	$elmnt->DS_EMAIL = $data->{'DS_EMAIL'};
	$elmnt->NM_PAI = $data->{'NM_PAI'};
	$elmnt->NM_MAE = $data->{'NM_MAE'};
	$elmnt->NM_CONJUGE = $data->{'NM_CONJUGE'};
	$elmnt->DS_NATURALIDADE = $data->{'DS_NATURALIDADE'};
	if ( $data->{'CD_UF_NATURALIDADE'} != "" ) {
		$elmnt->CD_UF_NATURALIDADE = $data->{'CD_UF_NATURALIDADE'};
	}
	if ( $data->{'CD_ESTADO_CIVIL'} != "" && $data->{'CD_ESTADO_CIVIL'} != -1 ) {
		$elmnt->CD_ESTADO_CIVIL = $data->{'CD_ESTADO_CIVIL'};
	} 
	if ( $data->{'CD_ESCOLARIDADE'} != "" && $data->{'CD_ESCOLARIDADE'} != -1 ) {
		$elmnt->CD_ESCOLARIDADE = $data->{'CD_ESCOLARIDADE'};
	} 
	if ( $data->{'CD_RELIGIAO'} != "" && $data->{'CD_RELIGIAO'} != -1 ) {
		$elmnt->CD_RELIGIAO = $data->{'CD_RELIGIAO'};
	}
	$elmnt->DS_NACIONALIDADE = $data->{'DS_NACIONALIDADE'};
	
	$db = Zend_Db_Table::getDefaultAdapter();
	$db->beginTransaction();	
	try {	
		$svc->alterar($elmnt); 

		# Endereço
		$listaItEndereco = json_decode($data->{'IT_ENDERECOS'},true);
		# 1º Inativar um endereço que foi excluído da lista
		$listaEnderecoAtualPessoa = $svcEnderecoPessoa->listarEnderecosPessoa($elmnt->CD_PESSOA);
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
				$elmntEnderecoPessoa = new EnderecoPessoaVO();
				$elmntEnderecoPessoa->CD_ENDERECO = $elmntEndereco->CD_ENDERECO; 
				$elmntEnderecoPessoa->CD_PESSOA = $elmnt->CD_PESSOA; 
				$svcEnderecoPessoa->inserir($elmntEnderecoPessoa); 
			}
				
		}

		# apagar as rede sociais e incuir as novas
		$selectDelRedeSocial = "DELETE FROM rede_social_pessoa WHERE CD_PESSOA = ".$elmnt->CD_PESSOA;
		$redeSocialDelArray = $svcRedeSocialPessoa->getBySelect($selectDelRedeSocial,false);
		$listaItRedeSocial = json_decode($data->{'IT_REDES_SOCIAIS'},true);
		foreach($listaItRedeSocial as $item) { 
			// inserir o registro na entidade endereço
			$elmntRedeSocial = new RedeSocialPessoaVO();
			$elmntRedeSocial->DS_REDE_SOCIAL_PESSOA = $item['DS_REDE_SOCIAL_PESSOA']; 
			$elmntRedeSocial->CD_REDE_SOCIAL = $item['CD_REDE_SOCIAL']; 
			$elmntRedeSocial->CD_PESSOA = $elmnt->CD_PESSOA; 
			$elmntRedeSocial->CD_EMPRESA = $_SESSION['CD_EMPRESA']; 
			$elmntRedeSocial->SN_ATIVO = 'S'; 
			$svcRedeSocialPessoa->inserir($elmntRedeSocial); 
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
		$svc->excluir($_POST['cdPessoa']);
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