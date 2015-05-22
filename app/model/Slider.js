Ext.define('SysApp.model.Slider', {
  extend: 'Ext.data.Model',
  fields: [
    'id',
    'url',
    'cn',
    'en',
    'ru',
    'ja',
    'ko',
    'es',
    'fr',
    'image',
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
      rootProperty: 'list'
    }
  }
});