SlapFlightFe.SearchFormController = Ember.ObjectController.extend({
  loc: 'home-search',
  hideLabel: true,
  origin: null,
  destination: null,
  departDate: null,
  returnDate: null,
  isSearching: false,
  isReturn: true,
  origModelAirports: null,
  destModelAirports: null,
  originUrl: null,
  destinationUrl: null,
  origNotLoaded: true,
  destNotLoaded: true,

  init: function() {
    this.set('origModelAirports', this.store.find('airport'));
  },

  actions: {
    search: function() {
      var origin = this.get('origin');
      var destination = this.get('destination');
      var departDate = this.get('departDate');
      var returnDate = this.get('returnDate');

      console.log("origin: " + origin + ", destination: " + destination + ", depart: " + departDate + ", return: " + returnDate);
      /*
      // TODO form validation
      if (origin && destination && departDate && (!this.get('isReturn') || returnDate)) {
        this.set('isSearching', true);
        this.set('timeout', setTimeout(this.checkSearching.bind(this), 1000));
        this.get('target').send('goToSearch', origin, destination, departDate, returnDate)
      }
      */
      this.get('target').send('goToSearch', origin, destination, departDate, returnDate)
    },

    showReturn: function(doShow) {
      this.set('isReturn', doShow);
    }
  },

  origAirports: function() {
    if (this.get('origModelAirports') != null) {
      return this.get('origModelAirports').map(function(item) {
        return {id: item.get('id'), desc: item.get('description')};
      });
    }
  }.property('origModelAirports.@each'),

  originUpdated: function() {
    if (this.get('origin') != null && this.get('origin') != '')
      this.set('destModelAirports', this.store.find('airport', {'orig': this.get('origin')}));
    else
      this.set('destModelAirports', this.store.find('airport', {'orig': 'xxx'}));
  }.observes('origin').on('init'),

  destAirports: function() {
    if (this.get('destModelAirports') != null) {
      return this.get('destModelAirports').map(function(item) {
        return {id: item.get('id'), desc: item.get('description')};
      });
    }
    return null;
  }.property('destModelAirports.@each'),

  // TODO use binding
  origAirportsLoaded: function() {
    if (this.get('origNotLoaded')) {
      if (this.get('origAirports') != null && this.get('origAirports').length > 0) {
        this.set('origin', this.get('originUrl'));
        this.set('origNotLoaded', false);
      }
    }
  }.observes('origAirports.@each').on('init'),

  // TODO use binding
  destAirportsUpdated: function() {
    if (this.get('destNotLoaded')) {
      if (this.get('destAirports') != null && this.get('destAirports').length > 0) {
        this.set('destination', this.get('destinationUrl'));
        this.set('destNotLoaded', false);
      }
    }
  }.observes('destAirports.@each').on('init'),

  departDateUpdated: function() {
    if (this.get('departDate') != '')
      $('#input-arriveDate').datepicker("setStartDate", this.get('departDate'));
  }.observes('departDate').on('init'),
});
