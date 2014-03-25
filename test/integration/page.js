module('SlapFlightFE integration tests: page loading', {
  setup: function () {
    SlapFlightFe.reset();
  }
});

test('homepage should render jumbotron', 1, function() {
  visit('/').then(function() {
    ok(exists('.jumbotron'), 'jumbotron not found');
  });
});
