'use strict';

var angular = require('angular');
require('angular-mocks');

var tnLoginToBetaModal = require('./tn-login-to-beta-modal.component');

describe('tnLoginToBetaModal component', function (){
	var $componentController;
	var ctrl;
	var $scope;
	var DS;
	var $uibModal;
	var deferred;

	var results = {
		"response": [{
			"headquarter ":"true",
			"officeHours":"12"
		}
		],
		res: []
	};
	beforeEach(function() {
		var moduleName = 'trinet.shared.components.tn-login-to-beta-modal';


		var mockDSService = function(){ return {}};
		var mock$uibModalService = function(){ return {}};
		angular
			.module(moduleName, [])
			.service('DS', mockDSService)
			.service('$uibModal', mock$uibModalService)
			.component('tnLoginToBetaModal', tnLoginToBetaModal);

		angular.mock.module(moduleName);
	});


	beforeEach(inject(function($rootScope, _$componentController_, $q, _DS_, _$uibModal_){
		$scope = $rootScope.$new();
		$componentController = _$componentController_;
		DS = _DS_;
		$uibModal = _$uibModal_;



		deferred = $q.defer();
		DS.update = jasmine.createSpy().and.returnValue(deferred.promise);
		DS.find = jasmine.createSpy().and.returnValue(deferred.promise);


		var locals = {
			$scope: $scope,
			DS: DS,

		};

		ctrl = $componentController('tnLoginToBetaModal', locals ,null);
		ctrl.modalInstance = {
			close: function () {
				return {};
			},
			dismiss: function () {
				return {};
			}
		}
	}));
	it('should set preference for beta',function() {
		ctrl.modalInstance = {
			close: jasmine.createSpy('modalInstance.close'),
			dismiss: jasmine.createSpy('modalInstance.dismiss')
		};
		ctrl.setBetaPreference();
		expect(DS.update).toHaveBeenCalled();
		deferred.resolve(results);
		$scope.$digest();
	});
	it('failed case',function() {
		ctrl.setBetaPreference();
		expect(DS.update).toHaveBeenCalled();
		var errorData = {
			data:{
				error: {message:"error"}
			}
		};
		deferred.reject(errorData);
		$scope.$digest();
	});
	it('should closeLoginToBetaModal ', function(){
		ctrl.modalInstance = {
			close: jasmine.createSpy('modalInstance.close'),
			dismiss: jasmine.createSpy('modalInstance.dismiss')
		};
       ctrl.closeLoginToBetaModal();
		expect(DS.find).toHaveBeenCalled();
		deferred.resolve(results);
		$scope.$digest();
		ctrl.noticeEvents = {
			length : 2
		}
	});

});
