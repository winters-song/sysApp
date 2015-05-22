Ext.define('SysApp.view.orgAdmin.Form', {
	extend : 'Ext.form.Panel',
  alias: 'widget.orgAdminForm',
  mixins: ['SysApp.view.Form'],
	initComponent: function(){
		var me = this;

    me.initialize();
		
    var orgStore = Ext.create('Ext.data.Store', {
      model: 'SysApp.model.Org',
      autoLoad:true
    });
      
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
        fieldLabel: '所属机构',
        name: 'oid',
        xtype: 'combo',
        store: orgStore,
        displayField: 'name',
        valueField: 'id',
        forceSelection: true,
        typeAhead: true,
        mode: 'remote',
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
