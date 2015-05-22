Ext.define('SysApp.view.org.ViewDialog', {
	extend: 'Ext.window.Window',
	title: '查看详情',
	closeAction: 'hide',
	closable: true,
	width: 600,
	height:600,
	modal: true, 
	autoShow: false,
	overflowY: 'auto',
  maximizable: true,
  
  url: '/',

	initComponent: function(){
		var me = this;

    me.formPanel = Ext.create('Ext.form.Panel', {
      defaultType: 'displayfield',
      border: false,
      style: 'background:#fff',
      padding:'20 30',
      defaults:{
        anchor: '100%'
      },
      fieldDefaults: {
        labelAlign: 'right',
        labelWidth: 120
      },
      items: [{
        fieldLabel: '审核不通过理由',
        name: 'reason',
        xtype: 'textarea',
        readOnly: true,
        hidden: true,
        height: 50
      },{
        fieldLabel: '名称',
        name: 'name'
      },{
        fieldLabel: '电子邮箱',
        name: 'org_email'
      },{
        fieldLabel: '课堂人数上限',
        name: 'org_size'
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
        fieldLabel: '机构网址',
        name: 'org_url'
      },{
        fieldLabel: '简介',
        name: 'org_info',
        xtype: 'textarea',
        readOnly: true
      },{
        fieldLabel: 'Logo',
        name: 'org_logo',
        fieldStyle: 'height:auto;',
        renderer: function(v){
          if(v){
            return '<img src="'+v+'" style="max-width:200px;max-height:200px;">';
          }
          return '';
        }
      },{
        fieldLabel: '营业执照号',
        name: 'license'
      },{
        fieldLabel: '执照副本图片',
        name: 'org_img',
        renderer: SysApp.Common.imgLinkRenderer
      },{
        fieldLabel: '组织机构代码',
        name: 'code'
      },{
        fieldLabel: '组织机构副本',
        name: 'code_img',
        renderer: SysApp.Common.imgLinkRenderer
      },{
        fieldLabel: '税务登记号',
        name: 'taxid'
      },{
        fieldLabel: '税务登记证副本',
        name: 'tax_img',
        renderer: SysApp.Common.imgLinkRenderer
      }/*,{
        fieldLabel: '教师免审核开关',
        name: 'teacher_switch',
        renderer: SysApp.Common.switchRenderer
      },{
        fieldLabel: '课件开关',
        name: 'courseware_switch',
        renderer: SysApp.Common.switchRenderer
      },{
        fieldLabel: '课堂开关',
        name: 'classroom_switch',
        renderer: SysApp.Common.switchRenderer
      }*/]
    });
  		
		me.items = [me.formPanel];
		
		me.buttons = [{
			text: '关闭',
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

  request: function(id){
    var me = this;

    Ext.Ajax.request({
      url: me.url,
      params: {
        id: id
      },
      method: 'get',
      scope: me,
      success: function(response){
        var json = Ext.decode(response.responseText, { safe: true});
        me.setValue(json);
      },
      failure: function(){
        console.warning('请求机构数据失败');
      }
    });
  },

	setValue: function(values){
    var me = this;
    var form = me.formPanel.getForm();
    
    form.setValues(values);

    me.formPanel.down('[name=reason]').setVisible(!!values.reason);

    setTimeout(function(){
      me.updateLayout();
    },100);
  }

});
