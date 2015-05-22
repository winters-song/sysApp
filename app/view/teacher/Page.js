
Ext.define('SysApp.view.teacher.Page', {
	extend: 'Ext.container.Container',
	alias: 'widget.teacherPage',
	title: '教师管理',
	requires :[
		'SysApp.view.teacher.Form',
		'SysApp.view.teacher.Grid',
		'SysApp.view.teacher.ViewDialog',
		'SysApp.view.teacher.EditDialog'
	],
	mixins: ['SysApp.view.Page'],

	initComponent: function(){
		var me = this;

		me.initialize();

		me.createItems( 'teacherForm', 'teacherGrid' );

		SysApp.teacherInfoDialog = Ext.create('SysApp.view.teacher.ViewDialog');
		SysApp.teacherEditDialog = Ext.create('SysApp.view.teacher.EditDialog', {
			listeners: {
				'success': function(){
					this.grid.onRefresh();
				},
				scope: me
			}
		});

		me.callParent();

		me.initControls();

		me.on('destroy', function(){
			me.formPanel.destroy();
			me.grid.destroy();
			SysApp.teacherInfoDialog.destroy();
			SysApp.teacherEditDialog.destroy();
		});

		if(!SysApp.Common.Country){

			Ext.Ajax.request({
	      url: '/user/country/lists',
	      success: function(response, opts) {
        	var data = Ext.decode(response.responseText);
        	if(data && data.length){

		      	SysApp.Common.Country = {
		      		array : data
		      	};

		      	SysApp.Common.Country.map = {};

		      	Ext.each(data, function(item){
		      		SysApp.Common.Country.map[item.id] = item.cn;
		      	});
		      }
    		}
	    });
		}

	}
});