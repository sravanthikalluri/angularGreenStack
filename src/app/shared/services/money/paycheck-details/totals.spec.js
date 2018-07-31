'use strict';

var angular = require('angular');


require('angular-mocks');

var Totals = require('./totals.service');

describe('Totals service', function() {

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
		var moduleName = 'trinet.shared.services.money.paycheck-details.totals';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('Totals', Totals);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_Totals_,_DS_, $q,$rootScope) {
		Totals = _Totals_;
		$scope = $rootScope.$new();
		DS=_DS_;
		deferred=$q.defer();

	}));
	it('should return a value',function() {
	});

});
