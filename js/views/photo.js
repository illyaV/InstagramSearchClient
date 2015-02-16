define([
  'jquery',
  'backbone',
  //'underscore',
  'common'
],
function($, Backbone, Common){
  'use strict';
  
  var PhotoView = Backbone.View.extend({
	  className: "results-item",
	  template: _.template($('#photo-template').html()),

	  initialize: function() {
		  // this.listenTo(this.model, 'change',  this.render);
		  // this.listenTo(this.model, 'destroy', this.remove);
		  // this.listenTo(this.model, 'visible', this.toggleVisible);
	  },

    render: function() {
		  this.$el.html(this.template(this.model.toJSON()));
		  this.onImgLoad();
		  return this;
    },

    onImgLoad: function () {
  	  var self = this;

  	  $('<img>').load(function(){
        self.$(".results-photo").addClass("loaded");
      }).attr('src',function(){
        var imgUrl = self.$(".results-photo").css('background-image');
        
        imgUrl = imgUrl.substring(4, imgUrl .length-1);
        return imgUrl;
      }).each(function() {
        if(this.complete) $(this).load();
      });
    },

    showPhoto: function(e) {
      console.log(e);
    }
  });

  return PhotoView;
});