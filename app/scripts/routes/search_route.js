SlapFlightFe.SearchRoute = Ember.Route.extend({
  model: function(params) {
    return {
      origin: this.parseParam(params.origin),
      destination: this.parseParam(params.destination),
      from: this.parseParam(params.from),
      to: this.parseParam(params.to),
    }
  },
  setupController: function(controller, model) {
    controller.set('departModelTrip', this.store.find('trip', {'walk': 'lala'}));
    controller.set('returnModelTrip', this.store.find('trip', {'walk': 'lele'}));
    var sForm = {
      hideLabel: false,
      loc: '',
    };
    if (model != null) {
      sForm.origin = model.origin;
      sForm.destination = model.destination;
      sForm.departDate = model.from;
      sForm.returnDate = model.to;
    }
    controller.set('sForm', sForm);
  },

  parseParam: function(val) {
    if (val != null && val != '' && val != 'undefined')
        return val;
    return null;
  }
});
