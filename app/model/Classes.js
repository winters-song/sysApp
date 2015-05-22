Ext.define('SysApp.model.Classes', {
  extend: 'Ext.data.Model',
  fields: [
    'clid',
    'name',
    // 'starttime',
    {
      name: 'starttime', type: 'date', dateFormat:"timestamp"
    },{
      name: 'time', type: 'date', dateFormat:"timestamp"
    },
    'endtime',
    'finish',
    'has_replay',
    'is_open',
    'is_replay',
    'is_taped',
    'lecturer_avatar',
    'lecturer_name',
    'lecturer_realname',
    'rid',
    'status',
    'viewable',
    'reason'
  ],
  idProperty: 'clid',
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