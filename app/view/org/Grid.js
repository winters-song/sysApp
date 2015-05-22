Ext.define('SysApp.view.org.Grid', {
	extend : 'Ext.grid.Panel',
	alias: 'widget.orgGrid',
	requires: [
		'SysApp.model.Org'
	],

	mixins: ['SysApp.view.Grid'],

  exportUrl: '/',

  changeStateUrl: '/',

	initComponent: function(){
		var me = this;
		
		me.initialize();

		me.modelName = 'SysApp.model.Org';

		me.createStore();	
		
		me.createColumns();

		me.tbar = [{
      iconCls: 'icon-add',
      text: '注册机构',
      handler: me.onAddOrg,
      scope: me
    },{
      iconCls: 'icon-export',
      text: '导出当页数据',
      handler: me.onExportPage,
      scope: me
    },{
      iconCls: 'icon-export',
      text: '导出全部数据',
      handler: me.onExportAll,
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

	onAddOrg: function(){
		SysApp.orgAddDialog.show();
	},

	createColumns : function(){
		var me = this;

		me.columns = [
		{
			xtype: 'rownumberer', 
			text: '序号', 
			width: 60 
		}, {
			text: 'Logo',
			width: 150,
			sortable: false,
			menuDisabled : true,
			dataIndex: 'org_logo',
			renderer: function(v){
				return '<img src="'+v+'" style="max-width:120px;max-height:120px;">';
			}
    }, {
			text: '机构名称',
			width: 250,
			sortable: false,
			menuDisabled : true,
			dataIndex: 'name'
    }, {
      text: '课堂人数上限',
      width: 100,
      sortable: false,
      menuDisabled : true,
      dataIndex: 'org_size'
    },{
			text: '审核状态',
			width: 80,
			sortable: false,
			menuDisabled : true,
			dataIndex: 'status',
			renderer: function(v){
				if(v == '1'){
          return '待审核';
        }else if (v == '2'){
          return '<span class="green">通过</span>';
        }else if (v == '3'){
          return '<span class="red">不通过</span>';
        }
        return '';
			}
    }, {
      text: '显示状态',
      width: 80,
      sortable: false,
      menuDisabled : true,
      dataIndex: 'visible',
      renderer: function(v){
        if (v == '2'){
          return '<span class="green">显示</span>';
        }else if (v == '1'){
          return '<span class="red">隐藏</span>';
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
			   	var id = rec.get('id');

			   	SysApp.orgViewDialog.show();
			   	SysApp.orgViewDialog.request(id);
			   	
        }
      },{
      	getClass: function(v, meta, rec) { 
      		return 'icon-edit';
        },
				tooltip: '修改',
        handler: function(view, rowIndex, colIndex) {
          var rec = view.getStore().getAt(rowIndex);
			   	var id = rec.get('id');

			   	SysApp.orgEditDialog.show();
			   	SysApp.orgEditDialog.request(id);
			   	
        }
      },{
        getClass: function(v, meta, rec) { 
          return 'icon-user-suit';
        },
        tooltip: '导入教师',
        handler: function(view, rowIndex, colIndex) {
          var rec = view.getStore().getAt(rowIndex);
          var id = rec.get('id');

          SysApp.teacherImportDialog.show();
          SysApp.teacherImportDialog.setValue(id);
        }
      },{
        getClass: function(v, meta, rec) { 
          return 'icon-user-red';
        },
        tooltip: '导入学员',
        handler: function(view, rowIndex, colIndex) {
          var rec = view.getStore().getAt(rowIndex);
          var id = rec.get('id');

          SysApp.studentImportDialog.show();
          SysApp.studentImportDialog.setValue(id);
        }
      },{
        getClass: function(v, meta, rec) { 
          var status = rec.get('status');
          return status != 2 ? 'icon-yes' : 'sy-hide';
        },
        tooltip: '审核通过',
        handler: function(view, rowIndex, colIndex) {
          var rec = view.getStore().getAt(rowIndex);
          var id = rec.get('id');
          me.onChangeState(id, 'reg', 1);
        }
      },{
        getClass: function(v, meta, rec) { 
          var status = rec.get('status');
          return status != 3 ? 'icon-delete' : 'sy-hide';
        },
        tooltip: '审核不通过',
        handler: function(view, rowIndex, colIndex) {
          var rec = view.getStore().getAt(rowIndex);
          var id = rec.get('id');

          Ext.Msg.prompt('消息', '请说明不通过理由', function(button, text ){
            if(button == 'ok'){
              me.onChangeState(id, 'reg', -1, {
                'reason': text
              });
            }
          }, me, 4);
        }
      },{
        getClass: function(v, meta, rec) { 
          var status = rec.get('visible');
          return status != 2 ? 'icon-eye' : 'sy-hide';
        },
        tooltip: '显示',
        handler: function(view, rowIndex, colIndex) {
          var rec = view.getStore().getAt(rowIndex);
          var id = rec.get('id');
          me.onChangeState(id, 'visible', 1);
        }
      },{
        getClass: function(v, meta, rec) { 
          var status = rec.get('visible');
          return status != 1 ? 'icon-no' : 'sy-hide';
        },
        tooltip: '隐藏',
        handler: function(view, rowIndex, colIndex) {
          var rec = view.getStore().getAt(rowIndex);
          var id = rec.get('id');
          me.onChangeState(id, 'visible', -1);
        }
      }]
    }]
  }
  
});
