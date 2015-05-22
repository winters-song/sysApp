Ext.define('SysApp.view.stat.Form', {
	extend : 'Ext.form.Panel',
  alias: 'widget.statForm',
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
      defaultType: 'numberfield',
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
        name: 'student',
        fieldLabel: '注册学员数',
        minValue: 0
      },{
        name: 'teacher',
        fieldLabel: '开课教师数',
        minValue: 0
      },{
        name: 'classes',
        fieldLabel: '课程数',
        minValue: 0
      },{
        name: 'org',
        fieldLabel: '合作机构数',
        minValue: 0
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
      url: '/api/resource/lists',
      method: 'get',
      scope: me,
      success: function(response){
        var json = Ext.decode(response.responseText, { safe: true});
        if(json){
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
      url: '/api/resource/edit',
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
