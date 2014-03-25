var store;
var sinAirport = {
  id: 'SIN',
  description: 'Singapore',
  country: 'SG'
};
var kulAirport = {
  id: 'KUL',
  description: 'Kuala Lumpur',
  country: 'MY'
};

module('SlapFlightFE unit tests: models', {
  setup: function() {
    SlapFlightFe.reset();
    Ember.run(function() {
      store = SlapFlightFe.__container__.lookup('store:main');
    });
  },
  teardown: function() {
    $.mockjaxClear();
    Ember.run(function() {
      store.destroy();
    });
  }
});

test('airport should be created successfully', 1, function() {
  Ember.run(function() {
    var kualaLumpur = store.createRecord('airport', kulAirport);
    ok(kualaLumpur, 'airport is not null');
  });
});

asyncTest('airport should be retrieved successfully', 1, function() {
  Ember.run(function() {
    stubEndpointForHttpRequest('/api/v1/airports', {airports: [sinAirport, kulAirport]});
    store.find('airport').then(function(items) {
      equal(items.get('length'), 2, 'airport is retrieved successfully');
      start();
    });
  });
});

test('flight should be created successfully', 1, function() {
  Ember.run(function() {
    var flight = store.createRecord('flight', {
      code: 'AK313',
      origin: 'SIN',
      destination: 'KUL',
    });
    ok(flight, 'flight is not null');
  });
});

test('trip should be created successfully', 1, function() {
  Ember.run(function() {
    var trip = store.createRecord('trip', {
      airline: 'airasia',
      origin: 'SIN',
      destination: 'KUL',
    });
    ok(trip, 'trip is not null');
  });
});

asyncTest('trip attributes should be computed from flights', function() {
  Ember.run(function() {
    stubEndpointForHttpRequest('/api/v1/trips', {
      flights: [{
        id: 1,
        code: 'AK111',
        departDate: '2014-01-01T16:00:00',
        arriveDate: '2014-01-01T19:00:00',
        origin: 'SIN',
        destination: 'KUL',
        trip: 3,
      },
      {
        id: 2,
        code: 'AK222',
        departDate: '2014-01-01T20:00:00',
        arriveDate: '2014-01-01T22:00:00',
        origin: 'KUL',
        destination: 'HKT',
        trip: 3,
      }],
      trips: [{
        id: 3,
        airline: 'airasia',
        origin: 'SIN',
        destination: 'HKT',
        flights: [1, 2],
        price: 99.9,
      }]
    });

    store.find('trip').then(function(trips) {
      equal(trips.get('length'), 1, 'trip is retrieved successfully');
      Ember.run(function() {
        trips.map(function(trip) {
          equal(trip.get('id'), 3, 'correct id is retrieved');
          equal(trip.get('price'), 99.9, 'correct price is retrieved');
          equal(trip.get('isPromo'), false, 'is promo default value is set');
          trip.get('flights').then(function(flights) {
            equal(flights.get('length'), 2, 'trip has correct number of flight');
            equal(flights.get('firstObject').get('code'), 'AK111', 'flight has correct code');
            equal(flights.objectAt(0).get('code'), 'AK111', 'flight has correct code');
            equal(flights.objectAt(1).get('code'), 'AK222', 'flight has correct code');
            equal(flights.objectAt(1).get('departDate').valueOf(), Date.UTC(2014, 0, 1, 20), 'flight has correct depart date');
            equal(flights.objectAt(1).get('arriveDate').valueOf(), Date.UTC(2014, 0, 1, 22), 'flight has correct arrive date');

            equal(trip.get('stops'), 1, 'trip stops is computed properly');
            equal(trip.get('hasStops'), true, 'trip has stops');

            equal(trip.get('departDate').valueOf(), Date.UTC(2014, 0, 1, 16), 'trip has correct depart date');
            equal(trip.get('arriveDate').valueOf(), Date.UTC(2014, 0, 1, 22), 'trip has correct arrive date');
          });
          start();
        });
      });
    });
  });
});
