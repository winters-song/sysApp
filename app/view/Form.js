Ext.define('SysApp.view.Form', {

	initialize: function(){
		var me = this;
		
		Ext.apply(me, {
      padding: '20 20 10',
      layout: 'hbox',
      border:false,
      defaults: {
        border:false
      },
      buttonAlign: 'center',

      specialKey : function(field, e){
        if (e.getKey() == e.ENTER) {
          this.doSearch();
        }
      }
    });

    me.createButtons();

	},

  createButtons: function(){
    var me = this;

    me.buttons = [{
      text: '查询',
      iconCls: 'icon-search',
      handler: me.doSearch,
      scale: 'medium',
      scope: me,
      margins: '0 20 0 0'
    }, {
      text: '清空条件',
      // iconCls: 'icon-clear',
      scale: 'medium',
      handler: function() {
        me.getForm().reset();
        me.doSearch();
      }
    }];

  },
	
	doSearch: function(){
		var me = this;
		var form = me.getForm();
    if (form.isValid()) {
      var values = form.getValues();

      for(var i in values){
        if(values[i] == ''){
          delete values[i];
        }
      }
    
      me.fireEvent('search', me, values);
    }
	}

});
