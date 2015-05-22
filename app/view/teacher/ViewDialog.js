Ext.define('SysApp.view.teacher.ViewDialog', {
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

  url: '/',

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
        fieldLabel: '审核不通过理由',
        name: 'reason',
        xtype: 'textarea',
        readOnly: true,
        hidden: true,
        height:50
      },{
        fieldLabel: '姓名',
        name: 'name'
      },{
        fieldLabel: '邮箱',
        name: 'email'
      },{
        fieldLabel: '所属',
        name: 'belongs',
        renderer: function(v){
          return v=='org' ? '机构' :'孔子学院';
        }
      },{
        fieldLabel: '孔院/机构',
        name: 'org'
      },{
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
        fieldLabel: '赴任国家',
        name: 'work_country',
        renderer: function(v){
          return v ? SysApp.Common.Country.map[v] || '' : '';
        }
      },{
        fieldLabel: '赴任时间',
        name: 'work_date'
      },{
        fieldLabel: '赴任岗位',
        name: 'work_job'
      },{
        fieldLabel: '派遣类型',
        name: 'dispatch',
        renderer: function(v){
          if(v==1){
            return '公派';
          }else if(v==2){
            return '外派'
          }
          return '';
        }
      },{
        fieldLabel: '所属学校',
        name: 'work_school'
      },{
        fieldLabel: '当前状态',
        name: 'work_status',
        renderer: function(v){
          if(v==1){
            return '在读';
          }else if(v==2){
            return '教师'
          }
          return '';
        }
      },{
        fieldLabel: '性别',
        name: 'gender',
        renderer: function(v){
          if(v==1){
            return '女';
          }else if(v==2){
            return '男'
          }
          return '';
        }
      },{
        fieldLabel: '出生日期',
        name: 'birthday'
      },{
        fieldLabel: '身份证号',
        name: 'identifier'
      },{
        fieldLabel: '电话',
        name: 'phone'
      },{
        fieldLabel: '学历',
        name: 'education',
        renderer: function(v){
          var map = {
            1 : '高中毕业',
            2 : '学院在读',
            3 : '大学生',
            4 : '准学士学位',
            5 : '文学学士/理学学士',
            6 : '研究生',
            7 : '在读研究生',
            8 : '文学硕士/理学硕士/工商管理硕士',
            9 : '博士/博士后',
            10 : '法学博士'
          };

          return map[v]||'';
        }
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
        fieldLabel: '工作经历',
        name: 'work_experience',
        renderer: function(v){
          var map = {
            1 : '1年',
            2 : '2年',
            3 : '3年',
            4 : '4年',
            5 : '5-10年',
            6 : '10年以上'
          };

          return map[v]||'无';
        }
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

	setValue: function(values){
    var me = this;
    var form = me.formPanel.getForm();
    
    form.setValues(values);

    me.formPanel.down('[name=reason]').setVisible(!!values.reason);

    var work_country = me.formPanel.down('[name=work_country]');
    var work_date = me.formPanel.down('[name=work_date]');
    var work_job = me.formPanel.down('[name=work_job]');
    var dispatch = me.formPanel.down('[name=dispatch]');
    var work_school = me.formPanel.down('[name=work_school]');
    var work_status = me.formPanel.down('[name=work_status]');

    var type = values.teacher_type;

    if(type == 1){
      work_country.setVisible(1);
      work_date.setVisible(1);
      work_job.setVisible(1);
      dispatch.setVisible(0);
      work_school.setVisible(0);
      work_status.setVisible(0);
    }else if(type == 2){
      work_country.setVisible(0);
      work_date.setVisible(0);
      work_job.setVisible(0);
      dispatch.setVisible(1);
      work_school.setVisible(0);
      work_status.setVisible(0);
    }else if(type == 3){
      work_country.setVisible(0);
      work_date.setVisible(0);
      work_job.setVisible(0);
      dispatch.setVisible(0);
      work_school.setVisible(1);
      work_status.setVisible(1);
    }else{
      work_country.setVisible(0);
      work_date.setVisible(0);
      work_job.setVisible(0);
      dispatch.setVisible(0);
      work_school.setVisible(0);
      work_status.setVisible(0);
    }

    var belongs = me.formPanel.down('[name=belongs]');
    var org = me.formPanel.down('[name=org]');
    if(type && type !== 1){
      belongs.setVisible(0);
      org.setVisible(0);
    }else{
      belongs.setVisible(1);
      org.setVisible(1);
    }

    setTimeout(function(){
      me.updateLayout();
    },100);
  }

});
