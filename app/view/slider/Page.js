
Ext.define('SysApp.view.slider.Page', {
	extend: 'Ext.container.Container',
	alias: 'widget.sliderPage',
	title: '首页焦图',
	requires :[
		'SysApp.view.slider.Form',
		'SysApp.view.slider.Grid',
		'SysApp.view.slider.AddDialog',
		'SysApp.view.slider.EditDialog',
		'SysApp.view.slider.ViewDialog'
	],
	mixins: ['SysApp.view.Page'],

	initComponent: function(){
		var me = this;

		me.initialize();

		me.createItems( 'sliderForm', 'sliderGrid' );

		SysApp.sliderAddDialog = Ext.create('SysApp.view.slider.AddDialog',{
			listeners: {
				'success': function(){
					this.grid.onRefresh();
				},
				scope: me
			}
		});

		SysApp.sliderEditDialog = Ext.create('SysApp.view.slider.EditDialog',{
			listeners: {
				'success': function(){
					this.grid.onRefresh();
				},
				scope: me
			}
		});

		SysApp.sliderViewDialog = Ext.create('SysApp.view.slider.ViewDialog');

		me.callParent();

		me.initControls();

		me.on('destroy', function(){
			me.formPanel.destroy();
			me.grid.destroy();
			SysApp.sliderAddDialog.destroy();
			SysApp.sliderEditDialog.destroy();
			SysApp.sliderViewDialog.destroy();
		});
	}
});