Ext.define('erp.model.Configuracao.GestaoUsuario.CadastroPerfil.FuncionalidadeModel', {
    extend: 'Ext.data.Model',
    fields: [
	  {name: 'CD_FUNCIONALIDADE', type: 'int', useNull: true},
	  {name: 'DS_FUNCIONALIDADE', type: 'string', useNull: true}
    ], 
	idProperty: 'CD_FUNCIONALIDADE'
});