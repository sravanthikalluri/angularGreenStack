
'use strict';

var angular = require('angular');
require('angular-mocks');

var securityModalConfig = require('./security-modal-config.constant');

describe('security-modal-config component', function() {
	var obj = {
		'ctrl': 'ctrl',
		'$scope': '$scope',
		moduleName : 'trinet.main.settings.security-card',
	}
	beforeEach(function() {
		angular
			.module(obj.moduleName, [])
			.component('securityModalConfig', securityModalConfig);

		angular.mock.module(obj.moduleName);
	});

	beforeEach(inject(function($q, $rootScope, $componentController) {


		obj['$scope'] = $rootScope.$new();

		obj['ctrl'] = $componentController('securityModalConfig',  null);
	}));

	it('shoud not cause unit test error', angular.mock.inject(function () {
		expect(true).toBe(true);
	}));


});


