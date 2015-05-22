Ext.define('SysApp.view.slider.ViewDialog', {
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
        fieldLabel: '焦点图片',
        name: 'image',
        fieldStyle: 'height:auto;',
        renderer: function(v){
          return '<a href="'+v+'" title="查看原图" target="_blank"><img src="'+v+'" style="max-width:200px;max-height:200px;"></a>';
        }
      },,{
        fieldLabel: '链接地址',
        name: 'url',
        renderer: function(v){
          return '<a href="'+v+'" target="_blank">'+v+'</a>';
        }
      },{
        fieldLabel: '中文标题',
        name: 'cn'
      },{
        fieldLabel: '英语标题',
        name: 'en'
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

  setRecord: function(rec){
    var me = this;
    var form = me.formPanel.getForm();
    
    form.loadRecord(rec);

    setTimeout(function(){
      me.updateLayout();
    },100);
  }

});
