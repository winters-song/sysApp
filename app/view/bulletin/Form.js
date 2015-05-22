Ext.define('SysApp.view.bulletin.Form', {
	extend : 'Ext.form.Panel',
  alias: 'widget.bulletinForm',
  padding: '20 20 10',
  layout: 'hbox',
  border:false,
  defaults: {
    border:false
  },
  buttonAlign: 'left',

	initComponent: function(){
		var me = this;
  
		me.items = [{
      xtype: 'fieldset',
      layout: 'anchor',
      fieldDefaults: {
        labelAlign: 'right',
        labelWidth: 120,
        msgTarget: 'qtip',
        allowBlank: false
      },
      defaults: {
        width:350
      },
      items: [{
        xtype      : 'radiogroup',
        fieldLabel : '开关',
        columns: 3,
        items: [
          { boxLabel: '开', name: 'status', inputValue: '1', checked: true},
          { boxLabel: '关', name: 'status', inputValue: '2'}
        ],
        listeners: {
          scope: me,
          change: function(thiz, newVal){
            var date = me.down('[name=date]');
            var time = me.down('[name=time]');
            var duration = me.down('[name=duration]');

            if(newVal.status == '1'){
              date.enable();
              time.enable();
              duration.enable();
            }else if(newVal.status == '2'){
              date.disable();
              time.disable();
              duration.disable();
            }
          }
        }
      },{
        xtype      : 'datefield',
        format: 'Y-m-d',
        fieldLabel : '维护日期',
        name: 'date'
      },{
        xtype      : 'timefield',
        fieldLabel : '维护时间',
        format: 'H:i',
        name: 'time'
      },{
        xtype      : 'numberfield',
        fieldLabel : '持续时间（小时）',
        name: 'duration',
        minValue: 0
      },{
        xtype      : 'radiogroup',
        fieldLabel : '猜你喜欢开关',
        columns: 3,
        items: [
          { boxLabel: '开', name: 'recommend', inputValue: '1', checked: true},
          { boxLabel: '关', name: 'recommend', inputValue: '2'}
        ]
      }]
    }];
		
		me.buttons = [{
      text: '修改',
      iconCls: 'icon-search',
      handler: me.onEdit,
      scale: 'medium',
      scope: me,
      margins: '0 20 0 0',
      style: 'margin-left:130px'
    }, {
      text: '刷新',
      scale: 'medium',
      handler: function() {
        me.loadRecords();
      }
    }];
		
		me.callParent();

    me.on('afterrender', me.onAfterrender);
	}, 

  onAfterrender: function(){
    this.loadRecords();
  }, 

  loadRecords: function(){
    var me = this;

    Ext.Ajax.request({
      url: '/Course/Admin/query_bulletin',
      method: 'get',
      scope: me,
      success: function(response){
        var json = Ext.decode(response.responseText, { safe: true});
        if(json){

          var date = new Date(json.date);
          json.date = date;
          json.time = date;

          var form = this.getForm();

          form.setValues(json);
        }
      }
    });
  },

  onEdit: function(){
    var me = this;

    var form = me.getForm();

    form.submit({
      url: '/Course/Admin/bulletin',
      waitMsg: '提交中...',
      submitEmptyText:false,
      scope: me,
      success: function(fp, action) {
        var json = action.result;

        if(json && json.success){
          SysApp.Common.showToast('修改成功！');
        }else{
          SysApp.Common.error('修改失败！');
        }
        
      },
      failure: function(){
        SysApp.Common.error('修改失败！');
      }
    });
  }

});
