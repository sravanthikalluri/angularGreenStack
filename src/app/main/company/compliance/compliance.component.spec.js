'use strict';

var angular = require('angular');
require('angular-mocks');
var compliancecomponent = require('./compliance.component');

var obj = {
	'$componentController': '$componentController',
	 moduleName: 'app.main.company.compliance',
	'ctrl': 'ctrl',
	'$scope': '$scope'

};
describe('compliance component: Testing', function () {

	beforeEach(function () {
		angular
			.module(obj.moduleName, [])
			.component('compliancecomponent', compliancecomponent);

		angular.mock.module(obj.moduleName);
	});

	beforeEach(inject(function ($rootScope,$componentController) {
		obj['$scope'] = $rootScope.$new();
		obj['$componentController'] = $componentController;

		// Initialize Component Controller
		obj['ctrl'] = obj['$componentController']('compliancecomponent', obj.locals, null);
	}));

	it('init function test ', function () {
		obj['ctrl'].$onInit();
	})

});
