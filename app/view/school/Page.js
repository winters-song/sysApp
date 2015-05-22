
Ext.define('SysApp.view.school.Page', {
	extend: 'Ext.container.Container',
	alias: 'widget.schoolPage',
	title: '孔院管理',
	requires :[
		'SysApp.view.school.Form',
		'SysApp.view.school.Grid',
		'SysApp.view.school.ImportDialog'
	],
	mixins: ['SysApp.view.Page'],

	initComponent: function(){
		var me = this;

		me.initialize();

		me.createItems( 'schoolForm', 'schoolGrid' );

		var cfg = {
			listeners: {
				'success': function(){
					this.grid.onRefresh();
				},
				scope: me
			}
		};

		SysApp.cioStudentImportDialog = Ext.create('SysApp.view.school.ImportDialog', cfg);

		me.callParent();

		me.initControls();

		me.on('destroy', function(){
			me.formPanel.destroy();
			me.grid.destroy();
			SysApp.cioStudentImportDialog.destroy();
		});
	}
});