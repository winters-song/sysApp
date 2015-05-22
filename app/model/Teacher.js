Ext.define('SysApp.model.Teacher', {
  extend: 'Ext.data.Model',
  fields: [
    'id',
    'name',
    'pro_email',
    'fullname',
    'status',
    'teacher_status',
    'teacher_star',
    'oid',
    'org_name',
    'cio_name',
    'big',
    'thumb',
    'Sex',
    'teacher_recommend',
    'teacher_star',
    'teacher_status',
    'teaher_type',
    'work_country',
    'work_date',
    'work_job',
    'dispatch',
    'work_school',
    'work_status',
    'reg_time'
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