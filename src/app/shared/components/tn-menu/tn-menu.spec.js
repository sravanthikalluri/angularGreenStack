'use strict';

var angular = require('angular');
require('angular-mocks');

var tnTnMenuController = require('./tn-menu.component');

describe('tn-menu component', function() {
	var DS, $scope, $uibModal, $window,$location, navigationService,
		$rootScope, ssoModalLinksConfig,sharedProperties,gso, SharedDataService;

	var ctrl,deferred;
	var results=[{
		"menu":"",
		get: function () {
			return {};
		}
	}];
	beforeEach(function() {
	var mockDSService = function () {

	};
	var mock$uibModal =function () {
		return {
			open : function () {

			}
		}
	};
	var mock$window = function () {
		return {
			open : function () {

			}
		}

	};
	var mock$location = function () {
		return {
			protocol :function () {

			},
			host : function () {

			}
		}

	};
	var mocknavigationService = function () {

	};
	var mockssoModalLinksConfig= function () {
		return {
			keywords: { length  : {} }
		}

	};
	var mockSharedProperties = function () {
      return {
		  setComponentPermissions : function (p1) {
			  return {
				  /*suppressRedirectModal : " ",
				  menuId : "1 "*/
			  }
		  }
	  }
	};

	var mockgso = function () {
	return {
		getUtilService : function () {
			return { compIdGen : function(p1){

				}}
		},
		getAppConfig : function () {
			return {
				companyId : "001 ",
				personId: " "
			}
		}
      }
	};

	var mock$scope=function () {

	};
	var mockSharedDataService = function () {
		return {
			getAppSharedData : function () {
				return {
					menuId : 1,
					componentsPermissions : "",
					editNotices : " ",
					suppressRedirectModal : ""
				}
			}
		}

	};

		var moduleName = 'trinet.shared.components.tn-menu';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('$uibModal',mock$uibModal)
			.service('$window',mock$window)
			.service('$scope',mock$scope)
			.service('$location',mock$location)
			.service('navigationService',mocknavigationService)
			.service('sharedProperties',mockSharedProperties)
			.service('ssoModalLinksConfig',mockssoModalLinksConfig)
			.service('gso',mockgso)
			.service('SharedDataService',mockSharedDataService)
			.component('tnTnMenuController', tnTnMenuController);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function($rootScope, $componentController,_DS_, _$scope_, _$uibModal_, _$window_,_$location_,
							   _navigationService_,
							    _ssoModalLinksConfig_,_sharedProperties_,_gso_, _SharedDataService_,$q) {

		var locals;
		$scope = $rootScope.$new();
		gso=_gso_;
		DS=_DS_;
		$uibModal=_$uibModal_;
		$window=_$window_;
		$location=_$location_;
		sharedProperties=_sharedProperties_;
		SharedDataService=_SharedDataService_;
		navigationService=_navigationService_;
		ssoModalLinksConfig=_ssoModalLinksConfig_;
		deferred = $q.defer();
		DS.find = jasmine.createSpy('menu', '').and.returnValue(deferred.promise);
		DS.find = jasmine.createSpy('permissions','').and.returnValue(deferred.promise);
		DS.get = jasmine.createSpy().and.returnValue(deferred.promise);
		/*DS.get = function () {
			return {};
		};
		gso.getAppConfig = jasmine.createSpy().and.returnValue('');
		sharedProperties.setComponentPermissions = jasmine.createSpy().and.returnValue('');
		ssoModalLinksConfig.keywords=[{}];*/

		// Set up our dependencies to be injected into $componentController
		locals = {
			$scope: $scope,
			gso:gso,
			DS:DS,
			$uibModal:$uibModal,
			$window:$window,
			$location:$location,
			navigationService:navigationService,
			SharedDataService:SharedDataService,
			sharedProperties:sharedProperties,
			ssoModalLinksConfig:ssoModalLinksConfig,

		};

		// Initialize Component Controller
		ctrl = $componentController('tnTnMenuController', locals, null);

	}));

	it('component initilisation',function () {

		ctrl.$onInit();
		ctrl.menus = {
			filter : function () {

			}
		};
		expect(DS.find).toHaveBeenCalled();
		var result = {
			"data":"data"
		}
		deferred.resolve(result);
		$scope.$digest();
		expect(DS.find).toHaveBeenCalled();
		var response = {
			"data":"data"
		}
		deferred.resolve(response);
		$scope.$digest();
	});
	it('component initilisation and exception',function () {
		ctrl.$onInit();
		expect(DS.find).toHaveBeenCalled();
		var result = {
			"data":"data"
		}
		deferred.reject(result);
		$scope.$digest();
		expect(DS.find).toHaveBeenCalled();
		var response = {
			"data":"data"
		}
		deferred.reject(response);
		$scope.$digest();
	});

	it('should adminView function', function () {
		ctrl.adminView();
	});

	it('should open modal',function () {
		var redirectUrl = "";
		ctrl.openModal(redirectUrl);
	});
	it('should open the menu based on conditions(isExternal true)',function() {
		var menu=[{
			"isMainMenu":"true"
		}];
		var isExternal=true;
		var redirectUrl="";

		ctrl.select(menu, isExternal, redirectUrl);
	});
	it('should open the menu based on conditions(isExternal true)',function() {
		var menu=[{
			"isMainMenu":"true"
		}];
		var isExternal=true;
		var redirectUrl="";

		ctrl.select(menu, isExternal, redirectUrl);
	});
	it('should open the menu based on conditions(isExternal false)',function() {
		var menu=[{
			"isMainMenu":"true",

		}];
		var isExternal=false;
		var redirectUrl="";
		ctrl.select(menu, isExternal, redirectUrl);
	});
	it('should open the menu based on conditions)',function() {
		 var menu={
		 	"isMainMenu":"true",
			 "isOpen":"true"
		 };
		var isExternal=true;
		var redirectUrl="";
		var openedMenu="menu";
		ctrl.select(menu, isExternal, redirectUrl);
	});
	it('should open a modal',function() {
		var redirectUrl="/test/testurl";
		ctrl.openModal(redirectUrl);
	});
	it('should select main menu',function() {
		var menuId=1;
		var selectMainMenu=function(){
		};
		selectMainMenu(menuId);
	});
});

