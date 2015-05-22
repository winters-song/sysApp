
Ext.define('SysApp.view.category.Page', {
	extend: 'Ext.container.Container',
	alias: 'widget.categoryPage',
	title: '首页类别推荐',
	requires :[
		'SysApp.view.category.Grid'
	],
	mixins: ['SysApp.view.Page'],

	initComponent: function(){
		var me = this;

		me.initialize();

		me.items = [{
			xtype: 'categoryGrid',
			flex: 1
		}];

		me.callParent();

		me.initControls();

	}
});