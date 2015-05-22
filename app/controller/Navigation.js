Ext.define('SysApp.controller.Navigation', {
  extend: 'Ext.app.Controller',

  stores: [
    'SysApp.store.MenuItems'
  ],
  views: [
    'SysApp.view.Header'
  ],

  routes : {
    'page/:id' : 'onPage'
  },

  refs: [{
    ref: 'board',
    selector: '#board'
  }],

  init: function(){
  	this.control({
      'viewport > #navigation': {
        itemclick: this.navigate
      },
      'viewport > #board': {
        afterrender: this.afterRender
      }
    });
  },

  onPage : function(id) {
    var me = this;
    if(!id){
      return;
    }
    me.currentId = id;

    var board = this.getBoard();
    if(board && board.rendered){
      me.renderPage(board, id);
    }
  },

  afterRender: function(){
    var me = this;
    if(!me.currentId){
      return;
    }
    var board = me.getBoard();
    me.renderPage(board, me.currentId);
  },

  renderPage: function(board, id){
    var ns = 'SysApp.view.' + id + '.Page';
    var xtype = id + 'Page';

    var page = board.down(xtype);

    if(!page){
      var page = Ext.create(ns,{
        closable:true
      });
      board.add(page);
      board.setActiveTab(page);
    }else{
      board.setActiveTab(page);
      page.grid.onRefresh();
    }
  },

  navigate: function( thiz, record, item, index, e, eOpts ){
    var mid = record.data.mid;
    if(mid){
      this.redirectTo('page/' + mid);
    }
  }
});