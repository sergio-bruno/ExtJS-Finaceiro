Ext.define('erp.store.Configuracao.GestaoUsuario.CadastroUsuario.UsuarioStore', {
    extend: 'Ext.data.Store',
	requires: 'erp.model.Configuracao.GestaoUsuario.CadastroUsuario.UsuarioModel',
    model: 'erp.model.Configuracao.GestaoUsuario.CadastroUsuario.UsuarioModel',
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