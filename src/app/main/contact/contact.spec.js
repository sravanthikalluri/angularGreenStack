'use strict';

var angular = require('angular');
require('angular-mocks');

var tnContactController = require('./contact.component');

describe('contact component', function () {
	var ctrl;
	var $scope;
	var gso;
    var DS;
	var deffered;

	beforeEach(function () {

		var moduleName = 'app.main.contact';

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
						peoId:"AMB",
						companyId :function(){
							return '';
						}
					}
				}
			}
		};

		var mockDSService = function() {
			return { };
		};

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('gso',mockgsoService)
			.component('tnContactController', tnContactController);
		angular.mock.module(moduleName);
	});

	beforeEach(inject(function ($rootScope, $componentController,_gso_,_DS_,$q) {
		$scope = $rootScope.$new();
		gso = _gso_;
		DS=_DS_;
		deffered = $q.defer();
		var locals = {
			$scope: $scope,
			gso:gso,
			DS:DS,
		};
		ctrl = $componentController('tnContactController', locals, null);
	}));

	it('should  be initialize the component controller',function(){
		var trinetInfo = {

			"email": "hrserviceteamqqq@trinet.com"
		};
		ctrl.$onInit();
	});
});
