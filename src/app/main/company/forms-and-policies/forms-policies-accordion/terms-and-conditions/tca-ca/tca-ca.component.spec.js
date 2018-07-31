
'use strict';

var angular = require('angular');
require('angular-mocks');

var tnTcaCAController = require('./tca-ca.component');

describe('tca-ca component', function () {
	var ctrl;
	var $scope;
	beforeEach(function () {

		var moduleName = 'app.main.company.forms-and-policies.forms-policies-accordion.terms-and-conditions.tca-ca';
		angular
			.module(moduleName, [])
			.component('tnTcaCAController', tnTcaCAController);
		angular.mock.module(moduleName);
	});

	beforeEach(inject(function ($rootScope, $componentController) {
		$scope = $rootScope.$new();

		var locals = {
			$scope: $scope,
		};
		ctrl = $componentController('tnTcaCAController', locals, null);
	}));
	it('ctrl variables should be with mock data objects',function(){
		//ctrl.onInit();
	});

});
