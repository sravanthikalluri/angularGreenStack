'use strict';

var angular = require('angular');
var moduleName = 'app.main.public-profile';
/*var modules = [
	require('./tn-profile-work'),
	require('./tn-profile-personal'),
	require('./tn-profile-emergency')
];*/

module.exports = moduleName;

angular.module(moduleName,[])
	.component('publicProfile', require('./public-profile.component'));
