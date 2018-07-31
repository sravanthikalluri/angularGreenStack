/*

'use strict';

var angular = require('angular');
require('angular-mocks');

var trustedDevicesTable = require('./trusted-devices-table.component');

describe('trusted-devices-table component', function() {
	var obj = {
		'ctrl': 'ctrl',
		'$scope': '$scope',
		moduleName : 'trinet.main.settings.mfa-card',
	}
	beforeEach(function() {
		angular
			.module(obj.moduleName, [])
			.component('trustedDevicesTable', trustedDevicesTable);

		angular.mock.module(obj.moduleName);
	});

	beforeEach(inject(function($q, $rootScope, $componentController) {


		obj['$scope'] = $rootScope.$new();

		obj['ctrl'] = $componentController('trustedDevicesTable',  null);
	}));

	it('shoud not be error', angular.mock.inject(function () {
		expect(true).toBe(true);
	}));


});


*/
