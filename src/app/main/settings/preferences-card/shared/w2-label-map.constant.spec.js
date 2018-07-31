'use strict';

var angular = require('angular');
require('angular-mocks');

var w2LabelMap= require('./w2-label-map.constant');

describe('w2-label-map component', function() {
	var obj = {
		'ctrl': 'ctrl',
		'$scope': '$scope',
		moduleName : 'trinet.main.settings.preferences-card',
	}
	beforeEach(function() {
		angular
			.module(obj.moduleName, [])
			.component('w2LabelMap', w2LabelMap);

		angular.mock.module(obj.moduleName);
	});

	beforeEach(inject(function($q, $rootScope, $componentController) {


		obj['$scope'] = $rootScope.$new();

		obj['ctrl'] = $componentController('w2LabelMap',  null);
	}));

	it('shoud not cause unit test error', angular.mock.inject(function () {
		expect(true).toBe(true);
	}));


});
