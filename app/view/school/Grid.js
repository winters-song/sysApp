Ext.define('SysApp.view.school.Grid', {
	extend : 'Ext.grid.Panel',
	alias: 'widget.schoolGrid',
	requires: [
		'SysApp.model.Cio'
	],

	mixins: ['SysApp.view.Grid'],

	initComponent: function(){
		var me = this;
		
		me.initialize();

		me.modelName = 'SysApp.model.Cio';

		me.createStore();	
		
		me.createColumns();

		me.tbar = [{
      iconCls: 'icon-refresh',
      text: '刷新',
      handler: me.onRefresh,
      scope: me
    }];
        
    me.bbar = Ext.create('Ext.PagingToolbar', {
      store: me.store,
      displayInfo: true
    });
		
		me.callParent();
		me.on('refresh', this.onRefresh, this);
		me.on('afterrender', this.initPaging, this);

	},

	createColumns : function(){
		var me = this;

		me.columns = [
		{
			xtype: 'rownumberer', 
			text: '序号', 
			width: 60 
		}, {
			text: '孔院名称',
			width: 250,
			sortable: false,
			menuDisabled : true,
			dataIndex: 'name'
    }, {
    	xtype: 'actioncolumn',
			text: '操作',
      minWidth: 200,
			sortable: false,
			menuDisabled : true,
			flex: 1,
      items: [{
        getClass: function(v, meta, rec) { 
          return 'icon-user-red';
        },
        tooltip: '导入教师',
        handler: function(view, rowIndex, colIndex) {
          var rec = view.getStore().getAt(rowIndex);
          var id = rec.get('id');

          SysApp.cioStudentImportDialog.show();
          SysApp.cioStudentImportDialog.setValue(id);
        }
      }]
    }]
  }
  
});
