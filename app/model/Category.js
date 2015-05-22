Ext.define('SysApp.model.Category', {
  extend: 'Ext.data.Model',
  fields: [
    'puid',
    'cid',
    'c_name',
    'pid',
    'title',
    'status'
  ],
  idProperty: 'puid',
  proxy: {
    type: 'ajax',
    url: '/',
    simpleSortMode: true,
    reader: {
      type: 'json'
    }
  }
});