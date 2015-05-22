Ext.define('SysApp.view.series.Grid', {
	extend : 'Ext.grid.Panel',
	alias: 'widget.seriesGrid',
	requires: [
		'SysApp.model.Series'
	],

	mixins: ['SysApp.view.Grid'],

	deleteUrl: '/',

	changeStateUrl: '/',

	recommendUrl: '/',

	initComponent: function(){
		var me = this;

		me.initialize();

		me.modelName = 'SysApp.model.Series';

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
			text: '',
			width: 120,
			sortable: false,
			menuDisabled : true,
			dataIndex: 'thumb',
			renderer: function(v, m, r){
				var url = v || '/Public/img/series-default.jpg';
				return '<img src="'+ url +'" style="width:100px;">';
			}
    }, {
			text: '系列课名称',
			width: 250,
			sortable: false,
			menuDisabled : true,
			dataIndex: 'title',
			renderer: function(v, m, r){
				var id = r.get('sid');

				var url = '/Public/seriesInfo.html?admin=1&id=' + id;
				var editUrl = '/Public/editSeries.html?admin=1&id=' + id;
				return '<a href="'+url+'" target="_blank">'+ v+ '</a><a href="' +editUrl+ '" target="_blank" id="edit_series_'+id+'"></a>';
			}
    }, {
			text: '教师头像',
			width: 80,
			sortable: false,
			menuDisabled : true,
			dataIndex: 'lecturer_avatar',
			renderer: function(v){
				return '<img src="'+v+'" style="width:40px;">';
			}
    }, {
			text: '教师名',
			width: 200,
			sortable: false,
			menuDisabled : true,
			dataIndex: 'lecturer_realname',
			renderer: function(v, m, r){
				if(v){
					return v;
				}else{
					return r.get('lecturer_name');
				}
			}
    }, {
			text: '创建时间',
			width: 200,
			sortable: true,
			menuDisabled : true,
			dataIndex: 'time',
			xtype: 'datecolumn',   
			format:'Y-m-d H:i'
    },{
			text: '审核状态',
			width: 80,
			sortable: false,
			menuDisabled : true,
			dataIndex: 'status',
			renderer: function(v, meta, rec){
				if(v == '2'){
					return '<span class="red">不通过</span> : ' + rec.get('reason');
				}else if (v == '1'){
					return '<span class="green">通过</span>';
				}
				return '';
			}
    },{
			text: '推荐',
			width: 80,
			sortable: false,
			menuDisabled : true,
			dataIndex: 'recommend',
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
      		var status = rec.get('status');
          return status != 1 ? 'icon-yes' : 'sy-hide';
        },
				tooltip: '审核通过',
        handler: function(view, rowIndex, colIndex) {
          var rec = view.getStore().getAt(rowIndex);
          var id  = rec.get('sid');
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
          var id  = rec.get('sid');

          Ext.Msg.prompt('消息', '请说明不通过理由', function(button, text ){
			   		if(button == 'ok'){
			   			me.onChangeState(id, 'status', 2, {
			   				'reason': text
			   			});
			   		}
			   	}, me, 4);
        }
      },{
      	getClass: function(v, meta, rec) { 
          return 'icon-edit';
        },
				tooltip: '修改系列课',
        handler: function(view, rowIndex, colIndex) {
          var rec = view.getStore().getAt(rowIndex);
          var id  = rec.get('sid');
          var dom = Ext.get('edit_series_'+id).dom;
    			dom.click();
        }
      },{
	      getClass: function(v, meta, rec) { 
	      	var status = rec.get('recommend');
	        return status != 1 ? 'icon-arrow-up' : 'sy-hide';
	      },
				tooltip: '推荐',
	      handler: function(view, rowIndex, colIndex) {
	        var rec = view.getStore().getAt(rowIndex);
	        var sid = rec.get('sid');

			   	me.onChangeStatus(me.recommendUrl, 'recommend', rec, {
			   		sid : sid,
			   		recommend: 1
			   	});
	      }
	    },{
	      getClass: function(v, meta, rec) { 
	      	var status = rec.get('recommend');
	        return status == 1 ? 'icon-no' : 'sy-hide';
	      },
				tooltip: '取消推荐',
	      handler: function(view, rowIndex, colIndex) {
	        var rec = view.getStore().getAt(rowIndex);
	        var sid = rec.get('sid');

			   	me.onChangeStatus(me.recommendUrl, 'recommend', rec, {
			   		sid : sid,
			   		recommend: 0
			   	});
	      }
	    },{
        getClass: function(v, meta, rec) { 
          return 'icon-clear';
        },
				tooltip: '删除',
        handler: function(view, rowIndex, colIndex) {
          var rec = view.getStore().getAt(rowIndex);
			   	var id = rec.get('sid');
			   	me.onDelete(id);
        }
      }]
    }];
  },

  changeReplayState: function(cfg, rec){
  	var me = this;

		Ext.Ajax.request({
	   	url: '/Course/Admin/edit_replay_status',
	   	params: cfg,
	   	method: 'post',
	   	scope: me,
	   	success: function(response){
  	 		var json = Ext.decode(response.responseText, { safe: true});
  	 		if(json && json.success){
  	 			SysApp.Common.showToast('操作成功！');

  	 			rec.set('is_replay', cfg.enabled, {
    				dirty : false
    			});
  	 			// me.onRefresh();
  	 		}else{
  	 			SysApp.Common.error('操作失败！');
  	 		}
	   	},
	   	failure: function(){
	   		SysApp.Common.error('操作失败！');
	   	}	
	 	});
  }
  
});
