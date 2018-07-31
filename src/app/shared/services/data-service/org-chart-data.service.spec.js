'use strict';

var angular = require('angular');
require('angular-mocks');

var OrgChartDataService = require('./org-chart-data.service');

describe('formsPoliciesService service', function() {

	var DS;
	var deferred;
	var $scope;
	var moment;
	var ctrl;
	beforeEach(function() {
		var mockDSService=function() {
			return {

			}
		};
		var mockMomentService=function() {
			return {

			}
		};

		var moduleName = 'trinet.shared.services.org-chart-data';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('moment',mockMomentService)
			.service('OrgChartDataService',OrgChartDataService);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_OrgChartDataService_,_DS_, $q,$rootScope,_moment_) {
		OrgChartDataService= _OrgChartDataService_;
		$scope = $rootScope.$new();
		DS=_DS_;
		moment=_moment_;
		deferred=$q.defer();
		//DS.defineResource=jasmine.createSpy().and.returnValue(deferred.promise);

	}));
	it('should return a value',function() {
		/*ctrl.deserialize=function(resourceConfig,response){

		 };*/
		/*ctrl.fetchAllDirectDepositAccounts();*/
	});

});



