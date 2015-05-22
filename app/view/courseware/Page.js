
Ext.define('SysApp.view.courseware.Page', {
	extend: 'Ext.container.Container',
	alias: 'widget.coursewarePage',
	title: '课件管理',
	requires :[
		'SysApp.view.courseware.Form',
		'SysApp.view.courseware.Grid'
	],
	mixins: ['SysApp.view.Page'],

	initComponent: function(){
		var me = this;

		me.initialize();

		me.createItems( 'coursewareForm', 'coursewareGrid' );

		me.callParent();

		me.initControls();

	}
	
});