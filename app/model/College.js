Ext.define('SysApp.model.College', {
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
    proxy: {
      type: 'ajax',
      simpleSortMode: true,
      reader: {
        type: 'json'
      }
    }
  }
});