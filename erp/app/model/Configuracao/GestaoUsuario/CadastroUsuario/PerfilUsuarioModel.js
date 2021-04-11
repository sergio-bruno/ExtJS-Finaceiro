Ext.define('erp.model.Configuracao.GestaoUsuario.CadastroUsuario.PerfilUsuarioModel', {
    extend: 'Ext.data.Model',
    fields: [
      {name: 'CD_USUARIO', type: 'int', useNull: true},
	  {name: 'CD_PERFIL', type: 'int', useNull: true},
	  {name: 'DS_PERFIL', type: 'string', useNull: true}
    ]
});