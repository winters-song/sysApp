Ext.define('SysApp.view.Grid', {

	initialize: function(){
		var me = this;

		Ext.apply(me, {
			height: 550,
			frame: false,
			viewConfig: {
		    stripeRows: true,
		    enableTextSelection: true
		  },
		  style: 'border-top:5px solid #ccc'
		});
		
	},

  // selType: 'checkboxmodel',
	onRefresh: function(){
		this.store.reload();
	},

	onExportPage: function(btn){
		var me = this;
		var limit = me.store.pageSize
		var start = (me.store.currentPage - 1) * limit;

		var extra = me.store.getProxy().extraParams;
		var cfg = Ext.apply({}, extra, {
			start: start,
			limit: limit
		});
		var param = Ext.Object.toQueryString(cfg);
		
		window.location = me.exportUrl + '/1?' + param;
	},

	onExportAll: function(btn){
		var me = this;
		window.location = me.exportUrl + '/all';
	},

	createStore: function(){
		var me = this;

		if(!me.modelName) return;

		me.store = Ext.create('Ext.data.Store', {
			model: me.modelName,
			pageSize: 20,
			remoteSort: true,
			autoDestroy: true,
			autoLoad: true
		});
	},

	initPaging: function(){
		var me = this;

		var pageStore = Ext.create('Ext.data.Store', {
      autoDestroy: true,
      fields: ['id'],
      data : SysApp.Common.pageSizes
    });

		me.getDockedItems('toolbar[dock="bottom"]')[0].insert(0, [ "每页显示：", {
      xtype: 'combo',
      forceSelection: true,
      store: pageStore,
      queryMode: 'local',
      displayField: 'id',
      valueField: 'id',
      selectOnFocus: true,
      value: 20,
      width : 70,    
      listeners: {            
        change: function(maxRows, newValue, oldValue){
          if(maxRows != null){
          	var store = me.getStore();
          	store.pageSize = newValue;
          	store.loadPage(1);
        	}
        }
      }
    }, "条", '-']);    
	},

	onChangeState: function(id, type, val, opt){
  	var me = this;

  	var cfg = Ext.apply({
  		id : id
  	}, opt);
  	
  	cfg[type] = val;

  	Ext.Ajax.request({
      url: me.changeStateUrl,
      params: cfg,
      method: 'post',
      scope: me,
      success: function(response){
    		var json = Ext.decode(response.responseText, { safe: true});
    		if(json && json.success){
    			SysApp.Common.showToast('操作成功！');
    			this.onRefresh();
    		}else{
    			SysApp.Common.error('操作失败！');
    		}
      },
      failure: function(){
      	SysApp.Common.error('操作失败！');
      }
    });
  	
  },

  onChangeStatus: function(url, field, rec, params){
  	var me = this;

  	Ext.Ajax.request({
      url: url,
      params: params,
      method: 'post',
      scope: me,
      success: function(response){
    		var json = Ext.decode(response.responseText, { safe: true});
    		if(json && json.success){
    			SysApp.Common.showToast('操作成功！');
          this.onRefresh();
    			// rec.set(field, params[field], {
    			// 	dirty: false
    			// });
    		}else{
    			SysApp.Common.error('操作失败！');
    		}
      },
      failure: function(){
      	SysApp.Common.error('操作失败！');
      }
    });
  	
  },

  onDelete: function(id){
  	var me = this;

		Ext.Msg.confirm("确认", '确定要删除该数据吗？', function(btn, text){
      if (btn == 'yes'){
      	var cfg = {
      		id : id
      	}

      	Ext.Ajax.request({
		      url: me.deleteUrl,
		      params: cfg,
		      method: 'get',
		      scope: me,
		      success: function(response){
		    		var json = Ext.decode(response.responseText, { safe: true});
		    		if(json && json.success){
		    			SysApp.Common.showToast('删除成功！');
		    			this.onRefresh();
		    		}else{
		    			Ext.Msg.alert('提示', "删除失败！");
		    		}
		      },
		      failure: function(){
		      	Ext.Msg.alert('提示', "删除失败！");
		      }
		    });
		    
      }
		});
  }

});
