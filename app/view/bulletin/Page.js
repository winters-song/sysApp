
Ext.define('SysApp.view.bulletin.Page', {
	extend: 'Ext.container.Container',
	alias: 'widget.bulletinPage',
	title: '公告栏管理',
	requires :[
		'SysApp.view.bulletin.Form'
	],
	mixins: ['SysApp.view.Page'],

	initComponent: function(){
		var me = this;

		me.initialize();

		me.items = [{
			xtype: 'bulletinForm'
		}];

		me.callParent();

		me.formPanel = me.down('form');

		me.on('destroy', function(){
			me.formPanel.destroy();
		});
	}
});