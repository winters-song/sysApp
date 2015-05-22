Ext.define('SysApp.model.School', {
  extend: 'Ext.data.Model',
  fields: [
    'groupID',
    'cn',
    'status'
  ],
  idProperty: 'groupID',
  proxy: {
    type: 'ajax',
    url: '/',
    simpleSortMode: true,
    reader: {
      type: 'json'
    }
  }
});