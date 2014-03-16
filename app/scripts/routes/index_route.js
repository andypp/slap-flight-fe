SlapFlightFe.IndexRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    var searchForm = controller.get('controllers.searchForm');
    searchForm.set('loc', 'home-index');
    searchForm.set('hideLabel', true);
  },
});
