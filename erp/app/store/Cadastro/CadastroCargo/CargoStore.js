Ext.define('erp.store.Cadastro.CadastroCargo.CargoStore', {
    extend: 'Ext.data.Store',
	requires: 'erp.model.Cadastro.CadastroCargo.CargoModel',
    model: 'erp.model.Cadastro.CadastroCargo.CargoModel',
	pageSize: 50,
    proxy: {
        type: 'ajax',
		url: '../erp/controller/Cadastro/CadastroCargoController.php?op=getListaCargo',	
        reader: {
            type: 'json',
            root: 'items', //Propriedade data do json
			totalProperty: 'totalCount',
			messageProperty: 'message',
            successProperty: 'success' //Propriedade de sucesso do json
        }
    }
});