Ext.define('SysApp.view.courseware.Grid', {
	extend : 'Ext.grid.Panel',
	alias: 'widget.coursewareGrid',
	requires: [
		'SysApp.model.Courseware'
	],

	mixins: ['SysApp.view.Grid'],

	exportUrl: '/',

	changeStateUrl: '/',

	initComponent: function(){
		var me = this;

		me.initialize();

		me.modelName = 'SysApp.model.Courseware';

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
			width:60 
		}, {
			text: '课件名称',
			width: 250,
			sortable: false,
			menuDisabled : true,
			dataIndex: 'name',
			renderer: function(v, m, r){
				var id = r.get('id');
				var url = '/Public/preview.html?id=' + id;
				return '<a href="'+url+'" target="_blank">'+ v+ '</a>';
			}
    }, {
			text: '文件扩展名',
			width: 90,
			sortable: false,
			menuDisabled : true,
			dataIndex: 'ext'
    }, {
			text: '上传时间',
			width: 200,
			sortable: false,
			menuDisabled : true,
			dataIndex: 'uploadtime',
			xtype: 'datecolumn',   
			format:'Y-m-d H:i'
    },{
			text: '审核状态',
			width: 80,
			sortable: false,
			menuDisabled : true,
			dataIndex: 'status',
			renderer: function(v){
				if(v == '2'){
					return '<span class="red">不通过</span>';
				}else if (v == '1'){
					return '<span class="green">通过</span>';
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
      		var status = rec.get('status');
          return status != 1 ? 'icon-yes' : 'sy-hide';
        },
				tooltip: '审核通过',
        handler: function(view, rowIndex, colIndex) {
          var rec = view.getStore().getAt(rowIndex);
          var id  = rec.get('id');
			   	me.onChangeState(id, 'status', 1);
        }
      },{
        getClass: function(v, meta, rec) { 
        	var status = rec.get('status');
          return status == 1 ? 'icon-delete' : 'sy-hide';
        },
				tooltip: '审核不通过',
        handler: function(view, rowIndex, colIndex) {
          var rec = view.getStore().getAt(rowIndex);
          var id  = rec.get('id');
			   	me.onChangeState(id, 'status', 2);
        }
      }]
    }];
  }
  
});
