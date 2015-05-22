Ext.define('SysApp.view.school.Form', {
	extend : 'Ext.form.Panel',
  alias: 'widget.schoolForm',
  mixins: ['SysApp.view.Form'],
	initComponent: function(){
		var me = this;

    me.initialize();
      
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
        fieldLabel: '孔院名称',
        name: 'name'
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
