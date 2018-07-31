'use strict';

var angular = require('angular');
require('angular-mocks');

var tnSmallEmployeeCard = require('./tn-small-employee-card.component');

describe('tn-small-employee-card component', function () {
	var obj = {
		'$componentController': '$componentController',
		'ctrl': 'ctrl',
		'$scope': '$scope',
		moduleName: 'trinet.core.components.tn-small-employee-card',
		locals: {},
	};

	beforeEach(function () {
		angular
			.module(obj.moduleName, [])
			.component('tnSmallEmployeeCard', tnSmallEmployeeCard);

		angular.mock.module(obj.moduleName);
	});

	beforeEach(inject(function ($rootScope, _$componentController_) {
		obj['$scope'] = $rootScope.$new();
		obj['$componentController'] = _$componentController_;
		// Set up our dependencies to be injected into $componentController
		obj.locals = {
			$scope: obj['$scope'],
		};

		// Initialize Component Controller
		obj['ctrl'] = obj['$componentController']('tnSmallEmployeeCard', obj.locals, null);
	}));

	it('ctrl variables should be initialized ', function() {
		obj['ctrl'].$onInit();
	});


});

