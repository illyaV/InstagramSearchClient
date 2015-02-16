define([
  'backbone',
  'models/photo',
  'common'
],
function(Backbone, Photo, Common) {  
  'use script';

  var PhotosList = Backbone.Collection.extend({
	  _clientId:    "f2bd2d654e2a4db891400acb5341f1f9",
    _curTag:      null,
    _paginateUrl: null,
    
    url: function() {
      return "https://api.instagram.com/v1/tags/" + this._curTag + "/media/recent?client_id=" + this._clientId; 
    },
  
    model: Photo,

	  parse: function(result) {
      console.log("Photos parse", result);
      _.each(result.data, function(item){
        
        if (item.caption && item.caption.created_time) {
          item.caption.created_time_text = Common.getTime(item.caption.created_time || 0);
        }
        
        item.created_time_text = Common.getTime(item.created_time || 0);
      });

      this._paginateUrl = result.pagination.next_url || null;

      return result.data;
	  },

    search: function(tag) {
      this._curTag = tag || null;
      this._paginateUrl = null;

      this.fetch({dataType: "jsonp", reset: true});
    },

    loadMore: function() {
      if (this._paginateUrl) {
        this.fetch({dataType: "jsonp", url: this._paginateUrl});
      }
    },

    hasMore: function () {
      return this._paginateUrl ? true : false;
    }
  });

  return new PhotosList();
});