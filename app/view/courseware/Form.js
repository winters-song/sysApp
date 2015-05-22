Ext.define('SysApp.view.courseware.Form', {
	extend : 'Ext.form.Panel',
  alias: 'widget.coursewareForm',
  mixins: ['SysApp.view.Form'],
	initComponent: function(){
		var me = this;

    me.initialize();
		
    var regStore = Ext.create('Ext.data.Store', {
      fields: ['key', 'name'],
      data: [{
        key: '',
        name: '不限'
      },{
        key: '2',
        name: '不通过'
      },{
        key: '1',
        name: '通过'
      }],
      autoDestroy: true,
      autoLoad: true
    });

    var typeStore = Ext.create('Ext.data.Store', {
      fields: ['key', 'name'],
      data: [{
        key: '',
        name: '全部'
      },{
        key: 'document',
        name: '文档'
      },{
        key: 'video',
        name: '视频'
      },{
        key: 'audio',
        name: '音频'
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
        labelWidth: 120,
        msgTarget: 'qtip'
      },
      defaults: {
        width:350,
        listeners: {
          specialkey: me.specialKey,
          scope: me
        }
      },
      items: [{
        fieldLabel: '课件名称',
        name: 'display_name'
      },{
        fieldLabel: '类型',
        xtype: 'combo',
        name: 'type',
        store: typeStore,
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
        fieldLabel: '审核状态',
        xtype: 'combo',
        name: 'status',
        store: regStore,
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
      scale: 'medium',
      handler: function() {
        me.getForm().reset();
        me.doSearch();
      }
    }];
		
		me.callParent();
	}

});
