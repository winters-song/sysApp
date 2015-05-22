Ext.define('SysApp.view.org.ImportDialog', {
  extend: 'Ext.window.Window',
  title: '导入学员',
  closeAction: 'hide',
  closable: true,
  width: 500,
  height: 200,
  modal: true, 
  autoShow: false,
  overflowY: 'auto',
  resizable: false,

  url: '/',

  initComponent: function(){
    var me = this;

    me.formPanel = Ext.create('Ext.form.Panel', {
      defaultType: 'textfield',
      border: false,
      style: 'background:#fff',
      padding:'20 30',
      defaults:{
        anchor: '100%'
      },
      fieldDefaults: {
        allowBlank: true,
        msgTarget: 'side',
        autoFitErrors: false,
        labelAlign: 'right',
        labelWidth: 120
      },
      items: [{
        xtype: 'hidden',
        name: 'oid'
      },{
        fieldLabel: '导入文件' + '<span class="red"> * </span>',
        name: 'file',
        xtype: 'filefield',
        allowBlank: false,
        anchor: '100%',
        buttonText: '选择文件...'
      }]
    });
      
    me.items = [me.formPanel];
    
    me.buttons = [{
      text: '导入',
      scope: me,
      iconCls: 'icon-add',
      handler: function(){
        var form = this.formPanel.getForm();
        if(form.isValid()){
          this.doSubmit();
        }
      }
    },{
      text: '取消',
      scope: me,
      handler: function(){
        this.close();
      }
    }];
    
    me.callParent();
    
    me.on('beforeclose', function(){
      this.formPanel.getForm().reset();
    }, me);

  },

  setValue: function(id){
    var me = this;
    var form = me.formPanel.getForm();
    
    form.setValues({
      oid: id
    });
  },

  doSubmit: function(values){
    var me = this;

    var form = me.formPanel.getForm();
    form.submit({
      url: me.url,
      waitMsg: '提交中...',
      submitEmptyText:false,
      scope: me,
      success: function(fp, action) {
        var json = action.result;

        if(json && json.success){
          SysApp.Common.showToast('导入成功！');
          this.fireEvent('success');
          this.close();
        }else{
          SysApp.Common.error('导入失败！<a href="/Admin/Student/export" class="link">下载错误列表</a>');
        }
        
      },
      failure: function(){
        SysApp.Common.error('导入失败！<a href="/Admin/Student/export" class="link">下载错误列表</a>');
      }
    });
  
  }

});
