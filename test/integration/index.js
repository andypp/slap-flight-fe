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

module('SlapFlightFE integration tests: homepage', {
  setup: function () {
    SlapFlightFe.reset();
    $.mockjax({
      url: '/api/v1/airports',
      dataType: 'json',
      response: function(settings) {
        if (typeof settings.data == 'undefined')
          this.responseText = {airports: [sinAirport, kulAirport]};
        else if (settings.data.orig == 'xxx')
          this.responseText = {airports: []};
        else if (settings.data.orig == 'SIN')
          this.responseText = {airports: [kulAirport]};
        else if (settings.data.orig == 'KUL')
          this.responseText = {airports: [sinAirport]};
      }
    });
    visit('/');
  },
  teardown: function() {
    $.mockjaxClear();
  }
});

test('homepage should render jumbotron', 2, function() {
  ok(exists('.jumbotron'), 'jumbotron is rendered');
  equal(find('.jumbotron h1').text(), 'fly cheap', 'jumbotron header text is set properly');
});

test('form should be rendered', 3, function() {
  ok(exists('form'), 'form is rendered');
  equal(find('form').attr('class'), 'form-inline home-index', 'form have correct class');
  equal(find('.form-group').length, 5, 'there are 5 form groups');
});

test('dropdown should be populated', 4, function() {
  ok(exists('#input-origin'), 'origin dropdown is rendered');
  ok(exists('#input-destination'), 'origin dropdown is rendered');
  var options = [];
  find('#input-origin option').map(function(k, v) {
    options.push([v.text, v.value, v.selected]);
  });
  deepEqual(options, [['Select Origin', '', true], ['Singapore', 'SIN', false], ['Kuala Lumpur', 'KUL', false]], 'origin options');
  equal(find('#input-destination').text(), 'Select Destination', 'destination options');
});

test('dropdown should be updated', 3, function() {
  fillIn('#input-origin', 'SIN').then(function() {
    var options = [];
    find('#input-destination option').map(function(k, v) {
      options.push([v.text, v.value, v.selected]);
    });
    deepEqual(options, [['Select Destination', '', true], ['Kuala Lumpur', 'KUL', false]], 'destination options for Singapore');
  });

  fillIn('#input-origin', 'KUL').then(function() {
    var options = [];
    find('#input-destination option').map(function(k, v) {
      options.push([v.text, v.value, v.selected]);
    });
    deepEqual(options, [['Select Destination', '', true], ['Singapore', 'SIN', false]], 'destination options Kuala Lumpur');
  });

  fillIn('#input-origin', '').then(function() {
    var options = [];
    find('#input-destination option').map(function(k, v) {
      options.push([v.text, v.value, v.selected]);
    });
    deepEqual(options, [['Select Destination', '', true]], 'destination options empty');
  });
});

test('toggle should be displayed', 3, function() {
  ok(exists('#label-return') && exists('#label-one-way'), 'labels are displayed');
  equal(find('#label-return').attr('class'), 'btn btn-primary active', 'return is selected');
  equal(find('#label-one-way').attr('class'), 'btn btn-primary', 'one way is not selected');
});

test('date inputs should be displayed', function() {
  ok(exists('#input-departDate') && exists('#input-arriveDate'), 'data inputs are displayed');
  equal(find('#formgroup-departDate').attr('class'), 'form-group', 'depart date is displayed');
  equal(find('#formgroup-arriveDate').attr('class'), 'form-group', 'arrive date is displayed');
  click('#label-one-way').then(function() {
    equal(find('#formgroup-departDate').attr('class'), 'form-group', 'depart date is still displayed');
    equal(find('#formgroup-arriveDate').attr('class'), 'form-group hidden', 'arrive date is now hidden');
  });
});

test('search button should send user to search page', function() {
  // TODO
  ok(true, '');
});
