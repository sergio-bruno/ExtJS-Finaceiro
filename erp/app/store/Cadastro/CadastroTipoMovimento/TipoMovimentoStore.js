Ext.define('erp.store.Cadastro.CadastroTipoMovimento.TipoMovimentoStore', {
    extend: 'Ext.data.Store',
	requires: 'erp.model.Cadastro.CadastroTipoMovimento.TipoMovimentoModel',
    model: 'erp.model.Cadastro.CadastroTipoMovimento.TipoMovimentoModel',
	pageSize: 50,
    proxy: {
        type: 'ajax',
		url: '../erp/controller/Cadastro/CadastroTipoMovimentoController.php?op=getListaTipoMovimento',	
        reader: {
            type: 'json',
            root: 'items', //Propriedade data do json
			totalProperty: 'totalCount',
			messageProperty: 'message',
            successProperty: 'success' //Propriedade de sucesso do json
        }
    }
});