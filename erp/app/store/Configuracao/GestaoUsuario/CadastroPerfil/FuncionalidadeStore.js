Ext.define('erp.store.Configuracao.GestaoUsuario.CadastroPerfil.FuncionalidadeStore', {
    extend: 'Ext.data.Store',
	requires: 'erp.model.Configuracao.GestaoUsuario.CadastroPerfil.FuncionalidadeModel',
    model: 'erp.model.Configuracao.GestaoUsuario.CadastroPerfil.FuncionalidadeModel',
    proxy: {
        type: 'ajax',
		url: '../erp/controller/Configuracao/GestaoUsuario/CadastroPerfilController.php?op=getListaFuncionalidade',	
        reader: {
            type: 'json',
            root: 'items', //Propriedade data do json
			totalProperty: 'totalCount',
            successProperty: 'success' //Propriedade de sucesso do json
        }
    }
});