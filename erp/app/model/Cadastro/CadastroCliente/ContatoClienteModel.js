Ext.define('erp.model.Cadastro.CadastroCliente.ContatoClienteModel', {
    extend: 'Ext.data.Model',
    fields: [
      {name: 'CD_CONTATO', type: 'int', useNull: true},
	  {name: 'NM_CONTATO', type: 'string', useNull: true},
	  {name: 'CD_PESSOA_PJ', type: 'int', useNull: true},
	  {name: 'CD_TIPO_CONTATO', type: 'int', useNull: true},	
	  {name: 'DS_TIPO_CONTATO', type: 'string', useNull: true},
	  {name: 'DS_EMAIL', type: 'string', useNull: true},
	  {name: 'NR_TELEFONE_1', type: 'string', useNull: true},	
	  {name: 'NR_TELEFONE_2', type: 'string', useNull: true},
	  {name: 'CD_CARGO', type: 'int', useNull: true},	
	  {name: 'DS_CARGO', type: 'string', useNull: true},
	  {name: 'DS_ELO', type: 'string', useNull: true},
 	  {name: 'SN_ATIVO', type: 'string', useNull: true}
	], 
	idProperty: 'CD_CONTATO'
});