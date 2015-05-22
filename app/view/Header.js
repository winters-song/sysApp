Ext.define('SysApp.view.Header', {
	extend: 'Ext.container.Container',
	alias: 'widget.headerView',
  height:70,
  tpl: [
  	'<h1 id="logo" class="non-select" >CIO在线课堂管理系统</h1>',
  	'<div id="tbar">',
      '<a href="javascript:;">你好，<span class="name">{userName}</span></a>',
      '<a id="settings" class="settings" href="#" title="设置"></a>',
      '<span class="separator"></span>',
      '<a id="logout" class="logout" href="#" title="退出"></a>',
    '</div>'
  ],
  border: false,
  margins: '0 0 5 0'
});
