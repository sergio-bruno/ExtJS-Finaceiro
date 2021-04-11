Ext.define('erp.model.Cadastro.CadastroTipoEndereco.TipoEnderecoModel', {
    extend: 'Ext.data.Model',
    fields: [
      {name: 'CD_TIPO_ENDERECO', type: 'int', useNull: true},
	  {name: 'DS_TIPO_ENDERECO', type: 'string', useNull: true},	  
	  {name: 'SN_ATIVO', type: 'string', useNull: true},
	  {name: 'CD_EMPRESA', type: 'int', useNull: true},
	  ], 
	idProperty: 'CD_TIPO_ENDERECO'
});