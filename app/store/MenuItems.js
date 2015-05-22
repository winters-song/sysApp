Ext.define('SysApp.store.MenuItems', {
  extend: 'Ext.data.TreeStore',
  root: {
    expanded: true,
    children: [
      { text: "在线课堂", expanded: true, children: [
        { text: "教师管理", mid: 'teacher', leaf: true, iconCls: 'icon-user-suit' },
        { text: "教师信息管理", mid: 'teacherInfo', leaf: true, iconCls: 'icon-user-suit' },
        { text: "系列课管理", mid: 'series', leaf: true, iconCls: 'icon-collapse' },
        { text: "课堂管理", mid: 'classes', leaf: true, iconCls: 'icon-system'},
        { text: "课件管理", mid: 'courseware', leaf: true, iconCls: 'icon-album'},
        // { text: "首页焦图", mid: 'slider', leaf: true},
        { text: "首页类别推荐", mid: 'category', leaf: true, iconCls: 'icon-list'},
        { text: "公告栏管理", mid: 'bulletin', leaf: true, iconCls: 'icon-language' }
      ]},

      { text: "学校/机构", expanded: true, children: [
        { text: "机构管理", mid: 'org', leaf: true, iconCls: 'icon-grid' },
        { text: "机构管理员", mid: 'orgAdmin', leaf: true, iconCls: 'icon-user-red' },
        { text: "孔院管理", mid: 'school', leaf: true, iconCls: 'icon-grid' },
        { text: "高校管理员", mid: 'collegeAdmin', leaf: true, iconCls: 'icon-user-red' }
      ]},

      { text: "CIO主站", expanded: true, children: [
        { text: "数据统计", mid: 'stat', leaf: true, iconCls: 'icon-chart'}
      ]},

      { text: "客服系统", expanded: true, children: [
        { text: "用户诊断信息", mid: 'detect', leaf: true, iconCls: 'icon-info'}
      ]}
    ]
  }
});