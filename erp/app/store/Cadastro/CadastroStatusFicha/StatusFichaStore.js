Ext.define('erp.store.Cadastro.CadastroStatusFicha.StatusFichaStore', {
    extend: 'Ext.data.Store',
	requires: 'erp.model.Cadastro.CadastroStatusFicha.StatusFichaModel',
    model: 'erp.model.Cadastro.CadastroStatusFicha.StatusFichaModel',
	pageSize: 50,
    proxy: {
        type: 'ajax',
		url: '../erp/controller/Cadastro/CadastroStatusFichaController.php?op=getListaStatusFicha',	
        reader: {
            type: 'json',
            root: 'items', //Propriedade data do json
			totalProperty: 'totalCount',
			messageProperty: 'message',
            successProperty: 'success' //Propriedade de sucesso do json
        }
    }
});