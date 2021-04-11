Ext.define('erp.model.Configuracao.GestaoUsuario.CadastroPerfil.FuncionalidadePerfilModel', {
    extend: 'Ext.data.Model',
    fields: [
      {name: 'CD_PERFIL', type: 'int', useNull: true},
	  {name: 'CD_FUNCIONALIDADE', type: 'int', useNull: true},
	  {name: 'DS_FUNCIONALIDADE', type: 'string', useNull: true}
    ]
});