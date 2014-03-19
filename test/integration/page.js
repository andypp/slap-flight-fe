module('SlapFlightFE integration tests: page loading', {
  setup: function () {
    SlapFlightFe.reset();
  }
});

test('homepage should render jumbotron', function() {
  expect(1);
  visit('/').then(function() {
    ok(exists('.jumbotron'), 'jumbotron not found');
  });
});
