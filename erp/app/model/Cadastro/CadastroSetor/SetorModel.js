Ext.define('erp.model.Cadastro.CadastroSetor.SetorModel', {
    extend: 'Ext.data.Model',
    fields: [
      {name: 'CD_SETOR', type: 'int', useNull: true},
	  {name: 'DS_SETOR', type: 'string', useNull: true},
	  {name: 'CD_EMPRESA', type: 'int', useNull: true},
 	  {name: 'SN_ATIVO', type: 'string', useNull: true}
	  ], 
	idProperty: 'CD_SETOR'
});