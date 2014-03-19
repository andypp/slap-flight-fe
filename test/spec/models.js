module('SlapFlightFE unit tests: models', {
  setup: function() {
    SlapFlightFe.reset();
  },
  teardown: function() {
    $.mockjaxClear();
  }
});

test('airport should be created successfully', function() {
  expect(1);
  Ember.run(function() {
    var store = SlapFlightFe.__container__.lookup('store:main');
    var airportJson = {
      id: 'SIN',
      description: 'Singapore',
      country: 'SG'
    };
    stubEndpointForHttpRequest('/api/v1/airports', {airports: [airportJson]});

    var newAirport = store.createRecord('airport', {
      id: 'GGG',
      description: 'aa',
      country: 'aa'
    });
    store.push('airport', newAirport);


    store.find('airport').then(function(items) {
      items.map(function(item) {
        console.log(item.get('id') + ' -- ' + item.get('description'));
      });
    });
  });
  ok(SlapFlightFe.Airport, 'airport is not null');
});
