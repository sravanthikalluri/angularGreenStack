'use strict';

var angular = require('angular');
require('angular-mocks');

var mainComponent = require('./main.component');

describe('main component', function () {
	var ctrl;
	var $scope;
	var DS;
	var gso;
	var apiConfigService;
	var $window;
	var companyNameService;
	var $location;
	var Location;
	var CurrentCompanyIdCookie;
	var $uibModal;
	var deviceDetector;
	var hrpSignOnService;
	var utilService;
	var hrpUserToken;
	var $http;
	var $cookies;
	var loginUrlConfig;
	var SharedDataService;
	var $state;
	var deffered;
	var results = {
		companyInfo:[{
			companyId:'',
			companyDesc:'',
			peoId:''
		}]
	}
	beforeEach(function () {
		var moduleName = 'app.main';
		var mock$state = function(){
			return {
				current:{
					url:''
				}
			}
		};
		var mockloginUrlConfig = function(){
			return{}
		};
		var mockSharedDataService= function(){
			return{
				getAppSharedData: function () {
					return {
						cookieName : " ",
						hrpUrl: " ",
						platformUrl: " ",
						reportsuiBaseUrl: " ",
						ssoUrl: " "
					}

				}
			}
		};
		var mockDSService = function() {
			return {

			}
		};
		var mockgsoService = function() {
			return {
				getUtilService:function(){
					return {
						logout:function(pa) {
							return {};
						},
						getCookie:function(){
							return 'hghgjhg';
						}
					};
				},
				getAppConfig:function(){
					return  {
						userId:function(){
							return '';
						},
						personId :function(){
							return '';
						},
						companyName:function(){
							return '';
						}
					}
				}
			}
		};
		var mockapiConfigService = function() {
			return {

			}
		};
		var mock$window = function() {
			return {
				ga:function(p1,p2){
					return {};
				},
				sessionStorage:{
					getItem:function(data){
						return data;
					},
					setItem:function(data,data1) {

					}
				}


			};
		};
		var mockcompanyNameService = function() {
			return {
				getCompanyId:function(){
					return '001';
				},
				getCompanyDesc : function(){
					return {};
				},
				getPeoId : function(){
					return '';
				}
			};
		};
		var mock$location = function() {
			return {
				path:function(){
					return 'dashboard';
				}
			}
		};
		var mockLocation = function() {
			return {};
		}
		var mockCurrentCompanyIdCookie = function() {
			return {
				createCurrentCompanyIdCookie:function(id) {
					return id;
				}
			};
		};
		var mock$uibModal = function() {
			return {};
		};
		var mockdeviceDetector = function() {
			return {
				browser:'IE',
				browser_version:'10.0'
			};
		}
		var mockhrpSignOnService = function() {
			return {
				login:function(data1,dat2,data3) {

				}
			};
		};
		var mockutilService = function() {
			return {

			};
		};
		var mockhrpUserToken = function() {
			return {}
		};
		var mock$http = function(){
			return {
				get:function(){
					return '';
				}
			};
		};
		var mock$cookies = function () {
			return {}
		}
		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('gso',mockgsoService)
			.service('apiConfigService',mockapiConfigService)
			.service('$window',mock$window)
			.service('companyNameService',mockcompanyNameService)
			.service('$location',mock$location)
			.service('Location',mockLocation)
			.service('CurrentCompanyIdCookie',mockCurrentCompanyIdCookie)
			.service('$uibModal',mock$uibModal)
			.service('deviceDetector',mockdeviceDetector)
			.service('hrpSignOnService',mockhrpSignOnService)
			.service('utilService',mockutilService)
			.service('hrpUserToken',mockhrpUserToken)
			.service('$http',mock$http)
			.service('$cookies',mock$cookies)
			.service('$state',mock$state)
			.service('loginUrlConfig',mockloginUrlConfig)
			.service('SharedDataService',mockSharedDataService)
			.component('mainComponent', mainComponent);
		angular.mock.module(moduleName);
	});

	beforeEach(inject(function ($rootScope, $componentController,
								_DS_,_gso_,_apiConfigService_,_$window_,_companyNameService_,
								_$location_,_Location_,_CurrentCompanyIdCookie_,_$uibModal_,_deviceDetector_
		,_hrpSignOnService_,_utilService_,_hrpUserToken_,_$http_,_$cookies_,
								_$state_,_loginUrlConfig_,_SharedDataService_,$q) {
		$scope = $rootScope.$new();
		SharedDataService = _SharedDataService_;
		loginUrlConfig =_loginUrlConfig_;
		$state = _$state_;
		DS= _DS_;
		gso = _gso_;
		apiConfigService = _apiConfigService_;
		$window = _$window_;
		companyNameService = _companyNameService_;
		$location =_$location_;
		Location = _Location_;
		CurrentCompanyIdCookie = _CurrentCompanyIdCookie_;
		$uibModal = _$uibModal_;
		deviceDetector = _deviceDetector_;
		hrpSignOnService = _hrpSignOnService_;
		utilService = _utilService_;
		hrpUserToken = _hrpUserToken_;
		$http = _$http_;
		$cookies = _$cookies_;
		deffered = $q.defer();

		var locals = {
			$scope: $scope,
			DS:DS,
			gso:gso,
			apiConfigService:apiConfigService,
			$window:$window,
			companyNameService:companyNameService,
			$location:$location,
			Location:Location,
			CurrentCompanyIdCookie:CurrentCompanyIdCookie,
			$uibModal:$uibModal,
			deviceDetector:deviceDetector,
			hrpSignOnService:hrpSignOnService,
			utilService:utilService,
			hrpUserToken:hrpUserToken,
			$http:$http,
			$cookies:$cookies,
			SharedDataService:SharedDataService,
			loginUrlConfig:loginUrlConfig,
			$state:$state
		};
		DS.get = jasmine.createSpy('microservices-config','0').and.returnValue(deffered.promise);
		DS.find = jasmine.createSpy('microservices-config','').and.returnValue(deffered.promise);
		DS.find = jasmine.createSpy('emp-info','',{}).and.returnValue(deffered.promise);
		DS.find = jasmine.createSpy('company-info','').and.returnValue(deffered.promise);
		ctrl = $componentController('mainComponent', locals, null);
	}));
	it('ctrl variables should be with mock data objects',function(){

		ctrl.$onInit();
		expect(DS.find).toHaveBeenCalled();
		deffered.resolve(results);
		$scope.$digest();
		expect(DS.find).toHaveBeenCalled();
		deffered.resolve(results);
		$scope.$digest();

	});
	it('ctrl variables should be with mock data objects , catch error if response fails',function(){
		ctrl.$onInit();
		expect(DS.find).toHaveBeenCalled();
		deffered.reject({});
		$scope.$digest();
	});
	it('should set ContentBackground',function(){
		$scope.setContentBackground();
	})
});
