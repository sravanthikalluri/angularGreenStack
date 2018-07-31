
'use strict';

var angular = require('angular');
require('angular-mocks');

var tnViewNoticesModalController = require('./tn-browser-modal.component');

describe('tn-browser-modal component', function () {
	var ctrl;
	var $scope;
	var modalInstance;
	beforeEach(function () {

		var moduleName = 'app.shared.components.tn-browser-modal';
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
		ctrl = $componentController('tnViewNoticesModalController', locals, {
			resolve : { data : "data"}
		});
	}));
	it('ctrl variables should be with mock data objects',function(){

		ctrl.data = [{
            item : ""
		}];
		ctrl.$onInit();
	});
	it('should cancel the modal',function() {
		ctrl.modalInstance= {
			dismiss : function()
			{

			}
		};
		ctrl.cancel();
		$scope.$digest();
	});
	it('should save Edit Account',function() {
		ctrl.modalInstance= {
			dismiss : function()
			{

			}
		};
		var item = {}
		ctrl.popUpDataCtrl(item);
	});

});
