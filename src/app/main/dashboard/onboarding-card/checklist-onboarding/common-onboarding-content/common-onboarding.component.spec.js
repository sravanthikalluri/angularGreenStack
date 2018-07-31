
'use strict';

var angular = require('angular');
require('angular-mocks');

var tnCommonOnboardingController = require('./common-onboarding.component');

describe('common-onboarding component', function () {
	var ctrl;
	var $scope;
	var DS;
	var $http;
	var manageEmpUrlConfig;
	var $state;
	var $translate;
	var $uibModal;
	var $window;
	var deferred;
	var response = function () {
		return {
			"data": "data"
		}
	};
	 var error = function () {
		 return {
		 	"data":"data"
		 }
	 };
	 var result = function () {
		 return {
		 	"data" : "data"
		 }
	 };
	beforeEach(function () {

		var moduleName = 'app.main.dashboard.onboarding-card.checklist-onboarding.common-onboarding-content';
		var mockDSService = function() {
			return {

			}
		};
		var mock$http = function() {
			var url = '';
			return {
				get:function() {
					return {}
				},
				/*   post : function() {
                                 return {};
                             },
                              put : function(url) {
                                    return {};
                              }*/
			}
		}
		var mockmanageEmpUrlConfig = function() {
			return {
				manageBaseUrl:'',
				resources: {
					payroll:'',
					wtpa:''
				},

			};
		}
		var mock$state = function() {
			return {
				go:function(){

				}
			};
		}
		var mock$translate = function(){
			return {};
		}
		var mock$uibModal = function() {
			return {};
		}
		var mock$window = function() {
			return {
				sessionStorage: {
					companyId:'',
					empId:'',

				}
			};
		}
		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('$http',mock$http)
			.service('manageEmpUrlConfig',mockmanageEmpUrlConfig)
			.service('$state',mock$state)
			.service('$translate',mock$translate)
			.service('$uibModal',mock$uibModal)
			.service('$window',mock$window)
			.component('tnCommonOnboardingController', tnCommonOnboardingController);
		angular.mock.module(moduleName);
	});

	beforeEach(inject(function ($rootScope, $componentController,_DS_,_$http_,_manageEmpUrlConfig_,_$state_,
								_$translate_,_$uibModal_,_$window_,$q) {
		$scope = $rootScope.$new();
		DS=_DS_;
		$http = _$http_;
		manageEmpUrlConfig = _manageEmpUrlConfig_;
		$state = _$state_;
		$translate =_$translate_;
		$uibModal = _$uibModal_;
		$window =_$window_;
		deferred = $q.defer();
		DS.update = jasmine.createSpy('onboarding-post-task','',{},{}).and.returnValue(deferred.promise);
		$http.get = jasmine.createSpy('',{}).and.returnValue(deferred.promise);
		$http.put =  jasmine.createSpy('').and.returnValue(deferred.promise);
		$translate = jasmine.createSpy(['','','']).and.returnValue(deferred.promise);
		$uibModal.open = jasmine.createSpy().and.returnValue(deferred.promise);
		$uibModal.open.result = jasmine.createSpy().and.returnValue(deferred.promise);
		var locals = {
			$scope: $scope,
			DS:DS,
			$http:$http,
			manageEmpUrlConfig:manageEmpUrlConfig,
			$state:$state,
			$translate:$translate,
			$uibModal:$uibModal,
			$window:$window

		};
		ctrl = $componentController('tnCommonOnboardingController', locals, null);
	}));
	it('it should skip the onboarding task for component',function(){
		ctrl.data = {
			'completionDate':'',
			onboardTask:''
		};
		ctrl.skip();
		expect(DS.update).toHaveBeenCalled();
		deferred.resolve({});
		$scope.$digest();
	});
	it('should show error',function() {
		ctrl.data = {
			'completionDate':'',
			onboardTask:''
		};
		ctrl.showError('error');
	});
	it('should redirect the page to money-taxes',function() {
		ctrl.taskName = 'canadian-tax-credit';
		ctrl.redirectPage();
	});
	it('should redirect the page to money-resources',function() {
		ctrl.taskName = 'canadian-benefits-1';
		ctrl.redirectPage();
	});
	it('should redirect the page to money-resources',function() {
		ctrl.taskName = 'canadian-benefits-2';
		ctrl.redirectPage();
	});
	it('should redirect the page to money-taxes',function() {
		ctrl.taskName = 'canadian-benefits-3';
		ctrl.redirectPage();
	});
	it('should redirect the page to money-taxes',function() {
		ctrl.taskName = 'direct-deposit';
		ctrl.redirectPage();
	});
	it('should redirect the page to money-taxes',function() {
		ctrl.taskName = 'emergency';
		ctrl.redirectPage();
	});
	it('should redirect the page to money-taxes',function() {
		ctrl.taskName = 'profile';
		ctrl.data = {
			'completionDate':'',
			onboardTask:''
		};
		ctrl.redirectPage();
		expect(DS.update).toHaveBeenCalled();
		deferred.resolve({});
		$scope.$digest();
	});
	it('should redirect the page to money-taxes',function() {
		ctrl.taskName = 'tax-withholding';
		ctrl.data = {
			'completionDate':'',
			onboardTask:''
		};
		ctrl.redirectPage();
		expect(DS.update).toHaveBeenCalled();
		deferred.resolve({});
		$scope.$digest();
	});
	it('should open a PDF',function() {
		ctrl.taskName = 'wtpa';
		ctrl.redirectPage();
	});

	  it('should open a modal',function() {
	  ctrl.taskName = 'wtpa';
	  ctrl.showModal('');
	  expect($translate).toHaveBeenCalled();
	  deferred.resolve(result);
	  $scope.$digest();
	 });

	it('should getPdfViewer with response ',function() {
		ctrl.taskName == 'wtpa';
		ctrl.getPdfViewer ();
	});
	it(' should getPdfViewer with reject ',function() {
		ctrl.taskName == 'wtpa';
		ctrl.getPdfViewer ();
	});

});
