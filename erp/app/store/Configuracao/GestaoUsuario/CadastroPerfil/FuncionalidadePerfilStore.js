Ext.define('erp.store.Configuracao.GestaoUsuario.CadastroPerfil.FuncionalidadePerfilStore', {
    extend: 'Ext.data.Store',
	requires: 'erp.model.Configuracao.GestaoUsuario.CadastroPerfil.FuncionalidadePerfilModel',
    model: 'erp.model.Configuracao.GestaoUsuario.CadastroPerfil.FuncionalidadePerfilModel',
    proxy: {
        type: 'ajax',
        reader: {
            type: 'json',
            root: 'items', //Propriedade data do json
			totalProperty: 'totalCount',
            successProperty: 'success' //Propriedade de sucesso do json
        }
    }
});