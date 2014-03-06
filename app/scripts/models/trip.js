SlapFlightFe.Trip = DS.Model.extend({
  airline: DS.attr('string'),
  origin: DS.attr('string'),
  destination: DS.attr('string'),
  stops: function() {
    return this.get('flights').get('length') - 1;
  }.property('flights.length'),
  hasStops: function() {
    return this.get('stops') > 0;
  }.property('stops'),
  departDate: function() {
    var dt = "";
    this.get('flights').forEach(function(item) {
      if (dt == "")
        dt = item.get('departDate');
    });
    return dt;
  }.property('flights.@each.departDate'),
  arriveDate: function() {
    var dt = "";
    this.get('flights').forEach(function(item) {
      dt = item.get('arriveDate');
    });
    return dt;
  }.property('flights.@each.arriveDate'),
  price: DS.attr('number', {defaultValue: 0.0}),
  isPromo: DS.attr('boolean', {defaultValue: false}),
  flights: DS.hasMany('flight', {async: true})
});
