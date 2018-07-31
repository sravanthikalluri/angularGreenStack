'use strict';

var angular = require('angular');
require('angular-mocks');

var tnAlertsCardController = require('./bi-alerts-card.component');

describe('bi-alerts-card component', function () {
	var ctrl;
	var $scope;
	var gso;
	var $window;
	var deffered;
	var SharedDataService;

	beforeEach(function () {
		var moduleName = 'app.main.dashboard.bi-alerts-card';

	var mockgsoService = function() {
		return {
			getUtilService:function(){
				return {
					getEnvironmentFromLocation:function( ) {
						return {
							toLowerCase : function () {
							return { }
						}
						};
					}
				};
			},
			getAppConfig:function(){
				return  {
					companyId:function(){
						return '';
					}
				}
			}
		}
	};

	var mock$window = function() {
		return {
			open:function(p1,p2){

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

	var mockSharedDataService = function() {
		return {
			getAppSharedData:function() {
				return {
					reportsuiBaseUrl:''
				}
			}
		}
	}

	angular
		.module(moduleName, [])
		.service('gso',mockgsoService)
		.service('$window',mock$window)
		.service('SharedDataService',mockSharedDataService)
		.component('tnAlertsCardController', tnAlertsCardController);
	    angular.mock.module(moduleName);
});

	beforeEach(inject(function ($rootScope, $componentController,_gso_,_$window_,$q,_SharedDataService_) {
		$scope = $rootScope.$new();
		gso = _gso_;
		$window = _$window_;
		SharedDataService = _SharedDataService_;
		deffered = $q.defer();
		var locals = {
			$scope: $scope,
			gso:gso,
			$window:$window,
			SharedDataService:SharedDataService
		};
		ctrl = $componentController('tnAlertsCardController', locals, null);
	}));

	it('should  view the alerts',function(){
		ctrl.viewAlerts();
	});
});
