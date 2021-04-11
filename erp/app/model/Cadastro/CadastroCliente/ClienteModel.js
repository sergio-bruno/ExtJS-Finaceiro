Ext.define('erp.model.Cadastro.CadastroCliente.ClienteModel', {
    extend: 'Ext.data.Model',
    fields: [
      {name: 'CD_PESSOA_PJ', type: 'int', useNull: true},
	  {name: 'NM_FANTASIA', type: 'string', useNull: true},
	  {name: 'NM_RAZAO_SOCIAL', type: 'string', useNull: true},
 	  {name: 'SN_ATIVO', type: 'string', useNull: true},
	  {name: 'DT_CADASTRO', type: 'date', dateFormat: 'Y-m-d H:i:s', useNull: true},
	  {name: 'CD_USUARIO_CADASTRO', type: 'int', useNull: true},
	  {name: 'CD_EMPRESA', type: 'int', useNull: true},
	  // Informações cadastrais 	
	  {name: 'NR_CNPJ', type: 'string', useNull: true},
	  {name: 'NR_CPF', type: 'string', useNull: true},
	  {name: 'NR_IE', type: 'string', useNull: true},
	  {name: 'NR_IM', type: 'string', useNull: true},
	  {name: 'CD_CNAE', type: 'int', useNull: true},
	  {name: 'DT_FUNDACAO', type: 'date', dateFormat: 'Y-m-d', useNull: true},
	  {name: 'NR_TELEFONE_1', type: 'string', useNull: true},
	  {name: 'NR_TELEFONE_2', type: 'string', useNull: true},
	  {name: 'NR_TELEFONE_3', type: 'string', useNull: true},
	  {name: 'NR_TELEFONE_4', type: 'string', useNull: true},
	  {name: 'NR_CELULAR', type: 'string', useNull: true},
	  {name: 'DS_EMAIL', type: 'string', useNull: true},
	  //Contatos
	  {name: 'IT_CONTATOS', type: 'string', useNull: true},
	  //Endereços
	  {name: 'IT_ENDERECOS', type: 'string', useNull: true},
	  //Visitas
	  {name: 'IT_VISITAS', type: 'string', useNull: true},
	  // Informações exclusivas do cliente
	  {name: 'CD_STATUS_CLIENTE', type: 'int', useNull: true},
	  {name: 'DS_STATUS_CLIENTE', type: 'string', useNull: true},
	  {name: 'CD_CLASSIFICACAO', type: 'int', useNull: true},
	  {name: 'DS_CLASSIFICACAO', type: 'string', useNull: true}
	  ], 
	idProperty: 'CD_PESSOA_PJ'
});