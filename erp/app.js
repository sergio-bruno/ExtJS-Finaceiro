Ext.Loader.setConfig({
    enabled: true,
    paths: {
        "Ext.ux": "../lib/ext-4.2.1.883/src/ux"/*,
		"Extensible": "../lib/ext-4.2.1.883/src/ux/extensible/src"*/	
    }
});
Ext.require([
  'Ext.ux.IFrame',
  'Ext.ux.TextMaskPlugin'/*,
  'Ext.tualo.PivotGridAxis',
  'Ext.tualo.PivotGrid',
  'Extensible.calendar.CalendarPanel',
  'Extensible.calendar.gadget.CalendarListPanel'*/
]);

Ext.application({
    name: 'erp',
    controllers: [
        /* Global */          
		'Global.TitlebarController',
		'Global.MenuPrincipalController',
		'Global.UtilController',
		
		/* Cadastros */
		'Cadastro.CadastroSetorController',
		'Cadastro.CadastroTipoMovimentoController',
		'Cadastro.CadastroTipoEnderecoController',
		'Cadastro.CadastroRedeSocialController',
		'Cadastro.CadastroAreaAtuacaoController',
		'Cadastro.CadastroTipoContatoController',
		'Cadastro.CadastroPessoaController',
		'Cadastro.CadastroFornecedorController',
		'Cadastro.CadastroTipoServicoController',
		'Cadastro.CadastroCargoController',
		'Cadastro.CadastroStatusClienteController',
		'Cadastro.CadastroStatusFichaController',
		'Cadastro.CadastroClassificacaoController',
		'Cadastro.CadastroClienteController',
		'Cadastro.CadastroPlanoContaController',
		'Cadastro.CadastroEspecialidadeController',
		'Cadastro.CadastroTipoConselhoController',
		
		/* Outros movimentos */
		'Movimento.MovimentoFichaServicoController',
		
		/* Módulo financeiro */
		'Financeiro.FinanceiroContaPagarController',
		'Financeiro.BaixaContaPagarController',
		'Financeiro.FinanceiroContaReceberController',
		'Financeiro.BaixaContaReceberController',
		
		/* Relatórios */
		'Relatorio.Cadastro.RelListagemPlanoContaController',

		'Relatorio.Cliente.RelListagemClienteController',
		'Relatorio.Cliente.RelListagemClienteAniversarianteController',
		
		'Relatorio.Movimento.RelListagemMovimentoController',
		
		'Relatorio.Financeiro.RelListagemContaPagarController',
		'Relatorio.Financeiro.RelListagemContaReceberController',
		
		/* Configurações */
		'Configuracao.ConfigGeral.CadastroFuncionalidadeController',
		'Configuracao.GestaoUsuario.CadastroUsuarioController',
		'Configuracao.GestaoUsuario.CadastroPerfilController'
    ],
    autoCreateViewport: true,
	
	// create a reference in Ext.application so we can access it from multiple functions
    splashscreen: {},
 
    init: function() {
        // start the mask on the body and get a reference to the mask
         splashscreen = Ext.getBody().mask('Carregando o sistema. Aguarde...', 'splashscreen');
    },
 
    launch: function() {
 
        Ext.tip.QuickTipManager.init();
        var task = new Ext.util.DelayedTask(function() {
 
            // fade out the body mask
            splashscreen.fadeOut({
                duration: 1000,
                remove: true
            });
 
            // fade out the message
            splashscreen.next().fadeOut({
                duration: 1000,
                remove: true
            });
 
       });
 
       task.delay(2000);
 
    }
});
