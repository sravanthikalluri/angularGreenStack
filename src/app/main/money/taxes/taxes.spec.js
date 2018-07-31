'use strict';

var angular = require('angular');
require('angular-mocks');

var tnTaxes = require('./taxes.component');

describe('tnTaxes Component', function (){
	var $componentController;
	var ctrl;
	var $scope;
	var gso;
	var $state;
	var taxWithholdings;
	var deferred;
	var mockData = {

	};
	beforeEach(function() {
		var moduleName = 'app.main.money.taxes';

		var mock$state = function () {
			return {
				go: function () {
					return "CA"
				}
			}
		};
		var mockgsoService = function(){ return {}};
		var mocktaxWithholdings = function(){ return {}};
		angular
			.module(moduleName, [])
			.service('$state',mock$state)
			.service('gso',mockgsoService)
			.service('taxWithholdings',mocktaxWithholdings)
			.component('tnTaxes', tnTaxes);

		angular.mock.module(moduleName);
	});


	beforeEach(inject(function($rootScope, _$componentController_, $q, _gso_,$state,_taxWithholdings_){
		$scope = $rootScope.$new();
		$componentController = _$componentController_;
		gso = _gso_;
		taxWithholdings = _taxWithholdings_;
		deferred = $q.defer();
		gso.getAppConfig = jasmine.createSpy().and.returnValue('');
		taxWithholdings._getW2Information = jasmine.createSpy().and.returnValue(deferred.promise);

		var locals = {
			$scope: $scope,
			gso:gso,
			taxWithholdings:taxWithholdings,
			$state:$state,


		};
		ctrl = $componentController('tnTaxes', locals ,null);
	}));

	it('should intilize the component',function () {
		ctrl.$onInit();
		expect(taxWithholdings._getW2Information).toHaveBeenCalled();
	})

});
