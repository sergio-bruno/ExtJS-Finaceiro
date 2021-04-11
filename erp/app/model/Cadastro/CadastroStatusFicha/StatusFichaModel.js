Ext.define('erp.model.Cadastro.CadastroStatusFicha.StatusFichaModel', {
    extend: 'Ext.data.Model',
    fields: [
      {name: 'CD_STATUS_FICHA', type: 'int', useNull: true},
	  {name: 'DS_STATUS_FICHA', type: 'string', useNull: true},	  
	  {name: 'SN_ATIVO', type: 'string', useNull: true},
	  {name: 'CD_EMPRESA', type: 'int', useNull: true},
	  ], 
	idProperty: 'CD_STATUS_FICHA'
});