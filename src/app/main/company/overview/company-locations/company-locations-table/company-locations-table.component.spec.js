
'use strict';

var angular = require('angular');
require('angular-mocks');

var tnCompanyLocationsTableController = require('./company-locations-table.component');

describe('tca-ca component', function () {
	var ctrl;
	var $scope;
	var DS;
	beforeEach(function () {

		var moduleName = 'app.main.company.overview.company-locations.company-locations-table';
		var mockDSService = function() {
			return {

			}
		};
		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.component('tnCompanyLocationsTableController', tnCompanyLocationsTableController);
		angular.mock.module(moduleName);
	});

	beforeEach(inject(function ($rootScope, $componentController,_DS_) {
		$scope = $rootScope.$new();
		DS=_DS_;

		var locals = {
			$scope: $scope,
			DS:DS
		};
		ctrl = $componentController('tnCompanyLocationsTableController', locals, null);
	}));
	it('ctrl variables should be with mock data objects',function(){
		//ctrl.onInit();
	});

});
