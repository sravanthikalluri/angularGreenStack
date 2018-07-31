

'use strict';

var angular = require('angular');
require('angular-mocks');

var tneditAccountModal = require('./edit-account-modal-popup.component');

describe('edit-account-modal-popup component', function () {
	var ctrl;
	var $scope;
	var modalInstance;
	beforeEach(function () {
		var moduleName = 'app.main.money.direct-deposit.edit-account-table.edit-account-modal-popup';
		angular
			.module(moduleName, [])
			.component('tneditAccountModal', tneditAccountModal);
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
		ctrl = $componentController('tneditAccountModal', locals, null);
	}));
	it('ctrl variables should be with mock data objects',function(){
		ctrl.resolve= {"data":"data"}
		ctrl.$onInit();
	});
	it('should cancel the modal',function() {
		ctrl.modalInstance= {
			dismiss : function()
			{

			}
		}
		ctrl.cancel();
		$scope.$digest();
	});
	it('should save Edit Account',function() {

		ctrl.resolve =
			{
				modalData:{
					update : function (p1) {

					}

				}
			};
		ctrl.modalInstance= {
			close : function()
			{

			}
		};
		ctrl.saveEditAccount();
		$scope.$digest();
	});
	it('should disable save button',function() {
		ctrl.modalData = {
			'accountNumber': '123654',
			'routingNumber':'1256',
			'accountType':'Savings'
		};
		ctrl.disableSaveBtn();
	});
});
