SlapFlightFe.Router.map(function () {
  this.resource('search', { path: '/search' });
  this.resource('search', { path: '/search/:origin/:destination/:from/:to' });
});
