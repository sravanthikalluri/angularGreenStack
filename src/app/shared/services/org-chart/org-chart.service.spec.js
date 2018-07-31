'use strict';

var angular = require('angular');
require('angular-mocks');

var orgChart = require('./org-chart.service');

describe('org-chart service', function() {

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
			.service('orgChart', orgChart);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_orgChart_,_DS_, $q,$rootScope) {
		orgChart = _orgChart_;
		$scope = $rootScope.$new();
		DS=_DS_;

		deferred=$q.defer();

	}));
	it('should return a value',function() {
	});

});
