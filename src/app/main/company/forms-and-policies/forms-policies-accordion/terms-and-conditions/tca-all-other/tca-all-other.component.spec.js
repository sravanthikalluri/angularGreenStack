
'use strict';

var angular = require('angular');
require('angular-mocks');

var tnTcaAllOtherController = require('./tca-all-other.component');

describe('tca-all-other component', function () {
	var ctrl;
	var $scope;
	beforeEach(function () {

		var moduleName = 'app.main.company.forms-and-policies.forms-policies-accordion.terms-and-conditions.tca-all-other';
		angular
			.module(moduleName, [])
			.component('tnTcaAllOtherController', tnTcaAllOtherController);
		angular.mock.module(moduleName);
	});

	beforeEach(inject(function ($rootScope, $componentController) {
		$scope = $rootScope.$new();

		var locals = {
			$scope: $scope,
		};
		ctrl = $componentController('tnTcaAllOtherController', locals, null);
	}));
	it('ctrl variables should be with mock data objects',function(){
		//ctrl.onInit();
	});

});
