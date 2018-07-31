
'use strict';

var angular = require('angular');
require('angular-mocks');

var tnViewNoticesModalController = require('./view-notices-modal');

describe('view-notices-modal', function () {
	var ctrl;
	var $scope;
	var modalInstance;
	beforeEach(function () {

		var moduleName = 'app/shared/components/important-notices-card/view-notice-modal';
		angular
			.module(moduleName, [])
			.component('tnViewNoticesModalController', tnViewNoticesModalController);
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
		ctrl = $componentController('tnViewNoticesModalController', locals, null);
	}));
	it('ctrl variables should be with mock data objects',function(){
		ctrl.resolve= {"data":"data"}
		ctrl.$onInit();
	});
	it('should cancel the modal',function() {
		ctrl.modalInstance= {
			dismiss : function(cancel)
			{

			}
		};
		ctrl.cancel();
		$scope.$digest();
	});
	it('should getBodyParseValue',function() {
		var value = 'sdf14';
		ctrl.getBodyParseValue(value);
		$scope.$digest();
	});
	/*it('should getPriority button',function() {
		var key = " ", item= " ";
		item.priority = {
			toString : function () {

			}
		};
		ctrl.getPriority(key,item);
	});*/
});
