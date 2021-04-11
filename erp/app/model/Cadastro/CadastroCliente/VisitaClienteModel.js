Ext.define('erp.model.Cadastro.CadastroCliente.VisitaClienteModel', {
    extend: 'Ext.data.Model',
    fields: [
      {name: 'CD_VISITA', type: 'int', useNull: true},
	  {name: 'NM_VISITANTE', type: 'string', useNull: true},
	  {name: 'CD_PESSOA_PJ', type: 'int', useNull: true},
	  {name: 'DT_VISITA', type: 'date', dateFormat: 'Y-m-d', useNull: true}
	], 
	idProperty: 'CD_VISITA'
});