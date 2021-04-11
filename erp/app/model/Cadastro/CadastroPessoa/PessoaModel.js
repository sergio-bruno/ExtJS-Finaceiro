Ext.define('erp.model.Cadastro.CadastroPessoa.PessoaModel', {
    extend: 'Ext.data.Model',
    fields: [
      {name: 'CD_PESSOA', type: 'int', useNull: true},
	  {name: 'NM_PESSOA', type: 'string', useNull: true},
 	  {name: 'SN_ATIVO', type: 'string', useNull: true},

	  // Documentos 	
	  {name: 'NR_RG', type: 'string', useNull: true},
	  {name: 'DS_ORGAO_EXPEDIDOR_RG', type: 'string', useNull: true},
	  {name: 'CD_UF_RG', type: 'string', useNull: true},
	  {name: 'DT_EXPEDICAO_RG', type: 'date', dateFormat: 'Y-m-d', useNull: true},
	  {name: 'NR_CPF', type: 'string', useNull: true},
	  {name: 'NR_TITULO_ELEITORAL', type: 'string', useNull: true},
	  {name: 'NR_ZONA_TITULO_ELEITORAL', type: 'string', useNull: true},
	  {name: 'NR_SECAO_TITULO_ELEITORAL', type: 'string', useNull: true},
	  {name: 'CD_UF_TITULO_ELEITORAL', type: 'string', useNull: true},
	  {name: 'NR_PIS_PASEP', type: 'string', useNull: true},
	  {name: 'NR_RESERVISTA', type: 'string', useNull: true},
	  {name: 'NR_SERIE_RESERVISTA', type: 'string', useNull: true},
	  {name: 'NR_TIPO_RESERVISTA', type: 'string', useNull: true},
	  {name: 'NR_RM_RESERVISTA', type: 'string', useNull: true},
	  {name: 'NR_CATEGORIA_RESERVISTA', type: 'string', useNull: true},
	  {name: 'NR_CNH', type: 'string', useNull: true},
	  {name: 'CD_UF_CNH', type: 'string', useNull: true},
	  {name: 'DT_VALIDADE_CNH', type: 'date', dateFormat: 'Y-m-d', useNull: true},
	  {name: 'TP_CATEGORIA_CNH', type: 'string', useNull: true},
	  {name: 'NR_REGISTRO_CNH', type: 'string', useNull: true},
	  
	  //Endereços
	  {name: 'IT_ENDERECOS', type: 'string', useNull: true},
	  
	  //Redes Sociais
	  {name: 'IT_REDES_SOCIAIS', type: 'string', useNull: true},
	  
	  // Outras informações
	  {name: 'DT_NASCIMENTO', type: 'date', dateFormat: 'Y-m-d', useNull: true},
	  {name: 'TP_SEXO', type: 'string', useNull: true},
	  {name: 'TP_SANGUINEO', type: 'string', useNull: true},
	  {name: 'NR_TELEFONE', type: 'string', useNull: true},
	  {name: 'NR_CELULAR', type: 'string', useNull: true},
	  {name: 'DS_EMAIL', type: 'string', useNull: true},
	  {name: 'NM_PAI', type: 'string', useNull: true},
	  {name: 'NM_MAE', type: 'string', useNull: true},
	  {name: 'NM_CONJUGE', type: 'string', useNull: true},
	  {name: 'DS_NATURALIDADE', type: 'string', useNull: true},
	  {name: 'CD_UF_NATURALIDADE', type: 'string', useNull: true},
	  {name: 'CD_ESTADO_CIVIL', type: 'int', useNull: true},
	  {name: 'CD_ESCOLARIDADE', type: 'int', useNull: true},
	  {name: 'CD_RELIGIAO', type: 'int', useNull: true},
	  {name: 'DS_NACIONALIDADE', type: 'string', useNull: true},

	  {name: 'DT_CADASTRO', type: 'date', dateFormat: 'Y-m-d H:i:s', useNull: true},
	  {name: 'CD_USUARIO_CADASTRO', type: 'int', useNull: true},
	  {name: 'CD_EMPRESA', type: 'int', useNull: true}
	  ], 
	idProperty: 'CD_PESSOA'
});