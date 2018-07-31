'use strict';

var angular = require('angular');
require('angular-mocks');

var tnCard = require('./tn-card.component');

describe('tn-card component', function () {
	var obj = {
		'$componentController': '$componentController',
		'ctrl': 'ctrl',
		'$scope': '$scope',
		moduleName: 'trinet.core.components.tn-card',
		locals: {}
	};

	beforeEach(function () {
		angular
			.module(obj.moduleName, [])
			.component('tnCard', tnCard);

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
		obj['ctrl'] = obj['$componentController']('tnCard', obj.locals, null);
	}));

	it('ctrl variables should be initialized ', inject(function ($timeout) {

		obj['ctrl'].$onInit();
		$timeout.flush();
	}));
	it('$onChanges function ', function() {

		obj['ctrl'].$onChanges();
	});


});

