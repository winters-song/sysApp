Ext.define('SysApp.view.detect.Page', {
	extend: 'Ext.container.Container',
	alias: 'widget.detectPage',
	title: '用户诊断信息',
	requires :[
		'SysApp.view.detect.Form',
		'SysApp.view.detect.Grid',
		'SysApp.view.detect.ViewDialog'
	],
	mixins: ['SysApp.view.Page'],

	initComponent: function(){
		var me = this;

		me.initialize();

		me.createItems( 'detectForm', 'detectGrid' );

		SysApp.detectInfoDialog = Ext.create('SysApp.view.detect.ViewDialog');

		me.callParent();

		me.initControls();

		me.on('destroy', function(){
			me.formPanel.destroy();
			me.grid.destroy();
			SysApp.detectInfoDialog.destroy();
		});
	}
});