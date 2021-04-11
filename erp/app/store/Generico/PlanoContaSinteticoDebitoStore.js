Ext.define('erp.store.Generico.PlanoContaSinteticoDebitoStore', {
    extend: 'Ext.data.Store',
	requires: 'erp.model.Generico.PlanoContaModel',
    model: 'erp.model.Generico.PlanoContaModel',
    proxy: {
        type: 'ajax',
		url: '../erp/controller/Generico/GenericoController.php?op=getListaPlanoContaSinteticoDebito',	
        reader: {
            type: 'json',
            root: 'items', //Propriedade data do json
			totalProperty: 'totalCount',
            successProperty: 'success' //Propriedade de sucesso do json
        }
    }
});