Ext.define('erp.model.Cadastro.CadastroPessoa.RedeSocialPessoaModel', {
    extend: 'Ext.data.Model',
    fields: [
      {name: 'CD_REDE_SOCIAL_PESSOA', type: 'int', useNull: true},
	  {name: 'DS_REDE_SOCIAL_PESSOA', type: 'string', useNull: true},
	  {name: 'CD_PESSOA', type: 'int', useNull: true},
	  {name: 'CD_EMPRESA', type: 'int', useNull: true},
	  {name: 'CD_REDE_SOCIAL', type: 'int', useNull: true},	
	  {name: 'DS_REDE_SOCIAL', type: 'string', useNull: true},
 	  {name: 'SN_ATIVO', type: 'string', useNull: true}
	], 
	idProperty: 'CD_REDE_SOCIAL_PESSOA'
});