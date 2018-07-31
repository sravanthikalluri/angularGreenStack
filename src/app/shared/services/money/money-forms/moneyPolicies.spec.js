'use strict';

var angular = require('angular');


require('angular-mocks');

var moneyPolicies = require('./moneyPolicies.service');

describe('moneyPolicies service', function() {

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
		var moduleName = 'trinet.shared.services.moneyPolicies';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('moneyPolicies', moneyPolicies);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_moneyPolicies_,_DS_, $q,$rootScope) {
		moneyPolicies = _moneyPolicies_;
		$scope = $rootScope.$new();
		DS=_DS_;


		deferred=$q.defer();

	}));
	it('should return a value',function() {

	});

});
