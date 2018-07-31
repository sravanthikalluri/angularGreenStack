
'use strict';

var angular = require('angular');
require('angular-mocks');

var tnTcaCepoController = require('./tca-cpeo.component');

describe('tca-cpeo component', function () {
	var ctrl;
	var $scope;
	beforeEach(function () {

		var moduleName = 'app.main.company.forms-and-policies.forms-policies-accordion.terms-and-conditions.tca-cpeo';
		angular
			.module(moduleName, [])
			.component('tnTcaCepoController', tnTcaCepoController);
		angular.mock.module(moduleName);
	});

	beforeEach(inject(function ($rootScope, $componentController) {
		$scope = $rootScope.$new();

		var locals = {
			$scope: $scope,
		};
		ctrl = $componentController('tnTcaCepoController', locals, null);
	}));
	it('ctrl variables should be with mock data objects',function(){
		//ctrl.onInit();
	});

});
