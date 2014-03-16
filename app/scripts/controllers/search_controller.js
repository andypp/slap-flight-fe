SlapFlightFe.SearchController = Ember.ArrayController.extend({
  needs: 'searchForm',

  departTrips: function() {
    if (this.get('departModelTrips') != null) {
      return this.get('departModelTrips').map(function(item) {
        return item;
      });
    }
  }.property('departModelTrips.@each'),

  returnTrips: function() {
    if (this.get('returnModelTrips') != null) {
      return this.get('returnModelTrips').map(function(item) {
        return item;
      });
    }
  }.property('returnModelTrips.@each'),
});
