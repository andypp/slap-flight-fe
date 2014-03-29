module('SlapFlightFE integration tests: common page component', {
  setup: function () {
    SlapFlightFe.reset();
    stubEndpointForHttpRequest('/api/v1/airports', {airports: []});
    visit('/');
  },
  teardown: function() {
    $.mockjaxClear();
  }
});

test('header should be rendered', 3, function() {
  ok(exists('.navbar-header'), 'navbar is rendered');
  equal(find('.navbar-header .navbar-brand').attr('href'), '/', 'header logo points to homepage');
  equal(find('.navbar-header .navbar-brand').text(), 'slap[pw] - flight', 'header logo have proper text');
});

test('footer should be rendered', 2, function() {
  ok(exists('footer'), 'footer is rendered');
  var curDate = new Date();
  ok(find('footer').text().indexOf('' + curDate.getFullYear()) > 0, 'current year is printed');
});
