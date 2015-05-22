Ext.define('SysApp.view.teacher.Form', {
	extend : 'Ext.form.Panel',
  alias: 'widget.teacherForm',
  requires: ['SysApp.model.Org', 'SysApp.model.School' ],
  mixins: ['SysApp.view.Form'],
	initComponent: function(){
		var me = this;

		me.initialize();

    var orgStore = Ext.create('Ext.data.Store', {
      model: 'SysApp.model.Org',
      autoDestory: true,
      autoLoad: false,
      proxy: {
        type: 'ajax',
        url: '/admin/org/lists',
        simpleSortMode: true,
        reader: {
          type: 'json',
          totalProperty: 'total',
          rootProperty: 'list'
        }
      }
    });
    var proxy = orgStore.getProxy();
    proxy.limitParam = null;

    var schoolStore = Ext.create('Ext.data.Store', {
      model: 'SysApp.model.School',
      autoDestory: true,
      autoLoad: false,
      proxy: {
        type: 'ajax',
        url: '/user/cio/lists',
        simpleSortMode: true,
        reader: {
          type: 'json'
        }
      }
    });
    proxy = schoolStore.getProxy();
    proxy.limitParam = null;

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

    var recommendCfg = {
      fields: ['key', 'name'],
      data: [{
        key: '',
        name: '不限'
      },{
        key: '1',
        name: '推荐'
      }],
      autoDestroy: true,
      autoLoad: true
    };

    var recommendStore = Ext.create('Ext.data.Store', recommendCfg);
    var starStore = Ext.create('Ext.data.Store', recommendCfg);

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
        fieldLabel: '教师名',
        name: 'name'
      },{
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
      },{
        xtype      : 'radiogroup',
        fieldLabel : '所属',
        columns: 3,
        items: [
          { boxLabel: '全部', name: 'belongs', inputValue: '', checked: true },
          { boxLabel: '孔院', name: 'belongs', inputValue: 'school'},
          { boxLabel: '机构', name: 'belongs', inputValue: 'org' }
        ],
        listeners: {
          scope: me,
          change: function(thiz, newVal){
            var org = me.down('[name=oid]');
            var school = me.down('[name=cid]');

            if(newVal.belongs == 'org'){
              org.enable();
              org.show();
              orgStore.load();

              school.disable();
              school.hide();

            }else if(newVal.belongs == 'school'){
              school.enable();
              school.show();
              schoolStore.load();

              org.disable();
              org.hide();

            }else{
              school.disable();
              school.hide();

              org.disable();
              org.hide();
            }
            
            this.doSearch();
          }
        }
      },{
        hidden: true,
        fieldLabel: '机构',
        name: 'oid',
        xtype: 'combo',
        store: orgStore,
        displayField: 'name',
        valueField: 'id',
        forceSelection: true,
        typeAhead: true,
        queryMode: 'local',
        listeners: {
          scope: me,
          change: function(){
            this.doSearch();
          }
        }
      },{
        hidden: true,
        fieldLabel: '孔院',
        name: 'cid',
        xtype: 'combo',
        store: schoolStore,
        displayField: 'cn',
        valueField: 'groupID',
        forceSelection: true,
        typeAhead: true,
        queryMode: 'local',
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
        fieldLabel: '邮箱',
        name: 'email'
      },{
        fieldLabel: '推荐状态',
        xtype: 'combo',
        name: 'recommend',
        store: recommendStore,
        forceSelection: true,
        displayField: 'name',
        valueField: 'key',
        listeners: {
          scope: me,
          change: function(){
            this.doSearch();
          }
        }
      },{
        fieldLabel: '明星状态',
        xtype: 'combo',
        name: 'star',
        store: starStore,
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
