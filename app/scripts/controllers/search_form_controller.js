SlapFlightFe.SearchFormController = Ember.ObjectController.extend({
  loc: '',
  hideLabel: false,
  origin: null,
  destination: null,
  departDate: null,
  returnDate: null,
  isSearching: false,
  isReturn: true,
  needs: ['trips'],

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
      // TODO only send to if not already in search, if in search, use binding to update model
      this.get('target').send('goToSearch', origin, destination, departDate, returnDate)
    },

    showReturn: function(doShow) {
      this.set('isReturn', doShow);
    }
  },

  checkSearching: function() {
    this.set('isSearching', false);
  },

  init: function() {
    if (this.get('model')) {
      this.set('loc', this.get('model').loc);
      this.set('hideLabel', this.get('model').hideLabel);
      this.set('departDate', this.get('model').departDate);
      this.set('returnDate', this.get('model').returnDate);
    }
    this.set('origModelAirports', this.store.find('airport'));
  },

  origAirports: function() {
    return this.get('origModelAirports').map(function(item) {
      return {id: item.get('id'), desc: item.get('description')};
    });
  }.property('origModelAirports.@each'),

  // TODO use binding
  origAirportsUpdated: function() {
    if (this.get('model'))
      this.set('origin', this.get('model').origin);
  }.observes('origAirports.@each').on('init'),

  originUpdated: function() {
    console.log('updated origin');
    if (this.get('origin') != null && this.get('origin') != '')
      this.set('destModelAirports', this.store.find('airport', {'orig': this.get('origin')}));
    else
      this.set('destModelAirports', this.store.find('airport', {'orig': 'xxx'}));
  }.observes('origin').on('init'),

  destAirports: function() {
    console.log('dest model updated');
    if (this.get('destModelAirports') != null) {
      return this.get('destModelAirports').map(function(item) {
        return {id: item.get('id'), desc: item.get('description')};
      });
    }
    return null;
  }.property('destModelAirports.@each'),

  // TODO use binding
  destAirportsUpdated: function() {
    console.log('updated dest');
    if (this.get('model'))
      this.set('destination', this.get('model').destination);
  }.observes('destAirports.@each').on('init'),

  departDateUpdated: function() {
    if (this.get('departDate') != '')
      $('#input-arriveDate').datepicker("setStartDate", this.get('departDate'));
  }.observes('departDate').on('init'),
});
