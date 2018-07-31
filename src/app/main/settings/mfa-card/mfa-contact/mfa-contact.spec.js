/*

'use strict';

var angular = require('angular');
require('angular-mocks');

var mfaContactComponent = require('./mfa-contact.component');

describe('mfa-contact.component component', function() {
	var obj = {
		'ctrl': 'ctrl',
		'$scope': '$scope',
		moduleName : 'trinet.main.settings.mfa-card',
	}
	beforeEach(function() {
		angular
			.module(obj.moduleName, [])
			.component('mfaContactComponent', mfaContactComponent);

		angular.mock.module(obj.moduleName);
	});

	beforeEach(inject(function($q, $rootScope, $componentController) {


		obj['$scope'] = $rootScope.$new();

		obj['ctrl'] = $componentController('mfaContactComponent',  null);
	}));

	it('shoud not cause unit test error', angular.mock.inject(function () {
		expect(true).toBe(true);
	}));


});


*/
