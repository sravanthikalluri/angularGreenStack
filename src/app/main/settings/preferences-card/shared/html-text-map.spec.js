'use strict';

var angular = require('angular');
require('angular-mocks');

var htmlTextMap= require('./html-text-map.constant');

describe('html-text-map component', function() {
	var obj = {
		'ctrl': 'ctrl',
		'$scope': '$scope',
		moduleName : 'trinet.main.settings.preferences-card',
	}
	beforeEach(function() {
		angular
			.module(obj.moduleName, [])
			.component('htmlTextMap', htmlTextMap);

		angular.mock.module(obj.moduleName);
	});

	beforeEach(inject(function($q, $rootScope, $componentController) {


		obj['$scope'] = $rootScope.$new();

		obj['ctrl'] = $componentController('htmlTextMap',  null);
	}));

	it('shoud not cause unit test error', angular.mock.inject(function () {
		expect(true).toBe(true);
	}));


});
