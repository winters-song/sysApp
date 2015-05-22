Ext.define('SysApp.view.classes.Form', {
	extend : 'Ext.form.Panel',
  alias: 'widget.classForm',
  mixins: ['SysApp.view.Form', 'SysApp.model.Teacher'],
	initComponent: function(){
		var me = this;

    me.initialize();

    me.layout = 'anchor';
		
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
      autoDestroy: true
    });

    var replayStore = Ext.create('Ext.data.Store', {
      fields: ['key', 'name'],
      data: [{
        key: '',
        name: '不限'
      },{
        key: '1',
        name: '可回放'
      },{
        key: '2',
        name: '教师关闭'
      },{
        key: '3',
        name: '管理员关闭'
      },{
        key: '4',
        name: '点播课'
      }],
      autoDestroy: true
    });

    var teacherStore = Ext.create('Ext.data.Store', {
      model: 'SysApp.model.Teacher',
      proxy: {
        type: 'ajax',
        url: '/admin/teacher/lists',
        reader: {
          type: 'json',
          totalProperty: 'total',
          rootProperty: 'list'
        }
      },
      autoLoad: true
    });
      
		me.items = [{
      width: 730,
      labelAlign: 'right',
      labelWidth: 130,
      msgTarget: 'qtip',
      fieldLabel: '教师名',
      xtype: 'combo',
      name: 'teacher_id',
      queryParam : 'name',
      store: teacherStore,
      queryMode: 'remote',
      pageSize: 25,
      minChars: 1,
      displayField: 'name',
      valueField: 'id',
      emptyText: '请输入教师名',
      listeners: {
        scope: me,
        select: function(){
          this.doSearch();
        }
      }
    },{
      layout: 'hbox',
      style: 'border:0;',
      items:[{
        xtype: 'fieldset',
        border: 0,
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
          fieldLabel: '课堂名称',
          name: 'name'
        },{
          fieldLabel: '类型',
          xtype: 'combo',
          name: 'state',
          store: replayStore,
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
        border: 0,
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
