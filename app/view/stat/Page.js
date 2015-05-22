
Ext.define('SysApp.view.stat.Page', {
	extend: 'Ext.container.Container',
	alias: 'widget.statPage',
	title: '数据统计',
	requires :[
		'SysApp.view.stat.Form'
	],
	mixins: ['SysApp.view.Page'],

	initComponent: function(){
		var me = this;

		me.initialize();

		me.items = [{
			xtype: 'statForm'
		}];

		me.callParent();

		me.formPanel = me.down('form');

		me.on('destroy', function(){
			me.formPanel.destroy();
		});
	}
});