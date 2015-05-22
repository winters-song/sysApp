Ext.define('SysApp.view.detect.ViewDialog', {
	extend: 'Ext.window.Window',
	title: '查看详情',
	closeAction: 'hide',
	closable: true,
	width: 500,
	height:600,
	modal: true, 
	autoShow: false,
	overflowY: 'auto',
  maximizable: true,

	initComponent: function(){
		var me = this;

    me.formPanel = Ext.create('Ext.form.Panel', {
      defaultType: 'displayfield',
      border: false,
      style: 'background:#fff',
      padding:'20',
      defaults:{
        anchor: '100%',
        msgTarget: 'side',
        allowBlank: false
      },
      fieldDefaults: {
        labelAlign: 'right',
        labelWidth: 120
      },
      items: [{
        fieldLabel: '诊断号',
        name: 'id'
      },{
        fieldLabel: '用户ID',
        name: 'uid'
      },{
        fieldLabel: '邮箱',
        name: '_email'
      },{
        fieldLabel: '系统',
        name: '_sys'
      },{
        fieldLabel: '浏览器',
        name: '_browser'
      },{
        fieldLabel: '移动端',
        name: '_mobile',
        renderer: function(v){
          if(v==1){
            return '否';
          }else if(v==2){
            return '是';
          }
          return '';
        }
      },{
        fieldLabel: 'Flash',
        name: '_flash'
      },{
        fieldLabel: 'Cookies',
        name: '_cookies',
        renderer: function(v){
          if(v==1){
            return '关闭';
          }else if(v==2){
            return '开启';
          }
          return '';
        }
      },{
        fieldLabel: '分辨率',
        name: '_screen_size'
      },{
        fieldLabel: '摄像头',
        name: '_camera',
        renderer: function(v){
          if(v==1){
            return '有问题';
          }else if(v==2){
            return '正常'
          }
          return '';
        }
      },{
        fieldLabel: '麦克风',
        name: '_mike',
        renderer: function(v){
          if(v==1){
            return '有问题';
          }else if(v==2){
            return '正常'
          }
          return '';
        }
      },{
        fieldLabel: '上传速度（KB/s）',
        name: '_upload',
        xtype: 'textarea',
        readOnly: true
      },{
        fieldLabel: '下载速度（KB/s）',
        name: '_download',
        xtype: 'textarea',
        readOnly: true
      },{
        fieldLabel: '备注',
        name: '_description',
        xtype: 'textarea',
        readOnly: true
      }]
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

	setValue: function(rec){
    var me = this;
    var form = me.formPanel.getForm();
    
    form.loadRecord(rec);

    setTimeout(function(){
      me.updateLayout();
    },100);
  }

});
