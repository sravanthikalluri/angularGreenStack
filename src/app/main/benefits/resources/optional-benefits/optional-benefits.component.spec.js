'use strict';

var angular = require('angular');
require('angular-mocks');

var tnOptionalBenefitsController = require('./optional-benefits.component');

describe('optional-benefits component', function () {
	var ctrl;
	var $scope;
	var gso;
	var deffered;

	beforeEach(function () {

		var moduleName = 'app.main.benefits.resources.optional-benefits';

		var mockgsoService = function() {
			return {

				getAppConfig:function(){
					return  {
						peoId:function(){
							return '';
						},
						pfClient :function(){
							return '';
						}
					}
				}
			}
		};

		angular
			.module(moduleName, [])
			.service('gso',mockgsoService)
			.component('tnOptionalBenefitsController', tnOptionalBenefitsController);
		angular.mock.module(moduleName);
	});

	beforeEach(inject(function ($rootScope, $componentController,_gso_,$q) {
		$scope = $rootScope.$new();
		gso = _gso_;
		deffered = $q.defer();
		var locals = {
			$scope: $scope,
			gso:gso,
		};
		ctrl = $componentController('tnOptionalBenefitsController', locals, null);
	}));

	it('should  be initialize the component controller',function(){
		//ctrl.getUrl();
	});
});
