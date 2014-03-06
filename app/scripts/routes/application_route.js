SlapFlightFe.ApplicationRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    var curDate = new Date();
    controller.set('currentYear', curDate.getFullYear());
  }
});
