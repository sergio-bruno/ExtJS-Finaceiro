Ext.define('erp.model.Configuracao.GestaoUsuario.CadastroPerfil.PerfilModel', {
    extend: 'Ext.data.Model',
    fields: [
      {name: 'CD_PERFIL', type: 'int', useNull: true},
	  {name: 'DS_PERFIL', type: 'string', useNull: true},
	  {name: 'CD_EMPRESA', type: 'int', useNull: true},
	  {name: 'SN_ATIVO', type: 'string', useNull: true}  	  
    ], 
	idProperty: 'CD_PERFIL'
});