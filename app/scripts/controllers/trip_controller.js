SlapFlightFe.TripController = Ember.ObjectController.extend({
  actions: {
    selectFlight: function() {
      console.log('selected: ' + this.get('model').get('airline'));
    },
  },
});
