Ext.define('SysApp.view.classes.EditDialog', {
  extend: 'Ext.window.Window',
  title: '修改分类',
  closeAction: 'hide',
  closable: true,
  width: 800,
  height:500,
  modal: true, 
  autoShow: false,
  overflowY: 'auto',
  maximizable: true,

  url: '/',
  getInfoUrl: '/',
  types: ['language', 'category', 'target', 'level', 'learning', 'teaching', 'content'],

  initComponent: function(){
    var me = this;

    var language = [];
    Ext.each(me.language, function(i){
      language.push({
        boxLabel : i.name,
        inputValue : i.id,
        name : 'language'
      });
    });

    var category = [];
    Ext.each(me.category, function(i){
      category.push({
        boxLabel : i.name,
        inputValue : i.id,
        name : 'category'
      });
    });

    var target = [];
    Ext.each(me.target, function(i){
      target.push({
        boxLabel : i.name,
        inputValue : i.id,
        name : 'target'
      });
    });

    var level = [];
    Ext.each(me.level, function(i){
      level.push({
        boxLabel : i.name,
        inputValue : i.id,
        name : 'level'
      });
    });

    var form = [];
    Ext.each(me.form, function(i){
      form.push({
        boxLabel : i.name,
        inputValue : i.id,
        name : 'learning'
      });
    });

    var goal = [];
    Ext.each(me.goal, function(i){
      goal.push({
        boxLabel : i.name,
        inputValue : i.id,
        name : 'teaching'
      });
    });

    var skill = [];
    Ext.each(me.skill, function(i){
      skill.push({
        boxLabel : i.name,
        inputValue : i.id,
        name : 'content'
      });
    });


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
        name: 'clid',
        xtype: 'hidden'
      },{
        name: 'uid',
        xtype: 'hidden'
      },{
        xtype      : 'radiogroup',
        fieldLabel : '授课语言',
        columns: 4,
        items: language
      },{
        xtype      : 'radiogroup',
        fieldLabel : '课堂分类',
        columns: 4,
        items: category
      },{
        xtype      : 'radiogroup',
        fieldLabel : '适用人群',
        columns: 4,
        items: target
      },{
        xtype      : 'radiogroup',
        fieldLabel : '难度级别',
        columns: 4,
        items: level
      },{
        xtype      : 'radiogroup',
        fieldLabel : '课堂形式',
        columns: 4,
        items: form
      },{
        xtype      : 'radiogroup',
        fieldLabel : '教学目的',
        columns: 4,
        items: goal
      },{
        xtype      : 'radiogroup',
        fieldLabel : '内容属性',
        columns: 4,
        items: skill
      }]
    });
      
    me.items = [me.formPanel];
    
    me.buttons = [{
      text: '修改',
      scope: me,
      iconCls: 'icon-edit',
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
      this.org_id = null;
    }, me);

    me.on('resize', function(){
      this.updateLayout();
    }, me);

  },

  doSubmit: function(values){
    var me = this;

    var form = me.formPanel.getForm();
    var values = form.getValues();
    
    Ext.Ajax.request({
      url: me.url,
      params: values,
      scope: me,
      method: 'post',
      success: function(response){
        var json = Ext.decode(response.responseText, { safe: true});
        if(json && json.success){
          SysApp.Common.showToast('修改成功！');
          this.fireEvent('success');
          this.close();
        }else{
          SysApp.Common.showToast('修改失败！');
        }
        this.setValue(json);
      },
      failure: function(){
        SysApp.Common.showToast('修改失败！');
      }
    });
  
  },

  request: function(id){
    var me = this;
    me.clid = id;

    Ext.Ajax.request({
      url: me.getInfoUrl,
      params: {
        id: id
      },
      scope: me,
      method: 'get',
      success: function(response){
        var json = Ext.decode(response.responseText, { safe: true});
        this.setValue(json);
      },
      failure: function(){
        console.warning('请求分类数据失败');
      }
    });

  },

  setValue: function(values){
    var me = this;
    var form = me.formPanel.getForm();

    var school = me.formPanel.down('#school');

    Ext.each(me.types, function(item){
      if(values[item]){
        values[item] = values[item].split(',')[0];
      }
    });
    
    form.setValues(values);
  }

});
