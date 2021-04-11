Ext.define('erp.store.Configuracao.GestaoUsuario.CadastroPerfil.PerfilStore', {
    extend: 'Ext.data.Store',
	requires: 'erp.model.Configuracao.GestaoUsuario.CadastroPerfil.PerfilModel',
    model: 'erp.model.Configuracao.GestaoUsuario.CadastroPerfil.PerfilModel',
	pageSize: 50,
    proxy: {
        type: 'ajax',
        reader: {
            type: 'json',
            root: 'items', //Propriedade data do json
			totalProperty: 'totalCount',
			messageProperty: 'message',
            successProperty: 'success' //Propriedade de sucesso do json
        }
    }
});