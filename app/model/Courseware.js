Ext.define('SysApp.model.Courseware', {
  extend: 'Ext.data.Model',
  fields: [
    'id',
    'name',
    'ext',
    'type',
    'preview',
    'rid',
    {
      name: 'uploadtime', type: 'date', dateFormat:"timestamp"
    },
    'status'
  ],
  idProperty: 'id',
  proxy: {
    type: 'ajax',
    url: '/',
    simpleSortMode: true,
    reader: {
      type: 'json',
      totalProperty: 'total',
      rootProperty: 'result'
    }
  }
});