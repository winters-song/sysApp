
Ext.define('SysApp.view.collegeAdmin.Page', {
  extend: 'Ext.container.Container',
  alias: 'widget.collegeAdminPage',
  title: '高校管理员',
  requires :[
    'SysApp.view.collegeAdmin.Form',
    'SysApp.view.collegeAdmin.Grid',
    'SysApp.view.collegeAdmin.AddDialog',
    'SysApp.view.collegeAdmin.EditDialog'
  ],
  mixins: ['SysApp.view.Page'],

  initComponent: function(){
    var me = this;

    me.initialize();

    me.createItems( 'collegeAdminForm', 'collegeAdminGrid' );

    SysApp.collegeAdminAddDialog = Ext.create('SysApp.view.collegeAdmin.AddDialog',{
      listeners: {
        'success': function(){
          this.grid.onRefresh();
        },
        scope: me
      }
    });

    SysApp.collegeAdminEditDialog = Ext.create('SysApp.view.collegeAdmin.EditDialog',{
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
      SysApp.collegeAdminAddDialog.destroy();
      SysApp.collegeAdminEditDialog.destroy();
    });
  }
});