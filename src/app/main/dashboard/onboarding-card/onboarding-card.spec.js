'use strict';
var angular = require('angular');
require('angular-mocks');
var tnOnboardingCardController = require('./onboarding-card.component');
describe('on-boarding-card component', function (){

	var $componentController;
	var ctrl;
	var $scope;
	var DS;
	var gso;
	var roleService;
	var $timeout;
	var $translate;
	var $window;

	var deferred;
	var result = function () {
		return {
			"data" : "data"
		}
	};
	beforeEach(function() {
		var moduleName = 'app.main.dashboard.onboarding-card';
		var mockDSService = function(){ return {}};
		var mockgsoService = function(){ return {}};
		var mockroleService=function () {
			return {};
		};
		/*var mock$timeout = function () {
			return {};
		};*/
		var mock$window = function () {
			return {
				open : function () {

				}
			};
		};

	/*	var PaycheckMockDataService = function(){ return {}};*/
		var mock$translateService = function(){
			return {
				then: function () {
					return {

					}
				}
			}
		};
		angular
			.module(moduleName, [])
			.service('DS', mockDSService)
			.service('gso',mockgsoService)
			.service('roleService',mockroleService)
	/*		.service('$timeout',mock$timeout)*/
			.service('$window',mock$window)
			.service('$translate',mock$translateService)
			.component('tnOnboardingCardController', tnOnboardingCardController);
		angular.mock.module(moduleName);
	});

	beforeEach(inject(function($rootScope, _$componentController_, $q, _DS_,_gso_,_roleService_,_$timeout_,_$window_,_$translate_){
		$scope = $rootScope.$new();
		$componentController = _$componentController_;
		DS = _DS_;
		gso = _gso_;
		roleService=_roleService_;
		$timeout=_$timeout_;
		$window=_$window_;
		$translate=_$translate_;
		deferred = $q.defer();

		DS.find = jasmine.createSpy('onboarding-get-tasks', '').and.returnValue(deferred.promise);
		DS.update = jasmine.createSpy('onboarding-post-task', '', '').and.returnValue(deferred.promise);
		$q.all= jasmine.createSpy().and.returnValue(deferred.promise);
		$rootScope.$on= jasmine.createSpy('onboardingComponent','').and.returnValue(deferred.promise);
		$rootScope.$on= jasmine.createSpy('onboardingSkipEvent','').and.returnValue(deferred.promise);
		$translate = jasmine.createSpy(['','']).and.returnValue(deferred.promise);
		gso.getAppConfig = jasmine.createSpy().and.returnValue('');

		var locals = {
			$scope: $scope,
			DS: DS,
			gso:gso,
			roleService:roleService,
			$timeout:$timeout,
			$window:$window,
			$translate:$translate

		};
		ctrl = $componentController('tnOnboardingCardController', locals ,null);
	}));

	it('calling catch DS.Find method catch error', function() {
		ctrl.$onInit();
		expect(DS.find).toHaveBeenCalled();
		var err = {};
		deferred.reject();
		$scope.$digest();
	});
	it('calling  DS.Find method', function() {
		ctrl.$onInit();
		expect(DS.find).toHaveBeenCalled();
		var err = {};
		deferred.resolve();
		$scope.$digest();
		expect($translate).toHaveBeenCalled();
		var translatedText = {
				'trinet-mobile-app-google-link':'',
				'trinet-mobile-app-apple-link':''
			};

		deferred.resolve(translatedText);
		$scope.$digest();
		expect($q.all).toHaveBeenCalled();
		deferred.resolve({});
		$scope.$digest();
	});

	it('should test window open event', inject(function( $timeout ) {
		$timeout.flush();
	}));

	it('should complete the tasks', function( ) {
		ctrl.completeTaskData  = {
			onboardTask:'001',
			completionDate:''
		}
		ctrl.completeTasks();
		expect(DS.update).toHaveBeenCalled();
		var response = {
			"showCompleteCard": false,
		    "showOnboardingCard" : false
		}
		deferred.resolve(response);
		$scope.$digest();
	 });
	it('should complete the tasks need to catch error', function( ) {
		ctrl.completeTaskData  = {
			onboardTask:'001',
			completionDate:''
		}
		ctrl.completeTasks();
		expect(DS.update).toHaveBeenCalled();
		var error = {
			"showCompleteCard": false,
			"showOnboardingCard" : false
		}
		deferred.reject(error);
		$scope.$digest();
	});

	it('should get the due date to complete the tasks', function( ) {
		var dueDate= null, completionDate = null;
		ctrl.getDueDate(dueDate,completionDate);
	});
	it('should get the due date to complete the tasks', function( ) {
		var dueDate= "02/21/2018";
		ctrl.isCanadian = true
		var completionDate = null;
		ctrl.getDueDate(dueDate,completionDate);
	});
	it('should getgetNewLowestDisplayNum', function( ) {
		var completionDate = null, displayNum = '2';
		ctrl.getNewLowestDisplayNum(completionDate,displayNum);
	});
	it('should get getNewLowestDisplayNum and exception', function( ) {
		var completionDate = null, displayNum = '2';
		ctrl.getNewLowestDisplayNum(completionDate,displayNum);
		var err = {};
		deferred.reject(err);
		$scope.$digest();
	});
	it('should go to App Store', function () {
		var url = '';
		ctrl.goToAppStore(url);
	});

	it('should on I9 clicked', function(){
		var value="I9 Pending";
		ctrl.data = {
			"I_9":{
				"completionDate":"Pending"
			}
		};
		ctrl.onI9Clicked(value);
	});

});
