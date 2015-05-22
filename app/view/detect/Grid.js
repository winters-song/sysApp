Ext.define('SysApp.view.detect.Grid', {
	extend : 'Ext.grid.Panel',
	alias: 'widget.detectGrid',
	requires: [
		'SysApp.model.Detect'
	],
	mixins: ['SysApp.view.Grid'],

	changeStateUrl: '/',

	initComponent: function(){
		var me = this;

		me.initialize();

		me.modelName = 'SysApp.model.Detect';
		
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
		},{
			text: '诊断号',
			width: 80,
			sortable: false,
			menuDisabled : true,
			dataIndex: 'id'
    },{
			text: 'Uid',
			width: 80,
			sortable: false,
			menuDisabled : true,
			dataIndex: 'uid'
    },{
			text: '邮箱',
			width: 250,
			sortable: false,
			menuDisabled : true,
			dataIndex: '_email'
    },{
			text: '审核状态',
			width: 80,
			sortable: false,
			menuDisabled : true,
			dataIndex: 'status',
			renderer: function(v){
				if(v == '1'){
					return '未完成';
				}else if (v == '2'){
					return '<span class="green">已完成</span>';
				}
				return '';
			}
    }, {
    	xtype: 'actioncolumn',
			text: '操作',
			minWidth: 200,
			sortable: false,
			menuDisabled : true,
			flex: 1,
      items: [{
      	getClass: function(v, meta, rec) { 
      		return 'icon-view';
        },
				tooltip: '查看',
        handler: function(view, rowIndex, colIndex) {
          var rec = view.getStore().getAt(rowIndex);
          
			   	SysApp.detectInfoDialog.show();
			   	SysApp.detectInfoDialog.setValue(rec);
			   	
        }
      },{
      	getClass: function(v, meta, rec) { 
      		var status = rec.get('status');
          return status != 2 ? 'icon-yes' : 'sy-hide';
        },
				tooltip: '处理',
        handler: function(view, rowIndex, colIndex) {
          var rec = view.getStore().getAt(rowIndex);
          var id = rec.get('id');

			   	me.onChangeState(id, 'status', 2);
        }
      },{
        getClass: function(v, meta, rec) { 
        	var status = rec.get('status');
          return status != 1 ? 'icon-delete' : 'sy-hide';
        },
				tooltip: '未处理',
        handler: function(view, rowIndex, colIndex) {
          var rec = view.getStore().getAt(rowIndex);
          var id = rec.get('id');

			   	me.onChangeState(id, 'status', 1);
        }
      }]
	  }];
  }

});
