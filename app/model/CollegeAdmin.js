Ext.define('SysApp.model.CollegeAdmin', {
  extend: 'Ext.data.Model',
  fields: [
    'uid',
    'username',
    'name',
    'email',
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