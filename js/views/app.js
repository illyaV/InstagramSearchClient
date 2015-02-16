define([
  'jquery',
  'underscore',
  'backbone',
  'collections/photos',
  'views/photo',
  //'text!templates/stats.html',
  'common'
], function ($, _, Backbone, Photos, PhotoView, Common) {
  'use strict';  
  
  var AppView = Backbone.View.extend({
  	el: '#app',
    tags: ['cat', 'dog', 'baby', 'car', 'happy', 'city', 'party', 'banana', 'sun', 'sea'],
  	events: {
    	'keypress #tag': 'doSearchOnEnter',
    	'click #search': 'doSearch',
      'click #more':   'loadMore',
  
    },
  
  	initialize: function() {
      this.$input    = this.$('#tag').val(this.randomTag());
      this.$results  = this.$('#results');
      this.$more     = this.$("#more");
      
      this.listenTo(Photos, 'reset', this.render);
      this.listenTo(Photos, 'add', this.addOne);
  
      this.doSearch();
  	},
  
  	render: function() {
      console.log("render");
      this.$results.html('');
      Photos.each(this.addOne, this);
  	},
  
    addOne: function(photo) {
      console.log("addOne");
      
      var view = new PhotoView({model: photo});
      this.$results.append(view.render().el);

      this.$more.toggle(Photos.hasMore());
    },
  
  	doSearchOnEnter: function(event) {
      if (event.which !== Common.ENTER_KEY) {
      	return;
      }
      
      this.doSearch();
    },
  
    doSearch: function() {
      var tag = this.$input.val().trim();
  
      if (!tag) {
        return;
      }
      
      Photos.search(tag);
    },
  
    loadMore: function() {
      Photos.loadMore();
    },
  
    randomTag: function() {
      return this.tags[Math.floor(Math.random()*10)];
    }
  });

  return AppView;
});