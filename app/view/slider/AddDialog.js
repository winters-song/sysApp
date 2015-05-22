Ext.define('SysApp.view.slider.AddDialog', {
	extend: 'Ext.window.Window',
	title: '添加推荐',
	closeAction: 'hide',
	closable: true,
	width: 600,
	height: 400,
	modal: true, 
	autoShow: false,
	overflowY: 'auto',
  maximizable: true,

  url: '/',

	initComponent: function(){
		var me = this;

    var required = '<span class="red"> * </span>';

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
        fieldLabel: '焦图图片' + required,
        name: 'image',
        xtype: 'filefield',
        emptyText: '推荐使用960x378像素图片',
        allowBlank: false,
        anchor: '100%',
        buttonText: '选择图片...'
      },{
        fieldLabel: '链接地址' + required,
        name: 'url',
        vtype: 'url',
        allowBlank: false
      },{
        fieldLabel: '中文标题' + required,
        name: 'cn',
        allowBlank: false
      },{
        fieldLabel: '英语标题' + required,
        name: 'en',
        allowBlank: false
      },{
        fieldLabel: '俄语标题',
        name: 'ru'
      },{
        fieldLabel: '日语标题',
        name: 'ja'
      },{
        fieldLabel: '韩语标题',
        name: 'ko'
      },{
        fieldLabel: '西班牙语标题',
        name: 'es'
      },{
        fieldLabel: '法语标题',
        name: 'fr'
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
