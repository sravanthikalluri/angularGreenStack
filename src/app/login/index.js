var angular = require('angular');
var moduleName = 'login';

module.exports = moduleName;

angular.module(moduleName, [])
  .component('login', require('./login.component'));
