Ext.isNull = function(v) {
	return (v == null || v == '');
}

/*Criando um tipo de validação para a senha do sistema*/
Ext.apply(Ext.form.field.VTypes, {
    password:  function(v) {
        return /^(?=.*[A-Za-z]{0,})(?=.*[0-9]).{8,}$/.test(v);
    },
    passwordText: 'A senha deve possuir no mínimo 8 caracteres alfanuméricos, dos quais'+
                  'no mínimo 1 deve ser numérico.'+
                  'Exemplo: <b>senha123</b>, <b>321senha</b>, <b>minhasenha2</b>'
});

/*Criando um tipo de validação para campos de CPF*/
Ext.apply(Ext.form.field.VTypes, {
    cpf:  function(v) {
		if (v == "")
		 return true;
		var b;
		s = v.replace(/\D/g, "");
		if (parseInt(s, 10) == 0) {
		 return false;
		}

		var iguais = true;
		for (i = 0; i < s.length - 1; i++){
		 if (s.charAt(i) != s.charAt(i + 1)){
			iguais = false;
		 }
		}

		if (iguais)
		 return false;

		var h = s.substr(0, 9);
		var a = s.substr(9, 2);
		var d = 0;
		for (b = 0; b < 9; b++) {
		 d += h.charAt(b) * (10 - b);
		}
		if (d == 0) {
		 return false;
		}
		d = 11 - (d % 11);
		if (d > 9) {
		 d = 0;
		}
		if (a.charAt(0) != d) {
		 return false;
		}
		d *= 2;
		for (b = 0; b < 9; b++) {
		 d += h.charAt(b) * (11 - b);
		}
		d = 11 - (d % 11);
		if (d > 9) {
		 d = 0;
		}
		if (a.charAt(1) != d) {
		 return false;
		}
		return true;
    },
    cpfText: 'CPF inválido'
});

/*Criando um tipo de validação para campos de CNPJ*/
Ext.apply(Ext.form.VTypes,{
	cnpj: function(val){
		if (val != '') {
			exp = /\.|\-|\//g
			var val = val.toString().replace( exp, "" ); 
			var b = [6,5,4,3,2,9,8,7,6,5,4,3,2];
			if((val = val.replace(/[^\d]/g,"").split("")).length != 14) return false;
			for(var i = 0, n = 0; i < 12; n += val[i] * b[++i]);
			if(val[12] != (((n %= 11) < 2) ? 0 : 11 - n)) return false;
			for(var i = 0, n = 0; i <= 12; n += val[i] * b[i++]);
			if(val[13] != (((n %= 11) < 2) ? 0 : 11 - n)) return false;
			return true;
		} else {
			return true;
		}
	},
	cnpjText: 'CNPJ inválido!'
});