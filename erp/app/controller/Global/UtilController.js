Ext.define('erp.controller.Global.UtilController', {
    extend: 'Ext.app.Controller',
	stores: [
		'Global.Util.FuncionalidadeUsuarioStore'
	],
	versaoSistema: '0.0.1',
    init: function() {

        /*this.control({
        });*/
    },
	
	carregarFuncionalidadeUsuario: function() {
		var controller = this, 
		storePermissaoFuncionalidade = controller.getGlobalUtilFuncionalidadeUsuarioStoreStore();
		storePermissaoFuncionalidade.load();
	},
	
	verificarSessao: function() {
		var controller = this;
		Ext.Ajax.request({
			url: '../erp/controller/Global/UtilController.php?op=verificarSessao',
			callback: function(options, success, response) {
				if (response.responseText != 'true') {
					controller.getController('Global.TitlebarController').efetuarLogoff();
				} 
			},
			method: 'post'
		});	
	},

	verificarPermissaoFuncionalidade: function(dsIdFuncionalidade) {
		var controller = this,
		permissao = false, 
		storePermissaoFuncionalidade = controller.getGlobalUtilFuncionalidadeUsuarioStoreStore();
		storePermissaoFuncionalidade.data.each(function(item, index, totalItems ) {
			if (item.get('DS_ID_FUNCIONALIDADE') == dsIdFuncionalidade) {
				permissao = true;
				return false;
			}
		});
		return permissao;
	}
	
});
