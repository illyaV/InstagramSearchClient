define([
	'backbone'
],
function(Backbone) {
	'use strick';
	
  var AppRouter = Backbone.Router.extend({
	  routes: {
		  'photos/:id': 'viewPhoto',
		  '*other': 'defaultRoute'
	  },
 
	  viewPhoto: function(id) {
      this.navigate("/photos/"+id);
	  },

	  defaultRoute: function(param) {
		  this.navigate("/photos");
	  }
  });

  return AppRouter;
});