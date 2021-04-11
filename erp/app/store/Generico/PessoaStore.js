Ext.define('erp.store.Generico.PessoaStore', {
    extend: 'Ext.data.Store',
	requires: 'erp.model.Generico.PessoaModel',
    model: 'erp.model.Generico.PessoaModel',
    proxy: {
        type: 'ajax',
		url: '../erp/controller/Generico/GenericoController.php?op=getListaPessoa',	
        reader: {
            type: 'json',
            root: 'items', //Propriedade data do json
			totalProperty: 'totalCount',
            successProperty: 'success' //Propriedade de sucesso do json
        }
    }
});