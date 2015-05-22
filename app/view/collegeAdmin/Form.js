Ext.define('SysApp.view.collegeAdmin.Form', {
	extend : 'Ext.form.Panel',
  alias: 'widget.collegeAdminForm',
  mixins: ['SysApp.view.Form'],
	initComponent: function(){
		var me = this;

    me.initialize();

    var provinceStore = Ext.create('Ext.data.Store', {
      data: SysApp.Common.Province.array,
      fields: ['id', 'name'],
      autoDestory: true,
      autoLoad: false
    });

    var collegeStore = Ext.create('Ext.data.Store', {
      model: 'SysApp.model.College',
      autoDestory: true,
      autoLoad: false,
      proxy: {
        url: '/University/university',
        type: 'ajax',
        simpleSortMode: true,
        reader: {
          type: 'json'
        }
      }
    });
    var proxy = collegeStore.getProxy();
    proxy.limitParam = null;

		me.items = [{
      xtype: 'fieldset',
      defaultType: 'textfield',
      layout: 'anchor',
      fieldDefaults: {
        labelAlign: 'right',
        labelWidth: 120
      },
      defaults: {
        width:350,
        listeners: {
          specialkey: me.specialKey,
          scope:me
        }
      },
      items: [{
        fieldLabel: '用户名',
        name: 'username'
      }]
    },{
      xtype: 'fieldset',
      defaultType: 'textfield',
      layout: 'anchor',
      fieldDefaults: {
        labelAlign: 'right',
        labelWidth: 120
      },
      defaults: {
        width:350,
        listeners: {
          specialkey: me.specialKey,
          scope:me
        }
      },
      items: [{
        fieldLabel: '所属高校省份',
        name: 'province',
        xtype: 'combo',
        store: provinceStore,
        displayField: 'name',
        valueField: 'id',
        forceSelection: true,
        typeAhead: true,
        queryMode: 'local',
        listeners: {
          change: function(thiz, val){
            if(val){
              collegeStore.getProxy().extraParams = { id: val};
              collegeStore.load();
            }
          },
          scope: me
        }
      },{
        fieldLabel: '所属高校',
        name: 'university',
        xtype: 'combo',
        store: collegeStore,
        displayField: 'name',
        valueField: 'id',
        queryMode: 'local',
        forceSelection: true,
        typeAhead: true,
        listeners: {
          change: function(thiz, val){
            this.doSearch();
          },
          scope: me
        }
      }]
    }];
		
		me.buttons = [{
      text: '查询',
      iconCls: 'icon-search',
      handler: me.doSearch,
      scale: 'medium',
      scope: me,
      margins: '0 20 0 0'
    }, {
      text: '清空条件',
      scale: 'medium',
      handler: function() {
        me.getForm().reset();
        me.doSearch();
      }
    }];
		
		me.callParent();
	}

});
