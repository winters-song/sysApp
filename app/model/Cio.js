Ext.define('SysApp.model.Cio', {
  extend: 'Ext.data.Model',
  fields: [
    'id',
    'name'
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