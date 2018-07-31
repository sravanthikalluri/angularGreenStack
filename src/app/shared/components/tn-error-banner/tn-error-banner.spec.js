'use strict';

var angular = require('angular');
require('angular-mocks');

var tnErrorBanner = require('./tn-error-banner.component');

describe('tn-company-name component', function() {
	var $scope;
	var ctrl;

	beforeEach(function() {

		var moduleName = 'trinet.shared.components.tn-error-banner';

		angular
			.module(moduleName, [])
			.component('tnErrorBanner', tnErrorBanner);

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
		ctrl = $componentController('tnErrorBanner', locals, null);
	}));
	it('should enable a close alert',function() {
		ctrl.closeAlert();
	});
});


