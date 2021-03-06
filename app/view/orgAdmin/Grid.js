Ext.define('SysApp.view.orgAdmin.Grid', {
	extend : 'Ext.grid.Panel',
	alias: 'widget.orgAdminGrid',
	requires: [
		'SysApp.model.OrgAdmin'
	],

	mixins: ['SysApp.view.Grid'],

	deleteUrl: '/',

	initComponent: function(){
		var me = this;

		me.initialize();

		me.modelName = 'SysApp.model.OrgAdmin';

		me.createStore();	
		
		me.createColumns();

		me.tbar = [{
      iconCls: 'icon-add',
      text: '添加管理员',
      handler: me.onAddAdmin,
      scope: me
    },{
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

  onAddAdmin: function(){
    SysApp.orgAdminAddDialog.show();
  },

	createColumns : function(){
		var me = this;

		me.columns = [
		{
			xtype: 'rownumberer', 
			text: '序号', 
			width: 60 
		}, {
			text: '用户名',
			width: 200,
			sortable: false,
			menuDisabled : true,
			dataIndex: 'username'
    }, {
			text: '邮箱',
			width: 300,
			sortable: false,
			menuDisabled : true,
			dataIndex: 'email'
    }, {
			text: '所属机构',
			width: 200,
			sortable: false,
			menuDisabled : true,
			dataIndex: 'org_name'
    }, {
			text: '联系电话',
			width: 200,
			sortable: false,
			menuDisabled : true,
			dataIndex: 'mobile'
    }, {
    	xtype: 'actioncolumn',
			text: '操作',
      minWidth: 200,
			sortable: false,
			menuDisabled : true,
			flex: 1,
			scope: me,
      items: [{
      	getClass: function(v, meta, rec) { 
      		return 'icon-edit';
        },
				tooltip: '修改',
        handler: function(view, rowIndex, colIndex) {
          var rec = view.getStore().getAt(rowIndex);
			   	this.onEditAdmin(rec);
        }
      }, {
      	getClass: function(v, meta, rec) { 
      		return 'icon-delete';
        },
				tooltip: '删除',
        handler: function(view, rowIndex, colIndex) {
          var rec = view.getStore().getAt(rowIndex);
			   	var id = (rec.get('uid'));
			   	this.onDelete(id);
        }
      }]
    }];
  },

  onEditAdmin: function(rec){
  	SysApp.orgAdminEditDialog.show();
  	SysApp.orgAdminEditDialog.setValues(rec);
  }
  
});
