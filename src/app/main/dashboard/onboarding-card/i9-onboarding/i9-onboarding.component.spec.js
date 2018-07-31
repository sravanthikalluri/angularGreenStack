'use strict';
var angular = require('angular');
require('angular-mocks');
var i9OnboardingCardController = require('./i9-onboarding.component');

describe('i9-boarding-card component', function (){
	var $componentController;
	var ctrl;
	var $scope;
	var DS;
	var roleService;
	var ssoModalLinksConfig;
	var $uibModal;
    var $window;
    var SharedDataService;
    var deferred;
	beforeEach(function() {
		var moduleName = 'app.main.dashboard.onboarding-card.i9-onboarding';
		var mockDSService = function(){ return {}};
	   var mockroleService = function() {
	   	return {};
	   }
	   var mockssoModalLinksConfig = function() {
	   	return {
	   		keywords:['sso'],
		}
	   }
	   var mock$uibModal = function() {
	   	return {}
	   }
	   var mock$window = function() {
	   	return {};
	   }
	   var mockSharedDataService = function() {
	   	return {
			getAppSharedData:function(){
				return {
					suppressRedirectModal:''
				}
			}
		}
	   }
		angular
			.module(moduleName, [])
			.service('DS', mockDSService)
			.service('roleService',mockroleService)
			.service('ssoModalLinksConfig',mockssoModalLinksConfig)
			.service('$uibModal',mock$uibModal)
			.service('$window',mock$window)
			.service('SharedDataService',mockSharedDataService)
			.component('i9OnboardingCardController', i9OnboardingCardController);
		angular.mock.module(moduleName);
	});

	beforeEach(inject(function($rootScope, _$componentController_, $q, _DS_,_roleService_,_ssoModalLinksConfig_,_$uibModal_,_$window_,_SharedDataService_){
		$scope = $rootScope.$new();
		$componentController = _$componentController_;
		DS = _DS_;
		roleService = _roleService_;
		ssoModalLinksConfig = _ssoModalLinksConfig_;
		$uibModal =_$uibModal_;
		$window= _$window_;
		SharedDataService = _SharedDataService_;
		deferred = $q.defer();
		$uibModal.open = jasmine.createSpy().and.returnValue(deferred.promise);
		$uibModal.open.result = jasmine.createSpy().and.returnValue(deferred.promise);

		var locals = {
			$scope: $scope,
			DS: DS,
			roleService:roleService,
			ssoModalLinksConfig:ssoModalLinksConfig,
			$uibModal:$uibModal,
			$window:$window,
			SharedDataService:SharedDataService
		};
		ctrl = $componentController('i9OnboardingCardController', locals ,null);
	}));
	it('should verify the clicks',function(){

		var redirectUrl = 'sso';
		ctrl.verifyClick(redirectUrl);
		ctrl.i9ButtonClicked({});
	});

});
