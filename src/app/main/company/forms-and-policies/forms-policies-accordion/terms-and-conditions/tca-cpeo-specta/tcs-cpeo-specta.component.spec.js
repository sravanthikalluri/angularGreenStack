
'use strict';

var angular = require('angular');
require('angular-mocks');

var tnTcaCepoSpectaController = require('./tca-cpeo-specta.component');

describe('tca-cpeo-specta component', function () {
	var ctrl;
	var $scope;
	beforeEach(function () {

		var moduleName = 'app.main.company.forms-and-policies.forms-policies-accordion.terms-and-conditions.tca-cpeo-specta';
		angular
			.module(moduleName, [])
			.component('tnTcaCepoSpectaController', tnTcaCepoSpectaController);
		angular.mock.module(moduleName);
	});

	beforeEach(inject(function ($rootScope, $componentController) {
		$scope = $rootScope.$new();

		var locals = {
			$scope: $scope,
		};
		ctrl = $componentController('tnTcaCepoSpectaController', locals, null);
	}));
	it('ctrl variables should be with mock data objects',function(){
		//ctrl.onInit();
	});

});
