module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['qunit'],
    plugins: [
      'karma-qunit',
      'karma-phantomjs-launcher'
    ],
    files: [
      'app/bower_components/jquery/jquery.min.js',
      'app/bower_components/handlebars/handlebars.runtime.js',
      'app/bower_components/bootstrap-datepicker/js/bootstrap-datepicker.js',
      'app/bower_components/ember/ember.js',
      'app/bower_components/ember-data/ember-data.js',
      'app/bower_components/jquery-mockjax/jquery.mockjax.js',

      '.tmp/scripts/combined-scripts.js',
      '.tmp/scripts/compiled-templates.js',

      'test/support/init.js',
      'test/spec/*.js',
      'test/integration/*.js'
    ],
    exclude: [],
    reporters: ['progress'],
    port: 9876,
    runnerPort : 9100,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    captureTimeout : 60000,
    singleRun: true
  });
};
