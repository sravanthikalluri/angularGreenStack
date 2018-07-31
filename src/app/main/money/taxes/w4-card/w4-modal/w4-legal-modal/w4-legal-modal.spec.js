'use strict';

var angular = require('angular');
require('angular-mocks');

var w4LegalModal = require('./w4-legal-modal.component');

describe('w4LegalModal component', function () {

	var ctrl;
	var $scope;
	var deferred;
	var taxWithholdingForm;
	var mockData = {
	};

	beforeEach(function () {
		var moduleName = 'app.main.money.taxes.w4-card.w4-modal.w4-legal-modal';
		var mocktaxWithholdingForm = function () {
			return {}
		};
		var mock$state = function () {
			return{}
		};


		angular
			.module(moduleName, [])
			.service('taxWithholdingForm', mocktaxWithholdingForm)
			.service('$state', mock$state)
			.component('w4LegalModal', w4LegalModal);

		angular.mock.module(moduleName);
	});


	beforeEach(inject(function ($rootScope, $componentController, $q, $filter,_taxWithholdingForm_) {
		$scope = $rootScope.$new();
		deferred = $q.defer();
		taxWithholdingForm = _taxWithholdingForm_;

		//spy
		taxWithholdingForm.save =jasmine.createSpy().and.returnValue(deferred.promise);
		var locals = {
			$scope: $scope,
			$filter: $filter,
			taxWithholdingForm:taxWithholdingForm
		};

		ctrl = $componentController('w4LegalModal', locals, null);
	}));

	it('ctrl variables should be with mock data objects', function () {
		ctrl.resolve = {
			"data":{

			}
		};
		ctrl.data = {
			"substantialText":"",
			"affirmationText":""
		}
		ctrl.$onInit();
	});

	/*it('should close the modal when called', function () {
		ctrl.modalInstance = {
			close: jasmine.createSpy('modalInstance.close'),
			dismiss: jasmine.createSpy('modalInstance.dismiss')
		};
		ctrl.closeModal();
		expect(ctrl.modalInstance.dismiss).toHaveBeenCalledWith('cancel');
		expect(ctrl.modalInstance.close).toHaveBeenCalledWith('cancel');
	});*/

	it('should call the hideSPTest',function () {
		ctrl.hideSP = "";
		ctrl.hideSPTest();
	});
	it('should call the openSPTest',function () {
		ctrl.hideSP =true;
		ctrl.openSPTest();
	});
	/*it('should call the save',function () {
		ctrl.save();
		expect(taxWithholdingForm.save).toHaveBeenCalled();
		deferred.resolve(mockData);
		$scope.$digest();
	});

	it('should call the save else',function () {
		ctrl.save();
		expect(taxWithholdingForm.save).toHaveBeenCalled();
		deferred.reject(mockData);
		$scope.$digest();
	});*/

});
