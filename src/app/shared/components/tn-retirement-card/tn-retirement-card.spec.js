'use strict';

var angular = require('angular');
require('angular-mocks');

var tnRetirementCard = require('./tn-retirement-card.component');

describe('tn-retirement-cardcomponent', function() {
	var $scope;
	var ctrl;


	beforeEach(function() {

		var moduleName = 'trinet.shared.components.tn-retirement-card';

		angular
			.module(moduleName, [])
			.component('tnRetirementCard', tnRetirementCard);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function($rootScope, $componentController) {
		var locals;
		$scope = $rootScope.$new();

		// Set up our dependencies to be injected into $componentController
		locals = {
			$scope: $scope,

		};

		// Initialize Component Controller
		ctrl = $componentController('tnRetirementCard', locals, null);
	}));
	it('Should initilize the component',function() {
		expect(true).toBe(true);
	});
});

