Ext.define('SysApp.view.orgAdmin.AddDialog', {
  extend: 'Ext.window.Window',
  requires: ['SysApp.model.Org'],

  title: '添加管理员',
  closeAction: 'hide',
  closable: true,
  width: 500,
  height: 350,
  modal: true, 
  autoShow: false,
  overflowY: 'auto',
  resizable: false,
  maximizable: true,

  url: '/',
  emailCheckUrl: '/',

  initComponent: function(){
    var me = this;

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
        fieldLabel: '密码'+ '<span class="red"> * </span>',
        name: 'password',
        inputType: 'password',
        minLength: 5,
        itemId: 'pass'
      },{
        fieldLabel: '确认密码'+ '<span class="red"> * </span>',
        name: 'repassword',
        inputType: 'password',
        vtype: 'password',
        initialPassField: 'pass'
      },{
        fieldLabel: '所属机构'+ '<span class="red"> * </span>',
        name: 'oid',
        xtype: 'combo',
        store: orgStore,
        displayField: 'name',
        valueField: 'id',
        forceSelection: true,
        typeAhead: true,
        queryMode: 'local'
      },{
        fieldLabel: '联系电话',
        name: 'mobile',
        allowBlank: true
      }]
    });
      
    me.items = [me.formPanel];
    
    me.buttons = [{
      text: '添加',
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

    me.on('show', function(){
      orgStore.load();
    });
    
    me.on('beforeclose', function(){
      this.formPanel.getForm().reset();
    }, me);

    me.on('resize', function(){
      this.updateLayout();
    }, me);

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
          SysApp.Common.showToast('添加成功！');
          this.fireEvent('success');
          this.close();
        }else{
          SysApp.Common.error('添加失败！');
        }
        
      },
      failure: function(){
        SysApp.Common.error('添加失败！');
      }
    });
  
  }

});
