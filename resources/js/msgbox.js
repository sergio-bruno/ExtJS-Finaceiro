Ext.msgbox = function(){
    var msgCt;

    function createBox(t, s, type){
       var divClass = '';
	   if (type=='I') {
		 divClass = 'msg-information';
		 imgSrc = '<img src="../resources/images/information_16.png" noborder>';
	   } else if (type=='W') {
		 divClass = 'msg-warning';
		 imgSrc = '<img src="../resources/images/warning_16.png" noborder>';
	   } else if (type=='E') {
		 divClass = 'msg-error';
		 imgSrc = '<img src="../resources/images/error_16.png" noborder>';
	   }
	   return '<div class="'+divClass+'"><h3>' + imgSrc + '&nbsp;' + t + '</h3><p>' + s + '</p></div>';
    }
    return {
        msg : function(title, format, type, duration){
            if(!msgCt){
                msgCt = Ext.DomHelper.insertFirst(document.body, {id:'msgbox-div'}, true);
            }
            var s = Ext.String.format.apply(String, Array.prototype.slice.call(arguments, 1));
            var m = Ext.DomHelper.append(msgCt, createBox(title, s, type), true);
            m.hide();
            m.slideIn('t').ghost("t", { delay: duration, remove: true});
        },

        init : function(){
            if(!msgCt){
                // It's better to create the msgbox-div here in order to avoid re-layouts 
                // later that could interfere with the HtmlEditor and reset its iFrame.
                msgCt = Ext.DomHelper.insertFirst(document.body, {id:'msgbox-div'}, true);
            }
        }
    };
}();