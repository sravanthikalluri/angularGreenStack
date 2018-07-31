
'use strict';

var angular = require('angular');
require('angular-mocks');

var tnFutureModalController = require('./tn-future-modal.component');

describe('tn-future-modal component', function () {
	var ctrl;
	var $scope;
	var modalInstance;
	beforeEach(function () {

		var moduleName = 'app.shared.components.tn-future-details-card';
		angular
			.module(moduleName, [])
			.component('tnFutureModalController', tnFutureModalController);
		angular.mock.module(moduleName);
	});

	beforeEach(inject(function ($rootScope, $componentController) {
		$scope = $rootScope.$new();
		$scope.modalInstance = {                    // Create a mock object using spies
			close: jasmine.createSpy('$scope.modalInstance.close'),
			dismiss: jasmine.createSpy('$scope.modalInstance.dismiss'),
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
		};
		ctrl = $componentController('tnFutureModalController', locals, null);
	}));
	it('ctrl variables should be with mock data objects',function(){
		ctrl.resolve= {"data":"data"}
		ctrl.$onInit();
	});
	it('should cancel the modal',function() {
		ctrl.modalInstance= {
			dismiss : function()
			{ }
		};
		ctrl.cancel();
		$scope.$digest();
	});
	it('should on the modal',function() {
		ctrl.modalInstance= {
			close : function()
			{ }
		};
		ctrl.ok();
		$scope.$digest();
	});

});
