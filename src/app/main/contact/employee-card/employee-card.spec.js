'use strict';

var angular = require('angular');
require('angular-mocks');

var tnEmployeeCardController = require('./employee-card.component');

describe('employee-card component', function () {
	var ctrl;
	var $scope;
	var gso;
	var $window;
	var deffered;

	var chatCode={
		"data":"data"
	}

	beforeEach(function () {

		var moduleName = 'app.main.contact.employee-card';

		var mockgsoService = function() {
			return {
				getUtilService:function(){
					return {
						getEnvironmentFromLocation:function( ) {
							return {};
						}
					};
				},
				getAppConfig:function(){
					return  {
						peoId:function(){
							return '';
						},
						companyId :function(){
							return '';
						}
					}
				}
			}
		};

		var mock$window = function() {
			return {
				ga:function(send, event, buttons, click, TrinetLiveChat){
					return {}
				}
			};
		};

		angular
			.module(moduleName, [])
			.service('$window',mock$window)
			.service('gso',mockgsoService)
			.component('tnEmployeeCardController', tnEmployeeCardController);
		angular.mock.module(moduleName);
	});

	beforeEach(inject(function ($rootScope, $componentController,_gso_,_$window_,$q) {
		$scope = $rootScope.$new();
		gso = _gso_;
		$window=_$window_;
		deffered = $q.defer();
		var locals = {
			$scope: $scope,
			gso:gso,
			$window:$window,
		};
		ctrl = $componentController('tnEmployeeCardController', locals, null);
	}));

	it('should  be initialize the component controller',function(){
		var charCode = {};
		ctrl.createDynamicOnlickEvent(chatCode);
	});
});
