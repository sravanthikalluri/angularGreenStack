
'use strict';

var angular = require('angular');
require('angular-mocks');

var tnBenefitsStandardSecurityController = require('./benefits-std-security.component');

describe('benefits-std-security component', function () {
	var ctrl;
	var $scope;
	var modalInstance;
	var DS;
	var $location;
	var gso;
	beforeEach(function () {

		var moduleName = 'app.main.benefits.resources.optional-benefits.benefits-std-security';
    var mockDSService = function () {
		return {};
	};

    var mockgso = function () {
		return {};
	};

    var mock$location = function () {
		return {};
	};

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('gso',mockgso)
			.service('$location',mock$location)
			.component('tnBenefitsStandardSecurityController', tnBenefitsStandardSecurityController);
		angular.mock.module(moduleName);
	});

	beforeEach(inject(function ($rootScope, $componentController,_DS_,_gso_,_$location_) {
		$scope = $rootScope.$new();
		DS=_DS_;
		gso=_gso_;
		$location=_$location_;
		$scope.modalInstance = {                    // Create a mock object using spies
			dismiss: jasmine.createSpy('$scope.modalInstance.dismiss'),
			close: jasmine.createSpy('$scope.modalInstance.close'),
		};
		$scope.$digest();
		$scope.resolve = {
			modalData:{
				update:jasmine.createSpy('$scope.resolve.modalData.update'),
			}
		};
		var locals = {
			$scope: $scope,
			$modalInstance: modalInstance,
			DS:DS,
			gso:gso,
			$location:$location
		};
		ctrl = $componentController('tnBenefitsStandardSecurityController', locals, null);
	}));

	it('should closeModal',function() {
		ctrl.modalInstance = {
			dismiss: function(cancel) {

			},
			close: function(cancel) {

			}
		};
		ctrl.closeModal()
		$scope.$digest();
	});

});
