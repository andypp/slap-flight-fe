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
    if (this.get('flights') != null && this.get('flights').get('length') > 0)
      return this.get('flights').get('firstObject').get('departDate');
    return '';
  }.property('flights.@each.departDate'),
  arriveDate: function() {
    if (this.get('flights') != null && this.get('flights').get('length') > 0)
      return this.get('flights').get('lastObject').get('arriveDate');
    return '';
  }.property('flights.@each.arriveDate'),
  price: DS.attr('number', {defaultValue: 0.0}),
  isPromo: DS.attr('boolean', {defaultValue: false}),
  flights: DS.hasMany('flight', {async: true})
});
