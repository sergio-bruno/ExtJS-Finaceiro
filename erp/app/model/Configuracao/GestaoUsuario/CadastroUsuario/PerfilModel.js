Ext.define('erp.model.Configuracao.GestaoUsuario.CadastroUsuario.PerfilModel', {
    extend: 'Ext.data.Model',
    fields: [
      {name: 'CD_PERFIL', type: 'int', useNull: true},
	  {name: 'DS_PERFIL', type: 'string', useNull: true}
    ], 
	idProperty: 'CD_PERFIL'
});