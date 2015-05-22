
Ext.define('SysApp.view.org.Page', {
	extend: 'Ext.container.Container',
	alias: 'widget.orgPage',
	title: '机构管理',
	requires :[
		'SysApp.view.org.Form',
		'SysApp.view.org.Grid',
		'SysApp.view.org.AddDialog',
		'SysApp.view.org.EditDialog',
		'SysApp.view.org.ViewDialog',
		'SysApp.view.org.ImportDialog',
		'SysApp.view.org.ImportTeacherDialog'
	],
	mixins: ['SysApp.view.Page'],

	initComponent: function(){
		var me = this;

		me.initialize();

		me.createItems( 'orgForm', 'orgGrid' );

		var cfg = {
			listeners: {
				'success': function(){
					this.grid.onRefresh();
				},
				scope: me
			}
		};

		SysApp.orgAddDialog = Ext.create('SysApp.view.org.AddDialog', cfg);
		SysApp.orgEditDialog = Ext.create('SysApp.view.org.EditDialog', cfg);
		SysApp.studentImportDialog = Ext.create('SysApp.view.org.ImportDialog', cfg);
		SysApp.teacherImportDialog = Ext.create('SysApp.view.org.ImportTeacherDialog', cfg);

		SysApp.orgViewDialog = Ext.create('SysApp.view.org.ViewDialog');

		me.callParent();

		me.initControls();

		me.on('destroy', function(){
			me.formPanel.destroy();
			me.grid.destroy();
			SysApp.orgAddDialog.destroy();
			SysApp.orgEditDialog.destroy();
			SysApp.orgViewDialog.destroy();
			SysApp.studentImportDialog.destroy();
			SysApp.teacherImportDialog.destroy();
		});
	}
});