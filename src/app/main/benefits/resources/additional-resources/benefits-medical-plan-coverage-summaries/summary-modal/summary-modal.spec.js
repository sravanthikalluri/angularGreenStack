'use strict';

var angular = require('angular');
require('angular-mocks');

var summaryModal = require('./summary-modal.component');

describe('summary-modal component', function () {
var ctrl;
var $scope;
	var obj = {
		'$componentController': '$componentController',
		'ctrl': 'ctrl',
		'$scope': '$scope',

		moduleName: 'trinet.main.benefits.resources.additional-resources.benefits-medical-plan-coverage-summaries.summary-modal',
		locals: {}
	};
	beforeEach(function () {

		angular
			.module(obj.moduleName, [])
			.component('summaryModal', summaryModal);
		angular.mock.module(obj.moduleName);
	});
	beforeEach(inject(function ($rootScope, $componentController) {
		$scope = $rootScope.$new();
		var modalInstance = {                    // Create a mock object using spies
			close: jasmine.createSpy('$scope.modalInstance.close'),
			dismiss: jasmine.createSpy('$scope.modalInstance.dismiss'),
		};
		$scope.$digest();
		$scope.resolve = {
			modalObject:{
				pane:jasmine.createSpy('$scope.resolve.modalObject'),
			},
			modalData:{
				planModelValue :jasmine.createSpy('$scope.resolve.modalData.sbcValue'),
			}
		};
		var locals = {
			$scope: $scope,
			$modalInstance: modalInstance,
		};
		ctrl = $componentController('summaryModal', locals, {
			resolve:{
				modalData: {},
				modalObject: {sbcValue : ""}
			},
			modalInstance:{
				dismiss:function(cancel) {
					return {};
				},
				close:function(cancel) {
					return {};
				}
			},

		});

	}));

	it('summary modal init() ',function(){
		ctrl.$onInit();
	});

	it('should closeModal', function () {
		ctrl.closeModal();
	});
	it('should closeModal', function () {
		ctrl.closeModal();
	});


});


