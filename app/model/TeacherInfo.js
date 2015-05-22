Ext.define('SysApp.model.TeacherInfo', {
  extend: 'Ext.data.Model',
  fields: [
    'id',
    'name',
    'fullname',
    'status',
    'teacher_status',
    'oid',
    'org_name',
    'cio_name',
    'big',
    'thumb',
    'description',
    'description_status',
    'video',
    'video_status',
    'example_class',
    'class_status'
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