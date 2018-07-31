'use strict';

var angular = require('angular');
require('angular-mocks');

var tnCompanyName = require('./tn-company-name.component');

describe('tn-company-name component', function() {
	var $scope;
	var ctrl;


	beforeEach(function() {

		var moduleName = 'trinet.shared.components.tn-company-name';

		angular
			.module(moduleName, [])
			.component('tnCompanyName', tnCompanyName);

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
		ctrl = $componentController('tnCompanyName', locals, null);
	}));



	it('should return logoClassName',function() {
		ctrl.logoUrl='folder/images/img.png';
		var logoUrlPath = ctrl.logoUrl.split('/');

		ctrl.getCompanyLogoClass();
	});

	it('should goToSSOLink  and provider name is UHC' ,function () {
		ctrl.providerName = "UHC";
		ctrl.goToSSOLink();
	});
	it('should goToSSOLink  and provider name is Aetna' ,function () {
		ctrl.providerName = "Aetna";
		ctrl.goToSSOLink();
	});
	it('should goToSSOLink  and provider name is MetLife' ,function () {
		ctrl.providerName = "MetLife";
		ctrl.goToSSOLink();
	});


});

