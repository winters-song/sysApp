
Ext.define('SysApp.view.classes.Page', {
	extend: 'Ext.container.Container',
	alias: 'widget.classPage',
	title: '课堂管理',
	requires :[
		'SysApp.view.classes.Form',
		'SysApp.view.classes.Grid'
	],
	mixins: ['SysApp.view.Page'],

	initComponent: function(){
		var me = this;

		me.initialize();

		me.createItems( 'classForm', 'classGrid' );

		me.callParent();

		me.initControls();

		me.on('destroy', function(){
			me.formPanel.destroy();
			me.grid.destroy();
		});

	},

	loadType: function(id, field){
		var me = this;

		Ext.Ajax.request({
      url: '/Course/Index/classification/id/'+id+'?lang=cn',
      method: 'get',
      scope: me,
      success: function(response){
    		var json = Ext.decode(response.responseText, { safe: true});
    		if(json && json.length){
    			SysApp[field] = json;
    		}
      }
    });
	}
	
});