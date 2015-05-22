
Ext.define('SysApp.view.teacherInfo.Page', {
	extend: 'Ext.container.Container',
	alias: 'widget.teacherInfoPage',
	title: '教师信息管理',
	requires :[
		'SysApp.view.teacherInfo.Form',
		'SysApp.view.teacherInfo.Grid'
	],
	mixins: ['SysApp.view.Page'],

	initComponent: function(){
		var me = this;

		me.initialize();

		me.createItems( 'teacherInfoForm', 'teacherInfoGrid' );

		me.callParent();

		me.initControls();

		me.on('destroy', function(){
			me.formPanel.destroy();
			me.grid.destroy();
		});

	}
});