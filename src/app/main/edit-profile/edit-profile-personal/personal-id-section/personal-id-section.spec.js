'use strict';

var angular = require('angular');
require('angular-mocks');

var personalIdSection = require('./personal-id-section.component');

describe('personal id section component', function () {
	var $scope;
	var ctrl;
	var deferred;
	var $uibModal;
	var mockData = {};

	beforeEach(function () {

		var moduleName = 'trinet.main.benefits.personal-id-section';
		var mockUIBModalService = function () {
			return {
				open: function () {
					return {
						result: ''
					}
				}
			}
		};

		angular
			.module(moduleName, [])
			.service('$uibModal', mockUIBModalService)
			.component('personalIdSection', personalIdSection);
		angular.mock.module(moduleName);
	});
	beforeEach(inject(function ($rootScope, $componentController, _$uibModal_, $q) {
		var locals;
		deferred = $q.defer();
		$scope = $rootScope.$new();

		$uibModal = _$uibModal_;
		// Set up our dependencies to be injected into $componentController
		locals = {
			$scope: $scope,
			$uibModal: $uibModal,

		};

		// Initialize Component Controller
		ctrl = $componentController('personalIdSection', locals, null);

		ctrl.confirm = jasmine.createSpy().and.returnValue(deferred.promise);
		ctrl.onUpdate = function () {
		}
	}));
	it('should initailize the controller', function () {
		ctrl.data = {
			selected: {
				ethnicity: {
					key: ""
				}
			}
		};


		ctrl.$onInit();

	});
	it('should initailize the controller', function () {
		ctrl.onUpdate = function () {
		};
		ctrl.update('foo', 'bar');

	});
	it('checkEthnicity function', function () {
		ctrl.data = {
			dropdown: {
				ethnicities: [
					{key: 'NSPEC'}
				]
			},
			selected: {
				ethnicity: {
					key: "NSPEC"
				}
			}
		};
		ctrl.formName = {};
		ctrl.formName.$setPristine = function () {
		};
		ctrl.$onInit();
		ctrl.checkEthnicity();

		expect(ctrl.confirm).toHaveBeenCalled();
		deferred.resolve({});
		$scope.$digest();


	});

	it('checkEthnicity function', function () {
		ctrl.data = {
			dropdown: {
				ethnicities: [
					{key: 'NSPEC'}
				]
			},
			selected: {
				ethnicity: {
					key: "NSPEC"
				}
			}
		};
		ctrl.$onInit();
		ctrl.checkEthnicity();

		expect(ctrl.confirm).toHaveBeenCalled();
		deferred.reject({});
		$scope.$digest();


	});

	it('confirm function', function () {
		ctrl.confirm();
		expect(ctrl.confirm).toHaveBeenCalled();
		deferred.resolve({});
		$scope.$digest();
	});

	it('should log after timeout', inject(function ($timeout) {
		ctrl.data = {
			selected: {
				ethnicity: {
					key: "NSPEC"
				}
			}
		};
		ctrl.formName =
			{
				personalIdSectionForm: {
					$setPristine: function () {

					}
				},
				$setPristine: function () {
					return {};
				}
			};
		ctrl.$onInit();
		$timeout.flush();


	}));


});


