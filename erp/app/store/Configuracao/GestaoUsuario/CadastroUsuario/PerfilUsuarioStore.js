Ext.define('erp.store.Configuracao.GestaoUsuario.CadastroUsuario.PerfilUsuarioStore', {
    extend: 'Ext.data.Store',
	requires: 'erp.model.Configuracao.GestaoUsuario.CadastroUsuario.PerfilUsuarioModel',
    model: 'erp.model.Configuracao.GestaoUsuario.CadastroUsuario.PerfilUsuarioModel',
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