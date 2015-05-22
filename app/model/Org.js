Ext.define('SysApp.model.Org', {
  extend: 'Ext.data.Model',
  fields: [
    'id',
    'name',
    'org_logo',
    'org_size',
    'status',
    'visible'
  ],
  idProperty: 'id',
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