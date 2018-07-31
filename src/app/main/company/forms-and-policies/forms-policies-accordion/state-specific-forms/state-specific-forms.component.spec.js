'use strict';

var angular = require('angular');
require('angular-mocks');

var stateSpecificForms = require('./state-specific-forms.component');

describe('state-specific-forms component', function (){
	var $scope,ctrl;
	var $state;
	var $stateParams;
	beforeEach(function() {
		var mock$state = function () {
			return {};
		};

		var mock$stateParams = function () {
			return {};
		};
		var moduleName = 'app.main.company.state-specific-forms';


		angular
			.module(moduleName, [])
			.service('$state',mock$state)
			.service('$stateParams',mock$stateParams)
			.component('stateSpecificForms', stateSpecificForms);

		angular.mock.module(moduleName);
	});


	beforeEach(inject(function($rootScope, $componentController,$state,$stateParams){
		$scope = $rootScope.$new();
		var locals = {
			$scope: $scope,
			$state:$state,
			$stateParams:$stateParams
		};
		ctrl = $componentController('stateSpecificForms', locals ,null);
	}));

	/*ctrl.tootleLink(index,data);*/
	it('ctrl.lable is null',function($compile) {
		var index=0;
		var data={
			label:"hai",
		};
		ctrl.label=null;
		$compile('<div id="specific-form">Content </div>');
		$scope.$digest();
		ctrl.$onInit();
		ctrl.tootleLink(index,data);
		expect(ctrl.label).toEqual(data.label);
	});
	it('ctrl.lable toBe data.label',function() {
		var index=0;
		var data={
			label:"hai",
		};
		 ctrl.label="hai";
		ctrl.tootleLink(index,data);
		expect(ctrl.label).toEqual(null);
	});
	it('else case',function() {
		var index=0;
		var data={
			label:"hai",
		};
		ctrl.label="g";
		ctrl.tootleLink(index,data);
		expect(ctrl.label).toEqual(data.label);
	});

});
