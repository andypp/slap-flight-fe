document.write('<div id="ember-testing-container"><div id="ember-testing"></div></div>');

Ember.testing = true;
SlapFlightFe.rootElement = "#ember-testing";
SlapFlightFe.setupForTesting();
SlapFlightFe.injectTestHelpers();

function exists(selector) {
  return !!find(selector).length;
}
