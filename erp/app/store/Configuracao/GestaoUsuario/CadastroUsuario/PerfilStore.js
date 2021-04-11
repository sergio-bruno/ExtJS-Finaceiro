Ext.define('erp.store.Configuracao.GestaoUsuario.CadastroUsuario.PerfilStore', {
    extend: 'Ext.data.Store',
	requires: 'erp.model.Configuracao.GestaoUsuario.CadastroUsuario.PerfilModel',
    model: 'erp.model.Configuracao.GestaoUsuario.CadastroUsuario.PerfilModel',
    proxy: {
        type: 'ajax',
		url: '../erp/controller/Configuracao/GestaoUsuario/CadastroUsuarioController.php?op=getListaPerfil',	
        reader: {
            type: 'json',
            root: 'items', //Propriedade data do json
			totalProperty: 'totalCount',
            successProperty: 'success' //Propriedade de sucesso do json
        }
    }
});