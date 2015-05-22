Ext.define('SysApp.view.classes.Grid', {
	extend : 'Ext.grid.Panel',
	alias: 'widget.classGrid',
	requires: [
		'SysApp.model.Classes'
	],

	mixins: ['SysApp.view.Grid'],

	exportUrl: '/',

	deleteUrl: '/',

	changeStateUrl: '/',

	initComponent: function(){
		var me = this;

		me.initialize();

		me.modelName = 'SysApp.model.Classes';

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
			text: '课堂名称',
			width: 250,
			sortable: false,
			menuDisabled : true,
			dataIndex: 'name',
			renderer: function(v, m, r){
				var id = r.get('clid');
				var url, editUrl;

				var is_taped = r.get('is_taped') == '1';
				if(is_taped){
					url = '/Public/tapedInfo.html?id=' + id;
					editUrl = '/Public/editTaped.html?admin=1&id=' + id;
				} else {
					url = '/Public/classInfo.html?id=' + id;
					editUrl = '/Public/editClass.html?admin=1&id=' + id;
				}
				return  '<a href="'+url+'" target="_blank">'+ v+ '</a><a href="#" target="_blank" id="enter_'+id+'"></a><a href="'+editUrl+'" target="_blank" id="edit_class_'+id+'"></a>';
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
			text: '开课时间',
			width: 180,
			sortable: true,
			menuDisabled : true,
			dataIndex: 'starttime',
			xtype: 'datecolumn',   
			format:'Y-m-d H:i',
			renderer: function(v, m, r){
				var is_taped = r.get('is_taped') == '1';
				if(is_taped){
					return '';
				} 
				return v;
			}
    }, {
			text: '创建时间',
			width: 180,
			sortable: true,
			menuDisabled : true,
			dataIndex: 'time',
			xtype: 'datecolumn',   
			format:'Y-m-d H:i'
    },{
			text: '审核状态',
			width: 200,
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
			text: '回放状态',
			width: 100,
			sortable: false,
			menuDisabled : true,
			dataIndex: 'is_replay',
			renderer: function(v, meta, rec){

				var has_replay = rec.get('has_replay');

				if(has_replay){
					if(v == '1'){
						return '<span class="green">开启</span>';
					}else if(v == '2'){
						return '教师关闭';
					}else if(v == '3'){
						return '<span class="red">管理员关闭</span>';
					}
				}else{
					return '<span class="grey">无回放</span>';
				}
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
      		var status = rec.get('viewable');
          return status? 'icon-view' : 'sy-hide';
        },
				tooltip: '进入课堂',
        handler: function(view, rowIndex, colIndex) {
          var rec = view.getStore().getAt(rowIndex);
          var id  = rec.get('clid');
          var has_replay = rec.get('has_replay');

          if(has_replay){

          	var rid = rec.get('rid');

          	Ext.Ajax.request({
				      url: '/Course/Index/get_records',
				      params: {
				      	rid: rid
				      },
				      method: 'get',
				      scope: me,
				      success: function(response){
				    		var json = Ext.decode(response.responseText, { safe: true});
				    		if(json && json.replayUrl){
				    			var dom = Ext.get('enter_'+id).dom;
				    			dom.href = json.replayUrl+ '/locale/zh-CN';
				    			dom.click();
				    		}else{
				    			SysApp.Common.error('无法回放！');
				    		}
				      }
				    });

          }else{

          	Ext.Ajax.request({
				      url: '/Course/Admin/into_class',
				      params: {
				      	id: id
				      },
				      method: 'get',
				      scope: me,
				      success: function(response){
				    		var json = Ext.decode(response.responseText, { safe: true});
				    		if(json && json.accessUrl){
				    			var dom = Ext.get('enter_'+id).dom;
				    			dom.href = json.accessUrl+ '/locale/cn';
				    			dom.click();
				    		}
				      }
				    });
          }
			   	
        }
      },{
      	getClass: function(v, meta, rec) { 
      		var status = rec.get('status');
          return status != 1 ? 'icon-yes' : 'sy-hide';
        },
				tooltip: '审核通过',
        handler: function(view, rowIndex, colIndex) {
          var rec = view.getStore().getAt(rowIndex);
          var id  = rec.get('clid');
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
          var id  = rec.get('clid');

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
				tooltip: '修改',
        handler: function(view, rowIndex, colIndex) {
          var rec = view.getStore().getAt(rowIndex);
          var id  = rec.get('clid');

          var dom = Ext.get('edit_class_'+id).dom;
    			dom.click();
        }
      },{
      	getClass: function(v, meta, rec) { 
      		var has_replay = rec.get('has_replay');
          return has_replay ? 'icon-refresh' : 'sy-hide';
        },
				tooltip: '切换回放状态',
        handler: function(view, rowIndex, colIndex) {
          var rec = view.getStore().getAt(rowIndex);
          var id  = rec.get('clid');
          var state  = rec.get('is_replay');
          var enabled = state == '1'? 3 : 1;

          var cfg = {
		      	id: id,
		      	enabled : enabled
		      };

		      me.changeReplayState(cfg, rec);

          // if(enabled == 1){
	         //  me.changeReplayState(cfg);
          // }else{
          // 	Ext.Msg.prompt('消息', '请说明不通过理由', function(button, text ){
          // 		if(button == 'ok'){
          // 			cfg.reason = text;
			       //    me.changeReplayState(cfg);
          // 		}
          // 	}, me, 4);
          // }
        }
      },{
        getClass: function(v, meta, rec) { 
          return 'icon-clear';
        },
				tooltip: '删除',
        handler: function(view, rowIndex, colIndex) {
          var rec = view.getStore().getAt(rowIndex);
			   	var id = rec.get('clid');
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
