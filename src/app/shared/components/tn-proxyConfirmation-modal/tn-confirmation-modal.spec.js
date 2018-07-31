'use strict';

var angular = require('angular');
require('angular-mocks');

var tnproxyConfirmationModal = require('./tn-confirmation-modal.component');

describe('tn-proxyconfirmation-modal component', function() {
	var $scope;
	var ctrl;
	var $state;


	beforeEach(function() {
		var mock$stateService = function(){
			return {
				go: function () {
					return {};
				}
			}
		};
		var moduleName = 'trinet.shared.components.tn-confirmation-modal';

		angular
			.module(moduleName, [])
			.service('$state',mock$stateService)
			.component('tnproxyConfirmationModal', tnproxyConfirmationModal);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function($rootScope, $componentController,_$state_) {
		var locals;
		$scope = $rootScope.$new();
		$state = _$state_;
		// Set up our dependencies to be injected into $componentController
		locals = {
			$scope: $scope,
		};

		// Initialize Component Controller
		ctrl = $componentController('tnproxyConfirmationModal', locals, null);
	}));
	it('should initilize the component',function() {

		ctrl.resolve= {
			"data":[
				{
					"message":"modal data message"
				}
			]
		};
		ctrl.$onInit();
	});
	it('should close the modal when called', function () {
		ctrl.modalInstance = {
			dismiss: jasmine.createSpy('modalInstance.dismiss')
		};
		ctrl.cancel();
	});
	it('should close the modal when called ok', function () {
		ctrl.modalInstance = {
			close: jasmine.createSpy('modalInstance.close'),
		};
		ctrl.ok();
	});
});

