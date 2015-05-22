Ext.define('SysApp.model.OrgAdmin', {
  extend: 'Ext.data.Model',
  fields: [
    'uid',
    'username',
    'email',
    'oid',
    {name: 'org_name', mapping: 'name'},
    'mobile'
  ],
  idProperty: 'uid',
  proxy: {
    type: 'ajax',
    url: '/',
    simpleSortMode: true,
    reader: {
      type: 'json',
      totalProperty: 'total',
      rootProperty: 'list'
    }
  }
});