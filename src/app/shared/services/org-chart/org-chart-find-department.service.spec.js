'use strict';

var angular = require('angular');


require('angular-mocks');

var orgChartFindDepartment = require('./org-chart-find-department.service');

describe('org-chart-find-department service', function() {

	var DS;
	var deferred;
	var $scope;

	beforeEach(function() {
		var mockDSService=function() {
			return {
				defineResource: function () {},
				find: function () {
					return {
						data: {
							data: {}
						}
					}
				}
			}
		};

		var moduleName = 'trinet.shared.services.org-chart';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('orgChartFindDepartment', orgChartFindDepartment);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_orgChartFindDepartment_,_DS_, $q,$rootScope) {
		orgChartFindDepartment = _orgChartFindDepartment_;
		$scope = $rootScope.$new();
		DS=_DS_;

		deferred=$q.defer();
		//DS.defineResource=jasmine.createSpy().and.returnValue(deferred.promise);

	}));
	it('should return a value',function() {
		//DS.find('benefit-options','').then(function(response) {})
		/*expect(DS.defineResource).toHaveBeenCalled();
		 deferred.resolve({});
		 $scope.$digest();*/
	});

});
