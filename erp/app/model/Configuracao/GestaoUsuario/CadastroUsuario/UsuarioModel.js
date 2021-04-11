Ext.define('erp.model.Configuracao.GestaoUsuario.CadastroUsuario.UsuarioModel', {
    extend: 'Ext.data.Model',
    fields: [
      {name: 'CD_USUARIO', type: 'int', useNull: true},
	  {name: 'NM_LOGIN', type: 'string', useNull: true},
	  {name: 'TP_NIVEL_ACESSO', type: 'string', useNull: true},
	  {name: 'DS_EMAIL', type: 'string', useNull: true},
	  {name: 'DS_SENHA', type: 'string', useNull: true},
	  {name: 'DT_CADASTRO', type: 'date', dateFormat: 'Y-m-d H:i:s', useNull: true},
	  {name: 'SN_ATIVO', type: 'string', useNull: true},
	  {name: 'SN_ALTERA_SENHA_PROX_LOGON', type: 'string', useNull: true},
	  {name: 'DT_VALIDADE_SENHA', type: 'date', dateFormat: 'Y-m-d', useNull: true},
	  {name: 'SN_ACESSO_BLOQUEADO', type: 'string', useNull: true},
	  {name: 'DT_ALTERACAO', type: 'date', dateFormat: 'Y-m-d H:i:s', useNull: true},
	  {name: 'CD_USUARIO_ALTERACAO', type: 'int', useNull: true},
	  {name: 'DS_SENHA_ATUAL', type: 'string', useNull: true},
	  {name: 'CD_EMPRESA', type: 'int', useNull: true}
    ], 
	idProperty: 'CD_USUARIO'
});