Ext.define('SysApp.view.detect.Form', {
	extend : 'Ext.form.Panel',
  alias: 'widget.detectForm',
  mixins: ['SysApp.view.Form'],
	initComponent: function(){
		var me = this;

		me.initialize();

    var stateStore = Ext.create('Ext.data.Store', {
      fields: ['key', 'name'],
      data: [{
        key: '1',
        name: '未处理'
      },{
        key: '2',
        name: '完成'
      }],
      autoDestroy: true,
      autoLoad: true
    });

		me.items = [{
      xtype: 'fieldset',
    // flex: 1,
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
        fieldLabel: '诊断号',
        name: 'id'
      },{
        fieldLabel: '邮箱',
        name: '_email'
      }]
    },{
      xtype: 'fieldset',
    // flex: 1,
      defaultType: 'textfield',
      layout: 'anchor',
      fieldDefaults: {
        labelAlign: 'right',
        labelWidth: 120,
        msgTarget: 'qtip'
      },
      defaults: {
        width:350,
        listeners: {
          specialkey: me.specialKey,
          scope:me
        }
      },
      items: [{
        fieldLabel: '状态',
        xtype: 'combo',
        name: 'status',
        store: stateStore,
        forceSelection: true,
        displayField: 'name',
        valueField: 'key',
        listeners: {
          scope: me,
          change: function(){
            this.doSearch();
          }
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
      // iconCls: 'icon-clear',
      scale: 'medium',
      handler: function() {
        me.getForm().reset();
        me.doSearch();
      }
    }];
		
		me.callParent();
	}

});
