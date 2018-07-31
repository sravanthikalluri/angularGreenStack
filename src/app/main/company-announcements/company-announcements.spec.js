'use strict';

var angular = require('angular');
require('angular-mocks');

var tnCompanyAnnoucementsController = require('./company-announcements.component');

describe('company-announcements component', function (){
	var $componentController;
	var ctrl;
	var $scope;
	var $stateParams;
	beforeEach(function() {
		var moduleName = 'trinet.main.company.company-announcements';
		var mock$stateParams=function() {

		}
		angular
			.module(moduleName, [])
			.service('$stateParams',mock$stateParams)
			.component('tnCompanyAnnoucementsController',tnCompanyAnnoucementsController);
		angular.mock.module(moduleName);
	});


	beforeEach(inject(function($rootScope, _$componentController_,$stateParams){
		$scope = $rootScope.$new();
		$componentController = _$componentController_;
		$stateParams=$stateParams;
		var locals = {
			$scope: $scope,
			$stateParams:$stateParams,
		};

		ctrl = $componentController('tnCompanyAnnoucementsController', locals ,null);

	}));
	it('should initilize the component',function() {
		expect(true).toBe(true);
	});

});
