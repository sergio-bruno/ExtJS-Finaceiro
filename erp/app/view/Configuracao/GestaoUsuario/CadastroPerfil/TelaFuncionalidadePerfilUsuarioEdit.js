Ext.define('erp.view.Configuracao.GestaoUsuario.CadastroPerfil.TelaFuncionalidadePerfilUsuarioEdit', {
    extend: 'Ext.Window',
    alias: 'widget.telaFuncionalidadePerfilUsuarioEdit',
	layout: 'fit',
    width: 400,  //Largura da janela
    height: 148, //Altura da janela
    resizable: false,
	modal: true,
	title: 'Funcionalidades do perfil',
	items: [
		{
			xtype: 'form',
			layout: 'absolute',
			border: false,
			defaults: {
				labelAlign: 'top',
				labelSeparator: ''
			},
			items: [
				{
					xtype : "numberfield",
					itemId : "edtCdPerfil",
					name: 'CD_PERFIL',
					hidden: true
				},
				{
					xtype : "numberfield",
					itemId : "edtCdFuncionalidade",
					name: 'CD_FUNCIONALIDADE',
					hidden: true
				},
				{
					x:8,y:8,
					fieldLabel: 'Selecione o funcionalidade',
					itemId : "cboCdFuncionalidade",
					width: 370,
					xtype : "combobox",
					store: 'Configuracao.GestaoUsuario.CadastroPerfil.FuncionalidadeStore',
					displayField: 'DS_FUNCIONALIDADE',
					valueField: 'CD_FUNCIONALIDADE',
					pageSize: 30,
					queryDelay: 250,
					queryParam: 'dsFuncionalidade',
					forceSelection: true,
					allowBlank: false,
					minChars: 3
				}
			]
		}
    ],
	buttons: [ 
		{ 
		  itemId: 'btnSalvarFuncionalidadePerfilUsuario',
		  width: 75,
		  height: 25,
		  text: 'Salvar',
		  iconCls: 'save_16'
		}
	]
});