Ext.define('erp.model.Cadastro.CadastroTipoConselho.TipoConselhoModel', {
    extend: 'Ext.data.Model',
    fields: [
      {name: 'CD_TIPO_CONSELHO', type: 'int', useNull: true},
	  {name: 'DS_TIPO_CONSELHO', type: 'string', useNull: true},	  
	  {name: 'SN_ATIVO', type: 'string', useNull: true},
	  {name: 'CD_EMPRESA', type: 'int', useNull: true},
	  ], 
	idProperty: 'CD_TIPO_CONSELHO'
});