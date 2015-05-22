Ext.define('SysApp.view.category.Grid', {
	extend : 'Ext.grid.Panel',
	alias: 'widget.categoryGrid',
	requires: [
		'SysApp.model.Category'
	],

	mixins: ['SysApp.view.Grid'],

	features: [{
    id: 'group',
    ftype: 'groupingsummary',
    groupHeaderTpl:  Ext.create('Ext.XTemplate',
	    '{name:this.formatName}',
	    {
        formatName: function(v) {
        	if(v == 'language'){
						return '授课语言';
					}else if (v == 'category'){
						return '内容分类';
					}else if (v == 'target'){
						return '适用人群';
					}else if (v == 'level'){
						return '难度级别';
					}else if (v == 'learning'){
						return '课程形式';
					}else if (v == 'teaching'){
						return '教学目的 ';
					}else if (v == 'content'){
						return '内容属性';
					}
					return '';
        }
	    }
		),
    hideGroupedHeader: true,
    enableGroupingMenu: false
  }],

	changeStateUrl: '/Course/Admin/push_status',

	initComponent: function(){
		var me = this;

		me.initialize();

		me.modelName = 'SysApp.model.Category';

		me.store = Ext.create('Ext.data.Store', {
			model: me.modelName,
			pageSize: 20,
			remoteSort: true,
			autoDestroy: true,
			autoLoad: true,
			groupField: 'c_name'
		});

		var proxy = me.store.getProxy();
    proxy.limitParam = null;
		
		me.createColumns();

		me.tbar = [{
      iconCls: 'icon-refresh',
      text: '刷新',
      handler: me.onRefresh,
      scope: me
    }];
		
		me.callParent();
		me.on('refresh', this.onRefresh, this);

	},

	createColumns : function(){
		var me = this;

		me.columns = [
		{
			xtype: 'rownumberer', 
			text: '序号', 
			width:60 
		}, {
			text: '类别',
			width: 200,
			sortable: false,
			menuDisabled : true,
			dataIndex: 'title'
    }, {
			text: '推荐状态',
			width: 100,
			sortable: false,
			menuDisabled : true,
			dataIndex: 'status',
			renderer: function(v){
				if(v == '1'){
					return '<span class="green">推荐</span>';
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
				tooltip: '推荐',
        handler: function(view, rowIndex, colIndex, btn, e, rec) {
          var id  = rec.get('puid');
			   	me.onChangeState(id, 'status', 1);
        }
      },{
        getClass: function(v, meta, rec) { 
        	var status = rec.get('status');
          return status == 1 ? 'icon-delete' : 'sy-hide';
        },
				tooltip: '取消推荐',
        handler: function(view, rowIndex, colIndex, btn, e, rec) {
          var id  = rec.get('puid');
			   	me.onChangeState(id, 'status', 0);
        }
      }]
    }];
  }
  
});
