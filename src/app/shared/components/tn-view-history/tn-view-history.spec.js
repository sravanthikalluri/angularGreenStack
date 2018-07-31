'use strict';

var angular = require('angular');
require('angular-mocks');

var tnViewHistory = require('./tn-view-history.component');

describe('tn-view-history component', function() {
	var $scope;
	var ctrl;


	beforeEach(function() {

		var moduleName = 'trinet.shared.components.tn-view-history';

		angular
			.module(moduleName, [])
			.component('tnViewHistory', tnViewHistory);

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
		ctrl = $componentController('tnViewHistory', locals, null);
	}));
	it('should initilize the component',function() {
		ctrl.$onInit();
		/*expect(ctrl.openViewHistory).toFalsy();*/
	});
});

