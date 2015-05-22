Ext.define('SysApp.view.org.AddDialog', {
	extend: 'Ext.window.Window',
  requires: [ 'SysApp.model.School' ],
	title: '注册机构',
	closeAction: 'hide',
	closable: true,
	width: 600,
	height:600,
	modal: true, 
	autoShow: false,
	overflowY: 'auto',
  maximizable: true,

  url: '/',
  orgCheckUrl: '/',

	initComponent: function(){
		var me = this;

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
        xtype      : 'radiogroup',
        fieldLabel : '所属',
        columns: 3,
        items: [
          { boxLabel: '机构', name: 'belongs', inputValue: '1' ,checked: true },
          { boxLabel: '孔院', name: 'belongs', inputValue: '2'}
        ],
        listeners: {
          scope: me,
          change: function(thiz, newVal){
            var org = me.formPanel.down('#org');
            var school = me.formPanel.down('#school');

            if(newVal.belongs == '1'){
              org.enable();
              org.show();

              school.disable();
              school.hide();

            }else if(newVal.belongs == '2'){
              school.enable();
              school.show();
              schoolStore.load();

              org.disable();
              org.hide();
            }
          }
        }
      },{
        fieldLabel: '机构名称' + '<span class="red"> * </span>',
        name: 'name',
        itemId : 'org',
        allowBlank: false,
        listeners : {
          blur : function(textfield) {

            if(!textfield.isValid()){
              return;
            }
            var val = textfield.getValue();

            Ext.Ajax.request({
              url : me.orgCheckUrl,
              params: {
                name: val
              },
              success : function(response) {
                var json = Ext.decode(response.responseText, {safe: true});

                if(json && json.success){
                  textfield.setValidation(true);
                }else{
                  textfield.setValidation('该机构名称已被使用！');
                }
              }
            });
          },
          change: function(textfield){
            textfield.setValidation(true);
          }
        }
      },{
        fieldLabel: '孔院名称' + '<span class="red"> * </span>',
        name: 'name',
        itemId : 'school',
        xtype: 'combo',
        store: schoolStore,
        displayField: 'cn',
        valueField: 'cn',
        forceSelection: true,
        typeAhead: true,
        queryMode: 'local',
        hidden: true,
        disabled: true,
        allowBlank: false,
        listeners : {
          blur : function(textfield) {

            if(!textfield.isValid()){
              return;
            }
            var val = textfield.getValue();

            Ext.Ajax.request({
              url : me.orgCheckUrl,
              params: {
                name: val
              },
              success : function(response) {
                var json = Ext.decode(response.responseText, {safe: true});

                if(json && json.success){
                  textfield.setValidation(true);
                }else{
                  textfield.setValidation('该机构名称已被使用！');
                }
              }
            });
          },
          change: function(textfield){
            textfield.setValidation(true);
          }
        }
      },{
        fieldLabel: '电子邮箱' + '<span class="red"> * </span>',
        name: 'org_email',
        allowBlank: false,
        listeners : {
          blur : function(textfield) {

            if(!textfield.isValid()){
              return;
            }
            var val = textfield.getValue();

            Ext.Ajax.request({
              url : me.orgCheckUrl,
              params: {
                org_email: val
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
        fieldLabel: '机构网址' + '<span class="red"> * </span>',
        name: 'org_url',
        allowBlank: false,
        emptyText: '请以http://或https://开头',
        vtype: 'url'
      },{
        fieldLabel: '课堂人数上限',
        name: 'org_size',
        xtype: 'numberfield',
        minValue: 50,
        value: 50
      },{
        fieldLabel: '联系人',
        name: 'contacts'
      },{
        fieldLabel: '联系电话',
        name: 'org_phone'
      },{
        fieldLabel: '联系地址',
        name: 'org_address'
      },{
        fieldLabel: '简介',
        name: 'org_info',
        xtype: 'textarea'
      },{
        fieldLabel: 'Logo',
        name: 'org_logo',
        xtype: 'filefield',
        emptyText: '推荐使用120x80像素png透明Logo'
      },{
        fieldLabel: '营业执照号',
        name: 'license'
      },{
        fieldLabel: '执照副本图片',
        name: 'org_img',
        xtype: 'filefield'
      },{
        fieldLabel: '组织机构代码',
        name: 'code'
      },{
        fieldLabel: '组织机构副本',
        name: 'code_img',
        xtype: 'filefield'
      },{
        fieldLabel: '税务登记号',
        name: 'taxid'
      },{
        fieldLabel: '税务登记证副本',
        name: 'tax_img',
        xtype: 'filefield'
      }]
    });
  		
		me.items = [me.formPanel];
		
		me.buttons = [{
      text: '注册',
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
          SysApp.Common.showToast('注册成功！');
          this.fireEvent('success');
          this.close();
        }else{
          SysApp.Common.error('注册失败！');
        }
        
      },
      failure: function(){
        SysApp.Common.error('注册失败！');
      }
    });
  
  }

});
