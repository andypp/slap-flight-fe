SlapFlightFe.Flight = DS.Model.extend({
  trip: DS.belongsTo('trip'),
  code: DS.attr('string'),
  origin: DS.attr('string'),
  destination: DS.attr('string'),
  departDate: DS.attr('date'),
  arriveDate: DS.attr('date'),
});
