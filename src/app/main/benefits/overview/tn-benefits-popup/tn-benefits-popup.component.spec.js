'use strict';

var angular = require('angular');
require('angular-mocks');

var tnBenefitsPopup = require('./tn-benefits-popup.component');

describe('benefit-options', function (){
	var $componentController;
	var ctrl;
	var $scope;
	beforeEach(function() {
		var moduleName = 'app.main.benefits.overview';
		angular
			.module(moduleName, [])
			.component('tnBenefitsPopup', tnBenefitsPopup);

		angular.mock.module(moduleName);
	});


	beforeEach(inject(function($rootScope, _$componentController_){
		$scope = $rootScope.$new();
		$componentController = _$componentController_;
		var locals = {
			$scope: $scope
		};

		ctrl = $componentController('tnBenefitsPopup', locals ,null);
	}));

	it('should test $timeout', inject(function ($timeout) {
		$timeout.flush();
	}));

	it('$onInit function test ', function () {
		ctrl.$onInit();
	});

	it('goToSSO function test ', function () {
		ctrl.goToSSO();
	});

});

