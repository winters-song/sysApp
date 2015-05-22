
Ext.define('SysApp.view.series.Page', {
	extend: 'Ext.container.Container',
	alias: 'widget.seriesPage',
	title: '系列课管理',
	requires :[
		'SysApp.view.series.Form',
		'SysApp.view.series.Grid'
	],
	mixins: ['SysApp.view.Page'],

	initComponent: function(){
		var me = this;

		me.initialize();

		me.createItems( 'seriesForm', 'seriesGrid' );

		var cfg = {
			listeners: {
				'success': function(){
					this.grid.onRefresh();
				},
				scope: me
			}
		};

		me.callParent();

		me.initControls();

		me.on('destroy', function(){
			me.formPanel.destroy();
			me.grid.destroy();
		});

	}
});