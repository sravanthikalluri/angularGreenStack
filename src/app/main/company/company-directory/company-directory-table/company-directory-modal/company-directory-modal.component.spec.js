'use strict';

var angular = require('angular');
require('angular-mocks');

var tnCompanyDirectoryModal = require('./company-directory-modal.component');

describe('tn-company-directory-modal component', function() {
	var $scope;
	var ctrl;
	var $state;
	var DS;

	beforeEach(function() {

		var moduleName = 'trinet.main.company.tn-company-directory-modal';
		var mock$state = function () {
			return {
				go: function () {

				}
			}
		};
		var mockDSService = function () {
			return {


				}
		};


		angular
			.module(moduleName, [])
			.service('$state', mock$state)
			.service('DS',mockDSService)
			.component('tnCompanyDirectoryModal', tnCompanyDirectoryModal);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function($rootScope, $componentController,$state,_DS_) {
		var locals;
		$scope = $rootScope.$new();
		DS=_DS_;

		// Set up our dependencies to be injected into $componentController
		locals = {
			$scope: $scope,
			$state:$state,
			DS:DS
		};

		// Initialize Component Controller
		ctrl = $componentController('tnCompanyDirectoryModal', locals, null);
	}));
	it('should initilize the controller',function() {
		ctrl.$onInit();
	});
	it('should close the modal',function() {
		ctrl.closeModal();
		expect(ctrl.show).toBeFalsy();
	});
	it('should navigate to desired page',function() {
		ctrl.profile();
		/*expect(ctrl.$state.go).toEqual('app.main.profile');*/
	});

});

