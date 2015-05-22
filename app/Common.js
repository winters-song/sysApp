Ext.define('SysApp.Common', {
	singleton: true,

	logoutUrl:'/logout',

	showToast: function(s) {
    Ext.toast({
      html: s,
      closable: false,
      align: 't',
      slideInDuration: 400
    });
  },

	error: function(msg){
		Ext.Msg.show({
      title:'错误',
      message: msg,
      buttons: Ext.Msg.OK,
      icon: Ext.Msg.ERROR
    });
	},

	mapToArray : function(map){
		var arr = [];

		if(map){
			for(var i in map){
				arr.push({
					id: i,
					name: map[i]
				});
			}
		}
		return arr;
	},

	getFilterArray: function(arr){
		var array = Ext.clone(arr);
		return Ext.Array.insert(array, 0, [{ name: '不限', id: ''}]);
	},

	imgLinkRenderer: function(v){
		if(v){
			return '<a href="'+v+'" target="blank">查看</a>';
		}
		return '';
	},

	switchRenderer: function(v){
		if(v == "0"){
			return '<span class="red">关</span>';
		}
		return '<span class="green">开</span>';
	}

});

SysApp.Common.Educations = {
	map : {
		"1": '高中毕业',
		"2": '学院在读',
		"3": '大学生',
		"4": '准学士学位',
		"5": '文学学士/理学学士',
		"6": '研究生',
		"7": '在读研究生',
		"8": '文学硕士/理学硕士/工商管理硕士',
		"9": '博士/博士后',
		"10": '法学博士'
	}
};


SysApp.Common.Experiences = {
	map : {
		"0": '无',
		"1": '1年',
		"2": '2年',
		"3": '3年',
		"4": '4年',
		"5": '5-10年',
		"6": '10年以上'
	}
}

SysApp.Common.Educations.array = SysApp.Common.mapToArray( SysApp.Common.Educations.map );
SysApp.Common.Experiences.array = SysApp.Common.mapToArray( SysApp.Common.Experiences.map );

SysApp.Common.Province = {};
SysApp.Common.Province.array = [{"id":"1","name":"\u5317\u4eac"},{"id":"2","name":"\u4e0a\u6d77"},{"id":"3","name":"\u9ed1\u9f99\u6c5f"},{"id":"4","name":"\u5409\u6797"},{"id":"5","name":"\u8fbd\u5b81"},{"id":"6","name":"\u5929\u6d25"},{"id":"7","name":"\u5b89\u5fbd"},{"id":"8","name":"\u6c5f\u82cf"},{"id":"9","name":"\u6d59\u6c5f"},{"id":"10","name":"\u9655\u897f"},{"id":"11","name":"\u6e56\u5317"},{"id":"12","name":"\u5e7f\u4e1c"},{"id":"13","name":"\u6e56\u5357"},{"id":"14","name":"\u7518\u8083"},{"id":"15","name":"\u56db\u5ddd"},{"id":"16","name":"\u5c71\u4e1c"},{"id":"17","name":"\u798f\u5efa"},{"id":"18","name":"\u6cb3\u5357"},{"id":"19","name":"\u91cd\u5e86"},{"id":"20","name":"\u4e91\u5357"},{"id":"21","name":"\u6cb3\u5317"},{"id":"22","name":"\u6c5f\u897f"},{"id":"23","name":"\u5c71\u897f"},{"id":"24","name":"\u8d35\u5dde"},{"id":"25","name":"\u5e7f\u897f"},{"id":"26","name":"\u5185\u8499\u53e4"},{"id":"27","name":"\u5b81\u590f"},{"id":"28","name":"\u9752\u6d77"},{"id":"29","name":"\u65b0\u7586"},{"id":"30","name":"\u6d77\u5357"},{"id":"31","name":"\u897f\u85cf"},{"id":"32","name":"\u9999\u6e2f"},{"id":"33","name":"\u6fb3\u95e8"},{"id":"34","name":"\u53f0\u6e7e"}]

SysApp.Common.College = {
	get: function(){
		Ext.Ajax.request({
      url: '/University/university',
      params: {
        uid: me.uid,
        username: value
      },
      async: false
    });
	}
};


SysApp.Common.pageSizes = [{
	id: 10
},{
	id: 20
},{
	id: 50
},{
	id: 100
}];


/**
 * Vtypes
 */
Ext.apply(Ext.form.field.VTypes, {
   
  password: function(val, field) {
    if (field.initialPassField) {
      var pwd = field.up('form').down('#' + field.initialPassField);
      return (val == pwd.getValue());
    }
    return true;
  },

  passwordText: '与密码不相符'
});