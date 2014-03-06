SlapFlightFe.ReturnSelector = Ember.View.extend({
  templateName: 'return_selector',

  click: function(evt) {
    // show return
    if (evt.target.id == 'label-return' && !$('#label-return').hasClass('active'))
      this.get('controller').send('showReturn', true);
    // hide return
    else if (evt.target.id == 'label-one-way' && !$('#label-one-way').hasClass('active')) {
      // move to depart tab
      $('#tab-trip-listing a:first').tab('show')
      this.get('controller').send('showReturn', false);
    }
  }
});
