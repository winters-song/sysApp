Ext.define('SysApp.view.Navigation', {
	extend: 'Ext.tree.Panel',
	alias: 'widget.navigationView',
  title: '主菜单',
  width: 300,
  store: 'SysApp.store.MenuItems',
  rootVisible: false
});
