'use strict';

var angular = require('angular');
require('angular-mocks');

var tnHeaderBar = require('./tn-header-bar.component');

describe('tn-header-bar component', function() {
	var $scope;
	var ctrl;
	var $state;
	var gso;
	var DS;
	var $window;
	var $cookies;
	var SharedDataService;
	var deferred;
	var companyNameService;
	var sharedProperties;
	var passportUrlBuildService;
	var utilService;
	var results=[
		{ "sign-out":""

	}];

	beforeEach(function() {
		var mock$state=function() {
			return {
				go : function () {

				}
			}

		};

		var mockgsoService=function() {
			return {
				getUtilService: function () {
					return {
						compIdGen: function (companyDesc ,p1  ) {
							return {};
						},
						splitSubComponentsPermissions : function() {
							return {

							}
						},

					};
				},
				getAppConfig: function () {
					return {};
				}
			}
		};
		var mockDSService=function() {

		};
		var mockCompanyNameService=function() {
			return {
				getCurrentCompany : function (comapnies) {
					return {

					}
				},
				getCompanyId : function () {

				}
			}

		};
		var mockSharedProperties=function(){
			return {
				setComponentSelectedMenuPermissions : function (p1) {

				}
			}

		};
		var mockPassportUrlBuildService=function(){
				return "https://trinet.com";
		};
		var mockUtilService=function(){
			return {
				checkIfNavigationThemeExists: function () {
					return {};
				},
				checkForAdminView: function () {
					return {};
				},
				getEnvironmentFromLocation: function () {
					return {
						toLowerCase: function () {
							return {};
						}
					};
				},
				compIdGen: function () {
					return {};
				}
			}
		};

		var mockSharedDataService = function () {
			return {
				getAppSharedData: function () {
					return {permission : ""};
				}
			};
		};

		var mock$cookiesService = function () {
			return {
				getAll: function () {
					return {};
				},
				remove: function () {
					return {};
				}
			};
		};

		var mock$window = function () {
			return {
				open: function () {
					return {};
				},
				ga: function () {
					return {};

				},
				sessionStorage:{

					setItem: function (companyName,companyDesc) {
							return {};
						}
				}
			}
		};
		var mockhrpSignOnService = function () {
			return {
				logout: function () {
					return {};
				}
			}
		};

		var moduleName = 'trinet.shared.components.tn-header-bar';

		angular
			.module(moduleName, [])
			.service('$state',mock$state)
			.service('gso',mockgsoService)
			.service('DS',mockDSService)
			.service('$window',mock$window)
			.service('utilService',mockUtilService)
			.service('$cookies',mock$cookiesService)
			.service('companyNameService',mockCompanyNameService)
			.service('SharedDataService',mockSharedDataService)
			.service('passportUrlBuildService',mockPassportUrlBuildService)
			.service('sharedProperties',mockSharedProperties)
			.service('hrpSignOnService',mockhrpSignOnService)
			.component('tnHeaderBar', tnHeaderBar);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function($rootScope, $componentController,$state,_gso_,_$window_,_DS_,$q,_companyNameService_,_sharedProperties_,_passportUrlBuildService_,_utilService_, _$cookies_, _SharedDataService_) {

		var locals;
		$scope = $rootScope.$new();
		$state=$state;
		gso=_gso_;
		$window=_$window_;
		DS=_DS_;
		SharedDataService=_SharedDataService_;
		$cookies=_$cookies_;
		sharedProperties=_sharedProperties_;
		companyNameService=_companyNameService_;
		passportUrlBuildService=_passportUrlBuildService_;
		utilService=_utilService_;
		deferred = $q.defer();
		DS.create = jasmine.createSpy().and.returnValue(deferred.promise);
		DS.get = jasmine.createSpy('microservices-config','0').and.returnValue(deferred.promise);
		gso.getUtilService = jasmine.createSpy().and.returnValue('');
		/*gso.getUtilService().getEnvironmentFromLocation=jasmine.createSpy().and.returnValue('yes');*/
		gso.getAppConfig = jasmine.createSpy().and.returnValue('');
		sharedProperties.getComponentPermissions = jasmine.createSpy().and.returnValue('');
		companyNameService.switchCompany=jasmine.createSpy().and.returnValue('');
		companyNameService.getCurrentCompany=jasmine.createSpy().and.returnValue('');
		companyNameService.getCompanyId=jasmine.createSpy().and.returnValue('');
		passportUrlBuildService=jasmine.createSpy().and.returnValue('');
		$rootScope.$on =jasmine.createSpy().and.returnValue(deferred.promise);


		// Set up our dependencies to be injected into $componentController
		locals = {
			$scope: $scope,
			$state:$state,
			gso:gso,
			DS:DS,
			$window:$window,
			companyNameService:companyNameService,
			sharedProperties:sharedProperties,
			passportUrlBuildService:passportUrlBuildService,
			utilService:utilService
		};

		// Initialize Component Controller
		ctrl = $componentController('tnHeaderBar', locals, {
			companiesList : { companyInfo : " company information" },

		});
	}));

	it('should component Init()', function(){
		var companies = [{ companyId : " "}];
		gso.getUtilService=function() {
			return {
				compIdGen:function(companyDesc,p) {
					return
				},
				splitSubComponentsPermissions : function (p1) {

				}
			}
		};
		ctrl.$onInit();
	});

	it('should adminView', function () {
		ctrl.adminView();
	});
	it('should hide slidemenu',function(){
		ctrl.slideMenu="active";
		ctrl.imgClick();
	});
	it('should show siden menu',function(){
		ctrl.slideMenu="not-active";
		ctrl.imgClick();
	});
	it('should goToCurrentHRPSite', function () {
		ctrl.goToCurrentHRPSite();
	});
	it('should delete the session',function(){
		gso.getUtilService=function() {
			return {
				getCookie:function() {
					return
				}
			}
		};
		ctrl.signOut();
	});

	it('should select the company',function(){
		var company=[{
			"companyDesc":"",
		}];

		ctrl.selectCompany(company);
	});

	it('should show error if deleteing the session fails',function(){
		gso.getUtilService=function() {
			return {
				getCookie:function() {
					return
				}
			}
		};
		ctrl.signOut();
		var error = {
			data:{
				_error: {message:"error"}
			}
		};
	});

	it('should profile', function () {
		ctrl.componentsPermissions = [{
			SharedDataService : {
				getAppSharedData: function()
				{
					return {
						permissionId : ""
					}
				}
			}
	}];
        var menuId="1";
		ctrl.profile();
		profileNavClick(menuId);
	});

	it('should getCompanyLogo ', function () {
		var imageSrc=null;
		ctrl.getCompanyLogo(imageSrc);
	});
	it('should getCompanyLogo ', function () {
		var imageSrc="/df";
		ctrl.getCompanyLogo(imageSrc);

	});
});

