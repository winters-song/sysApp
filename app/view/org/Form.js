Ext.define('SysApp.view.org.Form', {
	extend : 'Ext.form.Panel',
  alias: 'widget.orgForm',
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
        key: '1',
        name: '待审核'
      },{
        key: '2',
        name: '通过'
      },{
        key: '3',
        name: '不通过'
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
          scope:me
        }
      },
      items: [{
        fieldLabel: '机构名称',
        name: 'name'
      },{
        xtype      : 'radiogroup',
        fieldLabel : '所属',
        columns: 3,
        items: [
          { boxLabel: '全部', name: 'belongs', inputValue: '', checked: true },
          { boxLabel: '机构', name: 'belongs', inputValue: '1'},
          { boxLabel: '孔院', name: 'belongs', inputValue: '2'}
        ],
        listeners: {
          scope: me,
          change: function(thiz, newVal){
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
        name: 'reg',
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
