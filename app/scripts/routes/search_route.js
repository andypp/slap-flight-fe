SlapFlightFe.SearchRoute = Ember.Route.extend({
  model: function(params) {
    return {
      origin: this.parseParam('airport', params.origin),
      destination: this.parseParam('airport', params.destination),
      from: this.parseParam('date', params.from),
      to: this.parseParam('date', params.to),
    }
  },
  setupController: function(controller, model) {
    try {
      var searchForm = controller.get('controllers.searchForm');
      searchForm.set('loc', '');
      searchForm.set('hideLabel', false);
      if (model != null) {
        searchForm.set('origin', model.origin);
        searchForm.set('originUrl', model.origin);
        searchForm.set('destination', model.destination);
        searchForm.set('destinationUrl', model.destination);
        searchForm.set('departDate', model.from);
        searchForm.set('returnDate', model.to);
        searchForm.set('isReturn', model.to != null);
      }
      controller.set('departModelTrips', this.store.find('trip', {'walk': 'lala'}));
      if (model.to != null)
        controller.set('returnModelTrips', this.store.find('trip', {'walk': 'lele'}));
    } catch (e) {
      console.log(e);
    }
  },

  parseParam: function(ty, val) {
    if (val != null && val != '' && val != 'undefined' && val != 'null')
        return val;
    return null;
  }
});
