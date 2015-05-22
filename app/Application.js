/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */

Ext.require([
  'Ext.window.Toast',
  'Ext.grid.plugin.RowExpander',
  'SysApp.view.teacher.Page',
  'SysApp.view.teacherInfo.Page',
  'SysApp.view.classes.Page',
  'SysApp.view.series.Page',
  'SysApp.view.courseware.Page',
  'SysApp.view.org.Page',
  'SysApp.view.orgAdmin.Page',
  'SysApp.view.collegeAdmin.Page',
  'SysApp.view.school.Page',
  'SysApp.view.stat.Page',
  'SysApp.view.detect.Page',
  'SysApp.view.bulletin.Page',
  'SysApp.view.category.Page',
  'SysApp.Common'
]);

Ext.define('SysApp.Application', {
  extend: 'Ext.app.Application',
  
  name: 'SysApp',

  views: [
    'Header',
    'Navigation'
  ],

  controllers: [
    'Header',
    'Navigation'
  ],

  stores: [
      // TODO: add stores here
  ],
  
  launch: function () {

    Ext.Ajax.request({
      url: '/checkLogin',
      scope: this,  
      success: function(response){
        var userInfo = Ext.decode(response.responseText, { safe: true});

        if (!(userInfo && userInfo.success)) {

          Ext.Msg.alert("提示", "您尚未登录或浏览器超时，请重新登录", function(){
            window.location.href="/Public/syslogin.html";
          });

        } else if (!userInfo.is_admin){
          window.location.href="/Public/orgAdmin/";
        } else {
          this.createViewport(userInfo);
        }
      }
    });

  },

  createViewport: function(userInfo){

    Ext.create('Ext.container.Viewport', {
      layout: 'border',

      items: [{
        region: 'north',
        xtype: 'headerView',
        id: 'header',
        height: 70,
        data: {
          userName: userInfo.username
        }
      }, {
        region: 'west',
        xtype: 'navigationView',
        id: 'navigation',
        width: 250,
        collapsible: true,
        split:true
      },{
        region: 'center',
        xtype: 'tabpanel', 
        id: 'board',
        plugins: Ext.create('Ext.ux.TabCloseMenu', {
          closeTabText : '关闭标签页',
          closeOthersTabsText : '关闭其他标签页',
          closeAllTabsText : '关闭全部标签页'
        }),
        items: [{
          title: '首页',
          id: 'page-intro'
        }]
      }]
    });

  }
});
