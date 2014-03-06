var SlapFlightFe = window.SlapFlightFe = Ember.Application.create();

SlapFlightFe.TripAdapter = DS.RESTAdapter.extend({
  namespace: 'api/v1',
});

/* Order and include as you please. */
require('scripts/controllers/*');
require('scripts/store');
require('scripts/models/*');
require('scripts/routes/*');
require('scripts/views/*');
require('scripts/router');
