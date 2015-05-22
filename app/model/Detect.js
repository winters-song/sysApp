Ext.define('SysApp.model.Detect', {
  extend: 'Ext.data.Model',
  fields: [
    'id',
    'name',
    '_browser',
    '_camera',
    '_cookies',
    '_description',
    '_download',
    '_email',
    '_flash',
    '_ip',
    '_mike',
    '_mobile',
    '_screen_size',
    '_sys',
    '_upload',
    'status',
    'uid'
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