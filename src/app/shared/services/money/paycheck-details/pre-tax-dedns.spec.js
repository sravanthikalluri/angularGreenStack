'use strict';

var angular = require('angular');


require('angular-mocks');

var PreTaxDedns = require('./pre-tax-dedns.service');

describe('PreTaxDedns service', function() {

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
		var moduleName = 'trinet.shared.services.money.paycheck-details.pre-tax-dedns';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('PreTaxDedns', PreTaxDedns);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_PreTaxDedns_,_DS_, $q,$rootScope) {
		PreTaxDedns = _PreTaxDedns_;
		$scope = $rootScope.$new();
		DS=_DS_;
		deferred=$q.defer();

	}));
	it('should return a value',function() {
	});

});
