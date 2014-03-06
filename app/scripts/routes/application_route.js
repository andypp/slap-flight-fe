SlapFlightFe.TripsRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    // these lines can be removed
    controller.set('departTrip', []);
    controller.set('returnTrip', []);
    controller.set('origModelAirports', this.store.find('airport'));
  }
});
