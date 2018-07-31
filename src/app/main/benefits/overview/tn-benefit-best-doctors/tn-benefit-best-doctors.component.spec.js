'use strict';

var angular = require('angular');
require('angular-mocks');

var tnBenefitBestDoctors = require('./tn-benefit-best-doctors.component');

describe('Tn Benefit Best Doctors component', function (){
	var $componentController;
	var ctrl;
	var $scope;
	var timeout;

	beforeEach(function() {
		var moduleName = 'app.main.benefits.overview';

		var mock$timeoutService = function(){ };
		angular
			.module(moduleName, [])
			.component('tnBenefitBestDoctors', tnBenefitBestDoctors);

		angular.mock.module(moduleName);
	});


	beforeEach(inject(function($rootScope, _$componentController_, $q, _$timeout_){
		$scope = $rootScope.$new();
		$componentController = _$componentController_;
		timeout = _$timeout_;
		var locals = {
			$scope: $scope,
			$timeout: timeout
		};

		ctrl = $componentController('tnBenefitBestDoctors', locals ,null);
	}));

	it('should test $timeout', inject(function ($timeout) {
		$timeout.flush();
	}));

	it('$onInit function test ', function () {
		ctrl.$onInit();
	});

	it('openPdf function test ', function () {
		ctrl.openPdf();
	});

});

