SlapFlightFe.TripsView = Ember.View.extend({
  templateName: 'trips',
  didInsertElement: function() {
    var curDate = new Date();
    $('#input-departDate').datepicker({
      format: "m/d/yyyy",
      startDate: (curDate.getMonth() + 1) + "/" + curDate.getDate() + "/" + curDate.getFullYear(),
      todayBtn: "linked",
    });
  }
});
