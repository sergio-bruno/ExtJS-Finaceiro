Ext.define('erp.model.Generico.PessoaModel', {
    extend: 'Ext.data.Model',
    fields: [
      {name: 'CD_PESSOA', type: 'int', useNull: true},
	  {name: 'NM_PESSOA', type: 'string', useNull: true}
    ], 
	idProperty: 'CD_PESSOA'
});