define([
  'jquery',
  'backbone',
  'underscore'
  ], 
function($, Backbone, _) {
	var CommentsView = Backbone.View.extend({
    template: _.template($("#comment-template").html()),
    events: {
      "keypress .comment-input": "makeComment",
      "click .all-comments":     "showAllComments"
    },
    initialize: function() {

    },
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      this.$el.append($('<input />', {type: "text", placeholder: "Type your comment...", class: "comment-input"}));
    },

    makeComment: function() {

    },

    showAllComments: function() {

    }
	});

	return CommentsView;
});