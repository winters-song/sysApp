
Ext.define('SysApp.view.Page', {

	initialize: function(){
		var me = this;

		Ext.apply(me, {
			layout: {
		    type: 'vbox',
		    align : 'stretch',
		    pack  : 'start'
		  }
		});
	
	},

	createItems: function(form, grid){
		var me = this;

		me.items = [{
			xtype: form
		},{
			xtype: grid,
			flex: 1
		}];
	},

	initControls: function(){
		var me = this;

		me.formPanel = me.down('form');
		me.grid = me.down('grid');

		if(me.formPanel){
			me.formPanel.on('search', function(form, values){
				var store = me.grid.getStore();
				var proxy = store.getProxy();
				
				proxy.extraParams = values;
				store.loadPage(1);
			},me);

		}
	}

});