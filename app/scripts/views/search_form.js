SlapFlightFe.SearchFormView = Ember.View.extend({
  templateName: 'search_form',

  didInsertElement: function() {
    var curDate = new Date();
    $('input,datepicker').datepicker({
      format: "yyyy-mm-dd",
      startDate: this.formatDate(curDate),
      todayBtn: "linked",
    });
  },

  formatDate: function(date) {
    return date.getFullYear() + "-" +
      ((date.getMonth() + 1 > 9) ? "" : "0") + (date.getMonth() + 1) + "-" +
      ((date.getDate() > 9) ? "" : "0") + (date.getDate());
  },
});
