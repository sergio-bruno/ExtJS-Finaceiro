Ext.define('erp.model.Configuracao.ConfigGeral.CadastroFuncionalidade.FuncionalidadeModel', {
    extend: 'Ext.data.Model',
    fields: [
      {name: 'CD_FUNCIONALIDADE', type: 'int', useNull: true},
	  {name: 'DS_FUNCIONALIDADE', type: 'string', useNull: true},
	  {name: 'DS_ID_FUNCIONALIDADE', type: 'string', useNull: true},
	  {name: 'SN_ATIVO', type: 'string', useNull: true}  	  
    ], 
	idProperty: 'CD_FUNCIONALIDADE'
});