Ext.define('erp.model.Cadastro.CadastroPlanoConta.PlanoContaModel', {
    extend: 'Ext.data.Model',
    fields: [
      {name: 'CD_PLANO_CONTA', type: 'int', useNull: true},
      {name: 'CD_CONTA', type: 'string', useNull: true},
	  {name: 'DS_PLANO_CONTA', type: 'string', useNull: true},
	  {name: 'TP_LANCAMENTO', type: 'string', useNull: true},
	  {name: 'TP_CONTA', type: 'string', useNull: true},
	  {name: 'SN_CONTABILIZA', type: 'string', useNull: true},
	  {name: 'SN_ATIVO', type: 'string', useNull: true},
	  {name: 'CD_EMPRESA', type: 'int', useNull: true}
	  ], 
	idProperty: 'CD_PLANO_CONTA'
});