Ext.define('SysApp.view.slider.Grid', {
	extend : 'Ext.grid.Panel',
	alias: 'widget.sliderGrid',
	requires: [
		'SysApp.model.Slider'
	],

	mixins: ['SysApp.view.Grid'],

  changeStateUrl: '/',

  deleteUrl:'/',

	initComponent: function(){
		var me = this;
		
		me.initialize();

		me.modelName = 'SysApp.model.Slider';

		me.createStore();	
		
		me.createColumns();

		me.tbar = [{
      iconCls: 'icon-add',
      text: '添加推荐',
      handler: me.onAddRecord,
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

	onAddRecord: function(){
		SysApp.sliderAddDialog.show();
	},

	createColumns : function(){
		var me = this;

		me.columns = [
		{
			xtype: 'rownumberer', 
			text: '序号', 
			width: 60 
		}, {
			text: '焦图图片',
			width: 150,
			sortable: false,
			menuDisabled : true,
			dataIndex: 'image',
			renderer: function(v){
				return '<a href="'+v+'" title="查看原图" target="_blank"><img src="'+v+'" style="max-width:120px;max-height:120px;"></a>';
			}
    }, {
			text: '中文标题',
			width: 250,
			sortable: false,
			menuDisabled : true,
			dataIndex: 'cn'
    }, {
      text: '英语标题',
      width: 250,
      sortable: false,
      menuDisabled : true,
      dataIndex: 'en'
    }, {
      text: '链接地址',
      width: 250,
      sortable: false,
      menuDisabled : true,
      dataIndex: 'url',
      renderer: function(v){
        return '<a href="'+v+'" target="_blank">'+v+'</a>';
      }
    }, {
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
    	xtype: 'actioncolumn',
			text: '操作',
      minWidth: 200,
			sortable: false,
			menuDisabled : true,
			flex: 1,
      scope: me,
      items: [{
      	getClass: function(v, meta, rec) { 
      		return 'icon-view';
        },
				tooltip: '查看',
        handler: function(view, rowIndex, colIndex) {
          var rec = view.getStore().getAt(rowIndex);

			   	SysApp.sliderViewDialog.setRecord(rec);
          SysApp.sliderViewDialog.show();
        }
      },{
      	getClass: function(v, meta, rec) { 
      		return 'icon-edit';
        },
				tooltip: '修改',
        handler: function(view, rowIndex, colIndex) {
          var rec = view.getStore().getAt(rowIndex);

          SysApp.sliderEditDialog.setRecord(rec);
          SysApp.sliderEditDialog.show();
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

          this.onChangeState(id, 'status', 1);
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

          this.onChangeState(id, 'status', -1);
        }
      },{
        getClass: function(v, meta, rec) { 
          return 'icon-clear';
        },
        tooltip: '删除',
        handler: function(view, rowIndex, colIndex) {
          var rec = view.getStore().getAt(rowIndex);
          var id = (rec.get('id'));

          me.onDelete(id);
        }
      }]
    }];
    
  }
});
