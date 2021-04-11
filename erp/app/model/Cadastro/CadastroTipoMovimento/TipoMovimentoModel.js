Ext.define('erp.model.Cadastro.CadastroTipoMovimento.TipoMovimentoModel', {
    extend: 'Ext.data.Model',
    fields: [
      {name: 'CD_TIPO_MOVIMENTO', type: 'int', useNull: true},
	  {name: 'DS_TIPO_MOVIMENTO', type: 'string', useNull: true},	  
	  {name: 'SN_ATIVO', type: 'string', useNull: true},
	  {name: 'CD_EMPRESA', type: 'int', useNull: true},
	  ], 
	idProperty: 'CD_TIPO_MOVIMENTO'
});