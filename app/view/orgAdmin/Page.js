
Ext.define('SysApp.view.orgAdmin.Page', {
  extend: 'Ext.container.Container',
  alias: 'widget.orgAdminPage',
  title: '机构管理员',
  requires :[
    'SysApp.view.orgAdmin.Form',
    'SysApp.view.orgAdmin.Grid',
    'SysApp.view.orgAdmin.AddDialog',
    'SysApp.view.orgAdmin.EditDialog'
  ],
  mixins: ['SysApp.view.Page'],

  initComponent: function(){
    var me = this;

    me.initialize();

    me.createItems( 'orgAdminForm', 'orgAdminGrid' );

    SysApp.orgAdminAddDialog = Ext.create('SysApp.view.orgAdmin.AddDialog',{
      listeners: {
        'success': function(){
          this.grid.onRefresh();
        },
        scope: me
      }
    });

    SysApp.orgAdminEditDialog = Ext.create('SysApp.view.orgAdmin.EditDialog',{
      listeners: {
        'success': function(){
          this.grid.onRefresh();
        },
        scope: me
      }
    });

    me.callParent();

    me.initControls();

    me.on('destroy', function(){
      me.formPanel.destroy();
      me.grid.destroy();
      SysApp.orgAdminAddDialog.destroy();
      SysApp.orgAdminEditDialog.destroy();
    });
  }
});