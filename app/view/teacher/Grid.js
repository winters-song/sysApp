Ext.define('SysApp.view.teacher.Grid', {
	extend : 'Ext.grid.Panel',
	alias: 'widget.teacherGrid',
	requires: [
		'SysApp.model.Teacher'
	],

	mixins: ['SysApp.view.Grid'],

	exportUrl: '/',

	changeStateUrl: '/',

	deleteUrl: '/',

	initComponent: function(){
		var me = this;

		me.initialize();

		me.modelName = 'SysApp.model.Teacher';
		
		me.createStore();	
		
		me.createColumns();

		me.tbar = [{
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

	createColumns : function(){
		var me = this;

		me.columns = [
		{
			xtype: 'rownumberer', 
			text: '序号', 
			width: 60
		}, {
			text: '头像',
			width: 60,
			sortable: false,
			menuDisabled : true,
			dataIndex: 'thumb',
			renderer: function(v){
				return '<img src="'+v+'">';
			}
    },  {
			text: '教师名',
			width: 150,
			sortable: false,
			menuDisabled : true,
			dataIndex: 'name'
    }, {
			text: '邮箱',
			width: 250,
			sortable: false,
			menuDisabled : true,
			dataIndex: 'pro_email'
    }, {
			text: '所属',
			width: 200,
			sortable: false,
			menuDisabled : true,
			renderer: function(v, m, rec){
				return rec.get('cio_name') || rec.get('org_name');
			}
    }, {
			text: '申请时间',
			width: 150,
			sortable: false,
			menuDisabled : true,
			dataIndex: 'reg_time',
			renderer: function(v){
				if(v != '0'){
					return Ext.Date.format(new Date(v*1000), 'Y-m-d H:i');
				}
			}
    }, {
			text: '审核状态',
			width: 80,
			sortable: false,
			menuDisabled : true,
			dataIndex: 'teacher_status',
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
    },{
			text: '推荐教师',
			width: 80,
			sortable: false,
			menuDisabled : true,
			dataIndex: 'teacher_recommend',
			renderer: function(v){
				if(v == '1'){
					return '已推荐';
				}
				return '';
			}
    },{
			text: '明星教师',
			width: 80,
			sortable: false,
			menuDisabled : true,
			dataIndex: 'teacher_star',
			renderer: function(v){
				if(v == '1'){
					return '已推荐';
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
			   	SysApp.teacherInfoDialog.show();
			   	SysApp.teacherInfoDialog.request(id);
			   	
        }
      },{
      	getClass: function(v, meta, rec) { 
      		return 'icon-edit';
        },
				tooltip: '修改',
        handler: function(view, rowIndex, colIndex) {
          var rec = view.getStore().getAt(rowIndex);
			   	var id = rec.get('id');
			   	SysApp.teacherEditDialog.show();
			   	SysApp.teacherEditDialog.request(id);
        }
      },{
      	getClass: function(v, meta, rec) { 
      		var status = rec.get('teacher_status');
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
        	var status = rec.get('teacher_status');
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
	      	var status = rec.get('teacher_recommend');
	      	var audit = rec.get('teacher_status');
	        return status != 1 && audit==2 ? 'icon-arrow-up' : 'sy-hide';
	      },
				tooltip: '推荐',
	      handler: function(view, rowIndex, colIndex) {
	        var rec = view.getStore().getAt(rowIndex);
	        var id = rec.get('id');

			   	me.onChangeState(id, 'recommend', 1);
	      }
	    },{
	      getClass: function(v, meta, rec) { 
	      	var status = rec.get('teacher_recommend');
	      	var audit = rec.get('teacher_status');
	        return status == 1 && audit==2 ? 'icon-no' : 'sy-hide';
	      },
				tooltip: '取消推荐',
	      handler: function(view, rowIndex, colIndex) {
	        var rec = view.getStore().getAt(rowIndex);
	        var id = rec.get('id');

			   	me.onChangeState(id, 'recommend', -1);
	      }
	    },{
	      getClass: function(v, meta, rec) { 
	      	var status = rec.get('teacher_star');
	      	var audit = rec.get('teacher_status');
	        return status != 1 && audit==2 ? 'icon-user-red' : 'sy-hide';
	      },
				tooltip: '设为明星教师',
	      handler: function(view, rowIndex, colIndex) {
	        var rec = view.getStore().getAt(rowIndex);
	        var id = rec.get('id');

			   	me.onChangeState(id, 'star', 1);
	      }
	    },{
	      getClass: function(v, meta, rec) { 
	      	var status = rec.get('teacher_star');
	      	var audit = rec.get('teacher_status');
	        return status == 1 && audit==2 ? 'icon-no' : 'sy-hide';
	      },
				tooltip: '取消明星教师',
	      handler: function(view, rowIndex, colIndex) {
	        var rec = view.getStore().getAt(rowIndex);
	        var id = rec.get('id');

			   	me.onChangeState(id, 'star', -1);
	      }
	    },{
	      getClass: function(v, meta, rec) { 
	        return 'icon-clear';
	      },
				tooltip: '删除',
	      handler: function(view, rowIndex, colIndex) {
          var rec = view.getStore().getAt(rowIndex);
			   	var id = rec.get('id');
			   	me.onDelete(id);
        }
	    }]
	  }];
  }

});
