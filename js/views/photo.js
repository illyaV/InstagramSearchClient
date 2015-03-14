define([
  'jquery',
  'backbone',
  //'underscore',
  'common',
  'models/comments',
  'views/comments'
],
function($, Backbone, Common, CommentsModel, CommentsView){
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

		  var comments = new CommentsModel(this.model.get('comments')),
          commentsView = new CommentsView({model: comments});
      
      commentsView.setElement(this.$(".results-comments").get(0));		  
      commentsView.render();
      
      this.onImgLoad();
		  return this;
    },

    onImgLoad: function () {
  	  var self = this;

  	  $('<img>').load(function() {
        self.$(".results-photo").addClass("loaded");
      }).attr('src', function() {
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