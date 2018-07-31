'use strict';

var angular = require('angular');
require('angular-mocks');

var tnFSACalculator = require('./fsa-calculator.component');

describe('tnFSACalculator Component', function (){
	var $componentController;
	var ctrl;
	var $scope;
	var gso;
	var $location;
	var DS;
	beforeEach(function() {
		var moduleName = 'app.main.benefits.fsa-calculator';


		var mockgsoService = function(){ return {}};
		var mockDSService = function() {
			return {};
		}

		angular
			.module(moduleName, [])
			.service('gso',mockgsoService)
			.service('DS',mockDSService)
			.component('tnFSACalculator', tnFSACalculator);

		angular.mock.module(moduleName);
	});


	beforeEach(inject(function($rootScope, _$componentController_,_gso_,_$location_,_DS_){
		$scope = $rootScope.$new();
		$componentController = _$componentController_;
		gso = _gso_;
		$location = _$location_;
		DS = _DS_;

		gso.getAppConfig = jasmine.createSpy().and.returnValue('');


		var locals = {
			$scope: $scope,
			gso:gso,
			$location:$location,
			DS:DS
		};
		ctrl = $componentController('tnFSACalculator', locals ,null);
	}));

	it('should open a tab passed as paramter',function () {
		ctrl.openTab();
	});
	it('should initlize the component',function() {
		ctrl.$onInit();
	});
});
