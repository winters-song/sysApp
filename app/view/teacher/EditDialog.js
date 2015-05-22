Ext.define('SysApp.view.teacher.EditDialog', {
	extend: 'Ext.window.Window',
	title: '修改教师信息',
	closeAction: 'hide',
	closable: true,
	width: 500,
	height:600,
	modal: true, 
	autoShow: false,
	overflowY: 'auto',
  maximizable: true,

  url: '/',
  getInfoUrl: '/',

	initComponent: function(){
		var me = this;

    var educationStore = Ext.create('Ext.data.Store', {
      fields: ['id', 'name'],
      data: SysApp.Common.Educations.array,
      autoDestroy: true
    });

    var experienceStore = Ext.create('Ext.data.Store', {
      fields: ['id', 'name'],
      data: SysApp.Common.Experiences.array,
      autoDestroy: true
    });

    me.formPanel = Ext.create('Ext.form.Panel', {
      defaultType: 'textfield',
      border: false,
      style: 'background:#fff',
      padding:'20',
      defaults:{
        anchor: '100%',
        msgTarget: 'side',
        allowBlank: true
      },
      fieldDefaults: {
        labelAlign: 'right',
        labelWidth: 120
      },
      items: [{
        xtype: 'hidden',
        name: 'uid'
      },{
        xtype: 'displayfield',
        fieldLabel: '姓名',
        name: 'name'
      },{
        xtype: 'displayfield',
        fieldLabel: '邮箱',
        name: 'email'
      },{
        xtype: 'displayfield',
        fieldLabel: '教师类型',
        name: 'teacher_type',
        renderer: function(v){
          if(v==1){
            return '志愿者教师';
          }else if(v==2){
            return '汉语教师'
          }else if (v ==3){
            return '高校';
          }else if (v ==4){
            return '汉语桥网络教师';
          }else if (v ==5){
            return '新汉学博士';
          }
          return '';
        }
      },{
        xtype      : 'radiogroup',
        fieldLabel: '性别',
        columns: 3,
        items: [
          { boxLabel: '女', name: 'gender', inputValue: 1 },
          { boxLabel: '男', name: 'gender', inputValue: 2}
        ]
      },{
        xtype: 'datefield',
        fieldLabel: '出生日期',
        name: 'birthday',
        format: 'Y-m-d'
      },{
        fieldLabel: '身份证号',
        name: 'identifier'
      },{
        fieldLabel: '电话',
        name: 'phone'
      },{
        xtype: 'combo',
        fieldLabel: '学历',
        name: 'education',
        store: educationStore,
        forceSelection: true,
        displayField: 'name',
        valueField: 'id'
      },{
        fieldLabel: '专业',
        name: 'major'
      },{
        fieldLabel: '毕业院校',
        name: 'graduated_school'
      },{
        fieldLabel: '职称',
        name: 'job_title'
      },{
        xtype: 'combo',
        fieldLabel: '工作经历',
        name: 'work_experience',
        store: experienceStore,
        forceSelection: true,
        displayField: 'name',
        valueField: 'id'
      },{
        fieldLabel: '教师资格认证',
        name: 'teacher_certification'
      },{
        fieldLabel: '证明人',
        name: 'witness'
      },{
        fieldLabel: '证明人联系方式',
        name: 'witness_contact'
      },{
        fieldLabel: '开户行',
        name: 'bank_name'
      },{
        fieldLabel: '银行账户',
        name: 'bank_account'
      },{
        fieldLabel: '联行号',
        name: 'bank_id'
      },{
        fieldLabel: '工作学校',
        name: 'job_school'
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
		}, me);

    me.on('resize', function(){
      this.updateLayout();
    }, me);

	},

  request: function(id){
    var me = this;

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
        console.warning('请求教师数据失败');
      }
    });
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

	setValue: function(values){
    var me = this;
    var form = me.formPanel.getForm();
    
    form.setValues(values);

    setTimeout(function(){
      me.updateLayout();
    },100);
  }

});
