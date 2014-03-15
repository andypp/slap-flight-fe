SlapFlightFe.SearchController = Ember.ArrayController.extend({
  departTrip: function() {
    return this.get('departModelTrip').map(function(item) {
      return item;
    });
  }.property('departModelTrip.@each'),

  returnTrip: function() {
    return this.get('returnModelTrip').map(function(item) {
      return item;
    });
  }.property('returnModelTrip.@each'),
});
