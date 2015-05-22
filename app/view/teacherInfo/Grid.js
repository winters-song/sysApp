Ext.define('SysApp.view.teacherInfo.Grid', {
	extend : 'Ext.grid.Panel',
	alias: 'widget.teacherInfoGrid',
	requires: [
		'SysApp.model.TeacherInfo'
	],

	mixins: ['SysApp.view.Grid'],

	plugins: [{
    ptype: 'rowexpander',
    rowBodyTpl : new Ext.XTemplate(
      '<p><b>教师简介:</b><br> {description}</p>'
    )
  }],

	changeStateUrl: '/',

	initComponent: function(){
		var me = this;

		me.initialize();

		me.modelName = 'SysApp.model.TeacherInfo';
		
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

		function renderer(v){
			if(v == '1'){
				return '待审核';
			}else if (v == '2'){
				return '<span class="green">通过</span>';
			}else if (v == '3'){
				return '<span class="red">不通过</span>';
			}
			return '';
		}

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
			text: '描述状态',
			width: 100,
			sortable: false,
			menuDisabled : true,
			dataIndex: 'description_status',
			renderer: renderer
    }, {
    	xtype: 'actioncolumn',
			text: '描述审核',
			width: 100,
			sortable: false,
			menuDisabled : true,
      items: [{
      	getClass: function(v, meta, rec) { 
      		var status = rec.get('description_status');
          return status != 2 ? 'icon-yes' : 'sy-hide';
        },
				tooltip: '审核通过',
        handler: function(view, rowIndex, colIndex) {
          var rec = view.getStore().getAt(rowIndex);
          var id = rec.get('id');

			   	me.onChangeState(id, 'description_status', 1);
        }
      },{
        getClass: function(v, meta, rec) { 
        	var status = rec.get('description_status');
          return status != 3 ? 'icon-delete' : 'sy-hide';
        },
				tooltip: '审核不通过',
        handler: function(view, rowIndex, colIndex) {
          var rec = view.getStore().getAt(rowIndex);
          var id = rec.get('id');
			   	Ext.Msg.prompt('消息', '请说明不通过理由', function(button, text ){
			   		if(button == 'ok'){
			   			me.onChangeState(id, 'description_status', -1, {
			   				'reason': text
			   			});
			   		}
			   	}, me, 4);
        }
      }]
	  }/*,{
			text: '视频简介状态',
			width: 100,
			sortable: false,
			menuDisabled : true,
			dataIndex: 'video_status',
			renderer: renderer
    }, {
    	xtype: 'actioncolumn',
			text: '视频简介审核',
			width: 100,
			sortable: false,
			menuDisabled : true,
      items: [{
      	getClass: function(v, meta, rec) { 
      		var status = rec.get('video_status');
          return status != 2 ? 'icon-yes' : 'sy-hide';
        },
				tooltip: '审核通过',
        handler: function(view, rowIndex, colIndex) {
          var rec = view.getStore().getAt(rowIndex);
          var id = rec.get('id');

			   	me.onChangeState(id, 'video_status', 1);
        }
      },{
        getClass: function(v, meta, rec) { 
        	var status = rec.get('video_status');
          return status != 3 ? 'icon-delete' : 'sy-hide';
        },
				tooltip: '审核不通过',
        handler: function(view, rowIndex, colIndex) {
          var rec = view.getStore().getAt(rowIndex);
          var id = rec.get('id');
			   	Ext.Msg.prompt('消息', '请说明不通过理由', function(button, text ){
			   		if(button == 'ok'){
			   			me.onChangeState(id, 'video_status', -1, {
			   				'reason': text
			   			});
			   		}
			   	}, me, 4);
        }
      }]
	  },{
			text: '示范课状态',
			width: 100,
			sortable: false,
			menuDisabled : true,
			dataIndex: 'class_status',
			renderer: renderer
    }, {
    	xtype: 'actioncolumn',
			text: '示范课审核',
			width: 100,
			sortable: false,
			menuDisabled : true,
      items: [{
      	getClass: function(v, meta, rec) { 
      		var status = rec.get('class_status');
          return status != 2 ? 'icon-yes' : 'sy-hide';
        },
				tooltip: '审核通过',
        handler: function(view, rowIndex, colIndex) {
          var rec = view.getStore().getAt(rowIndex);
          var id = rec.get('id');

			   	me.onChangeState(id, 'class_status', 1);
        }
      },{
        getClass: function(v, meta, rec) { 
        	var status = rec.get('class_status');
          return status != 3 ? 'icon-delete' : 'sy-hide';
        },
				tooltip: '审核不通过',
        handler: function(view, rowIndex, colIndex) {
          var rec = view.getStore().getAt(rowIndex);
          var id = rec.get('id');
			   	Ext.Msg.prompt('消息', '请说明不通过理由', function(button, text ){
			   		if(button == 'ok'){
			   			me.onChangeState(id, 'class_status', -1, {
			   				'reason': text
			   			});
			   		}
			   	}, me, 4);
        }
      }]
	  }*/];
  }

});
