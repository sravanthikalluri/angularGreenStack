'use strict';

var angular = require('angular');
require('angular-mocks');

var tnEformsAcknowledgementModalController = require('./tn-eforms-acknowledgement-modal.component');

describe('tn-eforms-acknowledgement-modal component', function() {
	var $scope;
	var ctrl;
	var $sce, $filter, $state;
	var innerFilterSpy;


	beforeEach(function() {

		var moduleName = 'trinet.shared.components.tn-eforms-acknowledgement-modal';

		var mock$sce = function () {
			return {
				trustAsHtml : function (text) {

				}
			}

		};
		var mock$filter = function () {

		};
		var mock$state = function () {
			return {
				go : function () {

				}
			}

		};

		angular
			.module(moduleName, [])
			.service('$sce',mock$sce)
			.service('$filter',mock$filter)
			.service('$state',mock$state)
			.component('tnEformsAcknowledgementModalController', tnEformsAcknowledgementModalController);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function($rootScope, $componentController , _$sce_,_$filter_,_$state_ ){
		var locals;
		$scope = $rootScope.$new();
		$sce=_$sce_;
		$filter=_$filter_;
		$state=_$state_;

		innerFilterSpy = jasmine.createSpy();
		$filter = jasmine.createSpy().and.returnValue(innerFilterSpy);

		// Set up our dependencies to be injected into $componentController
		locals = {
			$scope: $scope,
			$sce:$sce,
			$filter:$filter,
			$state :$state,

		};

		// Initialize Component Controller
		ctrl = $componentController('tnEformsAcknowledgementModalController', locals, null);
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
		ctrl.closeModal();
		$scope.$digest();
	});
	it('should format Confirmation Message',function() {
		ctrl.formatConfirmationMessage();
		expect($filter).toHaveBeenCalledWith('translate');
		expect(innerFilterSpy).toHaveBeenCalledWith('eformsAcknowledgement.modalPopUpMessage');
		expect(innerFilterSpy).toHaveBeenCalledWith('eformsAcknowledgement.modalPopUpHere');
	});
	it('should go To Acknowledgements',function() {
		ctrl.modalInstance= {
			dismiss : function()
			{

			}
		}
		ctrl.goToAcknowledgements();
		$scope.$digest();
	});

});

