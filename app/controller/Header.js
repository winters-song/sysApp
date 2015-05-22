Ext.define('SysApp.controller.Header', {
  extend: 'Ext.app.Controller',

  views: [
    'SysApp.view.Header'
  ],

  init: function(){
  	this.control({
      'viewport > #header': {
        render: this.onRendered
      }
    });
  },

  onRendered: function(panel){
  	var me = this;
  	var el = panel.el;

    me.menu = Ext.create('Ext.menu.Menu', {
      renderTo: Ext.getBody(),  
      plain: true,
      items: [{
        text: '清除服务器缓存',
        handler: function(){

          Ext.Ajax.request({
            url: '/wipeCache',
            success: function(response){
              Ext.Msg.alert('提示', "清除成功！");
            }
          });
        }
      }]
    });

    settingEl = el.getById('settings');
    settingEl.on({
      'click': me.showMenu,
      scope: me,
      preventDefault: true
    });

  	logoutEl = el.getById('logout');
  	logoutEl.on({
  		'click': me.logout,
  		scope: me,
  		preventDefault: true
  	});
  },

  showMenu: function(e, t){
    var el = Ext.get(t);
    this.menu.showBy(el, 'tr-br');
  },

  logout: function(){
  	Ext.Msg.confirm('确认','确定要退出吗？', function(state){
  		if(state == 'yes'){
        window.location.href = SysApp.Common.logoutUrl;
  		}
  	});
  	
  }

});