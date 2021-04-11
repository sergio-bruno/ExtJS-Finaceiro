Ext.define('erp.model.Cadastro.CadastroCliente.EnderecoClienteModel', {
    extend: 'Ext.data.Model',
    fields: [
      {name: 'CD_ENDERECO', type: 'int', useNull: true},
	  {name: 'CD_PESSOA_PJ', type: 'int', useNull: true},
	  {name: 'CD_TIPO_LOGRADOURO', type: 'int', useNull: true},	
	  {name: 'DS_TIPO_LOGRADOURO_ABREV', type: 'string', useNull: true},
	  {name: 'DS_TIPO_LOGRADOURO', type: 'string', useNull: true},
	  {name: 'DS_LOGRADOURO', type: 'string', useNull: true},
	  {name: 'NR_ENDERECO', type: 'int', useNull: true},	
	  {name: 'DS_COMPLEMENTO', type: 'string', useNull: true},
	  {name: 'NM_BAIRRO', type: 'string', useNull: true},
	  {name: 'CD_CIDADE', type: 'int', useNull: true},		
	  {name: 'DS_CIDADE', type: 'string', useNull: true},
	  {name: 'CD_IBGE', type: 'string', useNull: true},
	  {name: 'CD_UF', type: 'string', useNull: true},
	  {name: 'NR_CEP', type: 'string', useNull: true},
	  {name: 'CD_TIPO_ENDERECO', type: 'int', useNull: true},
	  {name: 'DS_TIPO_ENDERECO', type: 'string', useNull: true},
 	  {name: 'SN_ATIVO', type: 'string', useNull: true}
	], 
	idProperty: 'CD_ENDERECO'
});