Ext.define('erp.controller.Relatorio.Movimento.RelListagemMovimentoController', {
    extend: 'Ext.app.Controller',
    stores: [
     		'Generico.StatusFichaStore',
     		'Generico.StatusClienteStore'
    ],
	views: [
		'Relatorio.Movimento.RelListagemMovimento'
    ],
    refs: [
        {
            ref: 'relListagemMovimento',
            selector: 'relListagemMovimento'
        }
    ],
 
    init: function() {
        this.control({
			'relListagemMovimento #btnImprimir': {
				click: this.relListagemMovimento_btnImprimir_click
			},
			'relListagemMovimento #cboCdStatusFicha': {
				change: this.relListagemMovimento_cboCdStatusFicha_change
			},
			'relListagemMovimento #cboCdStatusCliente': {
				change: this.relListagemMovimento_cboCdStatusCliente_change
			}
			
        })
    },
	
    relListagemMovimento_cboCdStatusFicha_change: function(combo, newValue, oldValue, eOpts) {
		this.getRelListagemMovimento().down('panel').getComponent('edtCdStatusFicha').setValue(newValue);
	},
    
    relListagemMovimento_cboCdStatusCliente_change: function(combo, newValue, oldValue, eOpts) {
		this.getRelListagemMovimento().down('panel').getComponent('edtCdStatusCliente').setValue(newValue);
	},

	carregarRelatorio: function() {
		var controller = this;
		controller.getRelListagemMovimento().getComponent('cntRelatorio').setVisible(true);
		controller.getRelListagemMovimento().getComponent('cntRelatorio').removeAll();
		
		var cdStatusFicha = "";
		var cdStatusCliente = "";
		
		if ( controller.getRelListagemMovimento().down('panel').getComponent('edtCdStatusFicha').getValue() != null ) {
			cdStatusFicha = controller.getRelListagemMovimento().down('panel').getComponent('edtCdStatusFicha').getValue();
		}
		if ( controller.getRelListagemMovimento().down('panel').getComponent('edtCdStatusCliente').getValue() != null ) {
			cdStatusCliente = controller.getRelListagemMovimento().down('panel').getComponent('edtCdStatusCliente').getValue();
		}
		
		var frame = Ext.create('Ext.ux.IFrame', {
			src: '../erp/reports/Movimento/RelListagemMovimento.php?cdStatusFicha='+cdStatusFicha+
			'&cdStatusCliente='+cdStatusCliente
			,flex: 1
		});		
		controller.getRelListagemMovimento().getComponent('cntRelatorio').add(frame);
	},
	
	relListagemMovimento_btnImprimir_click: function(button) {
		this.carregarRelatorio();
	}
});