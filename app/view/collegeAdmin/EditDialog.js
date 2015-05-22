Ext.define('SysApp.view.collegeAdmin.EditDialog', {
  extend: 'Ext.window.Window',
  title: '修改管理员',
  closeAction: 'hide',
  closable: true,
  width: 500,
  height: 350,
  modal: true, 
  autoShow: false,
  overflowY: 'auto',
  maximizable: true,

  url: '/',
  emailCheckUrl: '/',

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
        allowBlank: false,
        msgTarget: 'side',
        autoFitErrors: false,
        labelAlign: 'right',
        labelWidth: 120
      },
      items: [{
        name: 'uid',
        xtype: 'hidden'
      },{
        fieldLabel: '所属高校',
        xtype: 'displayfield',
        name: 'name'
      },{
        fieldLabel: '用户名'+ '<span class="red"> * </span>',
        name: 'username',
        listeners : {
          blur : function(textfield) {

            if(!textfield.isValid()){
              return;
            }
            var val = textfield.getValue();

            Ext.Ajax.request({
              url : me.emailCheckUrl,
              params: {
                uid: me.uid,
                username: val
              },
              success : function(response) {
                var json = Ext.decode(response.responseText, {safe: true});

                if(json && json.success){
                  textfield.setValidation(true);
                }else{
                  textfield.setValidation('该用户名已被使用！');
                }
              }
            });
          },
          change: function(textfield){
            textfield.setValidation(true);
          }
        }
      },{
        fieldLabel: '电子邮箱'+ '<span class="red"> * </span>',
        name: 'email',
        vtype: 'email',
        listeners : {
          blur : function(textfield) {

            if(!textfield.isValid()){
              return;
            }
            var val = textfield.getValue();

            Ext.Ajax.request({
              url : me.emailCheckUrl,
              params: {
                uid: me.uid,
                email: val
              },
              success : function(response) {
                var json = Ext.decode(response.responseText, {safe: true});

                if(json && json.success){
                  textfield.setValidation(true);
                }else{
                  textfield.setValidation('该邮箱已被使用！');
                }
              }
            });
          },
          change: function(textfield){
            textfield.setValidation(true);
          }
        }
      },{
        fieldLabel: '密码',
        name: 'password',
        inputType: 'password',
        minLength: 5,
        itemId: 'pass',
        allowBlank: true,
        emptyText: '留空则密码保持不变',
        listeners: {
          change: function(field, v){
            var repass = field.nextSibling();
            repass.setDisabled(!v);
          },
          scope: me
        }
      },{
        fieldLabel: '确认密码',
        name: 'repassword',
        inputType: 'password',
        vtype: 'password',
        initialPassField: 'pass',
        disabled: true
      },{
        fieldLabel: '联系电话',
        name: 'mobile',
        allowBlank: true
      }]
    });
      
    me.items = [me.formPanel];
    
    me.buttons = [{
      text: '修改',
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
      this.uid = null;
      this.formPanel.getForm().reset();
    }, me);

    me.on('resize', function(){
      this.updateLayout();
    }, me);

  },

  setValues: function(rec){
    var me = this;
    var form = me.formPanel.getForm();

    me.uid = rec.get('uid');
    
    form.loadRecord(rec);
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
          SysApp.Common.showToast('修改成功！');
          this.fireEvent('success');
          this.close();
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
