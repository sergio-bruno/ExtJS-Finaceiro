/*jslint  */
/*globals Ext */
 
/**
 * autor: Rodrigo Krummenauer do Nascimento
 * site: www.rkn.com.br
 * email: rodrigoknascimento@gmail.com
 * 
 * Versão: 4.3
 * Lincença: GPLv3
 **/

/**
 * MODO DE USO DO Ext.ux.TextMaskPlugin (ptype: 'textmask')
 *
 *	var campo = Ext.create('Ext.field.TextField',{
 *		plugins: 'textmask',
 *		mask: '(099) 9999-9999',
 *		money: false
 *	})
 *
 *	Ext.create('Ext.panel.Panel', {
 *		title: 'Exemplo mascara dinheiro',
 *		renderTo: Ext.getBody(),
 *		items: [{
 *			xtype: 'textfield',
 *			plugins: 'textmask',
 *			fieldLabel: 'Valor',
 *			mask: 'R$ #9.999.990,00',
 *			money: true
 *		},{
 *			xtype: 'textfield',
 *			plugins: 'textmask',
 *			fieldLabel: 'Completo',
 *			mask: '% #0.0',
 *			money: true
 *		}]
 *	})
 * 
 * Temos a função setMask(mascara) que serve para mudar a mascara
 * depois que o objeto já estiver criado.
 **/

Ext.require(['Ext.ux.TextMaskCore']);

Ext.define('Ext.ux.TextMaskPlugin',
{
	extend	: 'Ext.AbstractPlugin',
	alias	: "plugin.textmask",
	useMask	: true,
	date	: false,
	maskRel	: {
		m: '99',
		d: '99',
		n: '99',
		j: '99',
		Y: '9999'
	},
	init: function(cp)
	{
		this.cp = cp;
		
		if(this.cp.xtype === 'datefield')
		{
			this.date = true;
		}
		
		if(this.date)
		{
			this.cp.mask = '';
			Ext.each(this.cp.format.split(''), function(item){
				this.cp.mask += this.maskRel[item] || item;
			},this);
		}
		
		cp.textMask = new Ext.ux.TextMaskCore(cp.mask, cp.money);
		
		cp.emptyText = cp.textMask.mask('');
		
		cp.updateHidden = this.updateHidden;
		cp.getKeyCode = this.getKeyCode;
		cp.simpleUpdateHidden = this.simpleUpdateHidden;
		cp.getValue = this.getValue;
		cp.getRawValue = this.getRawValue;
		cp.getValueWithMask = this.getValueWithMask;
		cp.getValueWithoutMask = this.getValueWithoutMask;
		cp.setMask = this.setMask;
		
		if(this.date)
		{
			cp.setValue = this.setDateValue;
			cp.getSubmitData = this.getSubmitData;
		}
		else
		{
			cp.setValue = this.setValue;
		}
		
		if(Ext.isEmpty(cp.useMask))
		{
			cp.useMask = this.useMask;
		}
		
		cp.on('afterrender', this.afterRender, cp);
	},
	afterRender: function()
	{
		if(this.money)
		{
			this.inputEl.setStyle('text-align', 'right');
		}
		
		this.hiddenField = this.inputEl.insertSibling({
			tag: 'input',
			type: 'hidden',
			name: this.name,
			value: this.textMask.mask(this.value)
		}, 'after');
		
		this.hiddenName = this.name;
		this.inputEl.dom.removeAttribute('name');
		this.enableKeyEvents = true;

		this.inputEl.on({
			keypress:this.updateHidden,
			keydown:function(e)
			{
				if(this.readOnly)
				{
					return false;
				}
				if(e.getKey() === e.BACKSPACE)
				{
					if(this.money){
						this.hiddenField.dom.value = this.hiddenField.dom.value.substr(0, this.hiddenField.dom.value.length-1);
						this.hiddenField.dom.value = this.hiddenField.dom.value.replace(/[.]/g, '');
						this.hiddenField.dom.value = this.textMask.parsePrecision(this.hiddenField.dom.value, this.textMask.moneyPrecision);
						this.hiddenField.dom.value = this.textMask.unmask(this.hiddenField.dom.value);
					}else{
						this.hiddenField.dom.value = this.hiddenField.dom.value.substr(0, this.hiddenField.dom.value.length-1);
					}
					this.updateHidden(e);
				}
				this.keyDownEventKey = e.getKey();
			},
			keyup:this.simpleUpdateHidden,
			scope:this
		});
		this.inputEl.dom.value = this.textMask.mask(this.hiddenField.dom.value);
		this.setValue(this.value);
	},
	getKeyCode : function(onKeyDownEvent, type)
	{
		if(this.readOnly)
		{
			return false;
		}
		var keycode = {};
		keycode.unicode = onKeyDownEvent.getKey();
		keycode.isShiftPressed = onKeyDownEvent.shiftKey;
		
		keycode.isDelete = ((onKeyDownEvent.getKey() === Ext.EventObject.DELETE && type === 'keydown') || ( type === 'keypress' && onKeyDownEvent.charCode === 0 && onKeyDownEvent.keyCode === Ext.EventObject.DELETE)) ? true: false;
		keycode.isTab = (onKeyDownEvent.getKey() === Ext.EventObject.TAB)? true: false;
		keycode.isBackspace = (onKeyDownEvent.getKey() === Ext.EventObject.BACKSPACE)? true: false;
		keycode.isLeftOrRightArrow = (onKeyDownEvent.getKey() === Ext.EventObject.LEFT || onKeyDownEvent.getKey() === Ext.EventObject.RIGHT)? true: false;
		keycode.pressedKey = String.fromCharCode(keycode.unicode);
		return(keycode);
	},
	updateHidden: function(e)
	{
		if(this.readOnly || !this.useMask)
		{
			return false;
		}
		var key = this.getKeyCode(e, 'keydown');
		var kk = this.keyDownEventKey || e.getKey();

		if(!(kk >= e.F1 && kk <= e.F12) && !e.isNavKeyPress())
		{
			if(this.inputEl.dom.selectionStart === 0 && this.inputEl.dom.selectionEnd === this.inputEl.dom.value.length)
			{
				this.hiddenField.dom.value = this.money ? 0 : '';
			}
			if(!key.isBackspace)
			{
				if(this.money)
				{
					this.hiddenField.dom.value = String(this.hiddenField.dom.value) + String(key.pressedKey);
					this.hiddenField.dom.value = this.hiddenField.dom.value.replace(/[.]/g, '');
					this.hiddenField.dom.value = this.textMask.parsePrecision(this.hiddenField.dom.value, this.textMask.moneyPrecision);
					this.hiddenField.dom.value = this.textMask.unmask(this.hiddenField.dom.value);
				}
				else
				{
					var hiddenValue = this.hiddenField.dom.value === 'undefined' ? key.pressedKey : this.hiddenField.dom.value + key.pressedKey;
					this.hiddenField.dom.value = this.textMask.unmask(hiddenValue);
				}
			}
			
			this.inputEl.dom.value = this.textMask.mask(this.hiddenField.dom.value);
			this.inputEl.dom.selectionStart = this.textMask.getLength(this.hiddenField.dom.value);
			this.inputEl.dom.selectionEnd = this.inputEl.dom.selectionStart;
			
			e.preventDefault();
		}
	},
	simpleUpdateHidden: function(e)
	{
		if(this.readOnly || this.useMask){
			return false;
		}
		this.hiddenField.dom.value = this.inputEl.dom.value;
	},
	getValue: function()
	{
		if(this.returnWithMask)
		{
			return this.getValueWithMask();
		}else{
			return this.getValueWithoutMask();
		}
	},
	getValueWithMask: function()
	{
		if(this.hiddenField)
		{
			return this.inputEl.dom.value;
		}
		else
		{
			return '';
		}
	},
	getValueWithoutMask: function()
	{
		if(this.hiddenField)
		{
			return this.hiddenField.dom.value;
		}
		else
		{
			return '';
		}
	},
	getRawValue: function()
	{
		return this.getValue();
	},
	setValue: function(v)
	{
		if(this.useMask)
		{
			if(this.inputEl)
			{
				this.hiddenField.dom.value = this.textMask.unmask(v);
				this.inputEl.dom.value = this.textMask.mask(v);
			}
			this.value = this.textMask.unmask(v);
		}
		else
		{
			if(this.inputEl)
			{
				this.hiddenField.dom.value = v;
				this.inputEl.dom.value = v;
			}
			this.value = v;
		}
	},
	setDateValue: function(v)
	{
		if(v === 'now')
		{
			v = new Date();
		}
		
		if(this.inputEl)
		{
			v = this.formatDate(this.parseDate(v));
			this.hiddenField.dom.value = v;
			this.inputEl.dom.value = this.textMask.mask(v);
		}
		this.value = v;
	},
	setMask: function(mask)
	{
		this.textMask.setMask(mask);
		this.setValue(this.hiddenField.dom.value);
	},
	getSubmitData: function() {
        var me = this,
            data = null,
            val;

        if (!me.disabled && me.submitValue && !me.isFileUpload()) {
            val = me.getValue();

            if (val !== null) {
                data = {};
                data[me.getName()] = val;
            }
        }

        return data;
    }
});