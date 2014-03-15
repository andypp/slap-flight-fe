SlapFlightFe.ApplicationRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    var curDate = new Date();
    controller.set('currentYear', curDate.getFullYear());
  },

  actions: {
    goToSearch: function(origin, destination, fromDate, toDate) {
      this.transitionTo('search', {
        origin: origin,
        destination: destination,
        from: fromDate,
        to: toDate,
      });
    },
  },
});
