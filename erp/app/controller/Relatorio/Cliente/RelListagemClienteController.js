Ext.define('erp.controller.Relatorio.Cliente.RelListagemClienteController', {
    extend: 'Ext.app.Controller',
	views: [
		'Relatorio.Cliente.RelListagemCliente'
    ],
    refs: [
        {
            ref: 'relListagemCliente',
            selector: 'relListagemCliente'
        }
    ],
    init: function() {
        this.control({
			'relListagemCliente #btnImprimir': {
				click: this.relListagemCliente_btnImprimir_click
			}
        })
    },
	
	carregarRelatorio: function() {
		var controller = this;
		controller.getRelListagemCliente().getComponent('cntRelatorio').setVisible(true);
		controller.getRelListagemCliente().getComponent('cntRelatorio').removeAll();
		var frame = Ext.create('Ext.ux.IFrame', {
			src: '../erp/reports/Cliente/RelListagemCliente.php',
			flex: 1
		});		
		controller.getRelListagemCliente().getComponent('cntRelatorio').add(frame);
	},
	
	relListagemCliente_btnImprimir_click: function(button) {
		var controller = this;
		controller.carregarRelatorio();
	}
});