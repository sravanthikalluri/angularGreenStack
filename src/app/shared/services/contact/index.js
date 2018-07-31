/**
 * Created by lhchough on 9/14/16.
 */
/**
 * Created by lhchough on 9/14/16.
 */
'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.services.contact';

module.exports = moduleName;

angular.module(moduleName, [])
	.service('Contact', require('./contact.service.js'));
