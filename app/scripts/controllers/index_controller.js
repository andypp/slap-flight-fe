SlapFlightFe.IndexController = Ember.ObjectController.extend({
  init: function() {
    this.set('sForm', {
      hideLabel: true,
      loc: 'home-search',
    });
  },
});
