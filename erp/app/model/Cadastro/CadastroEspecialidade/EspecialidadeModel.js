Ext.define('erp.model.Cadastro.CadastroEspecialidade.EspecialidadeModel', {
    extend: 'Ext.data.Model',
    fields: [
      {name: 'CD_ESPECIALIDADE', type: 'int', useNull: true},
	  {name: 'DS_ESPECIALIDADE', type: 'string', useNull: true},	  
	  {name: 'SN_ATIVO', type: 'string', useNull: true},
	  {name: 'CD_EMPRESA', type: 'int', useNull: true},
	  ], 
	idProperty: 'CD_ESPECIALIDADE'
});