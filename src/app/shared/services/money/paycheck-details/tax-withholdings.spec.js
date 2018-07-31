'use strict';

var angular = require('angular');


require('angular-mocks');

var TaxWithHoldings = require('./tax-withholdings.service');

describe('TaxWithHoldings service', function() {

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
		var moduleName = 'trinet.shared.services.money.paycheck-details.tax-withholdings';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('TaxWithHoldings', TaxWithHoldings);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_TaxWithHoldings_,_DS_, $q,$rootScope) {
		TaxWithHoldings = _TaxWithHoldings_;
		$scope = $rootScope.$new();
		DS=_DS_;
		deferred=$q.defer();

	}));
	it('should return a value',function() {
	});

});
