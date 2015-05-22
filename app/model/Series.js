Ext.define('SysApp.model.Series', {
  extend: 'Ext.data.Model',
  fields: [
    'sid',
    'uid',
    'thumb',
    'title',
    'lecturer_avatar',
    'lecturer_name',
    'lecturer_realname',
    {
      name: 'time', type: 'date', dateFormat:"timestamp"
    },
    'status',
    'recommend',
    'reason'
  ],
  idProperty: 'sid',
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