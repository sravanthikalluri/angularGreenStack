'use strict';

var angular = require('angular');


require('angular-mocks');

var TaxData = require('./tax-data.service');

describe('TaxData service', function() {

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
		var moduleName = 'trinet.shared.services.money.paycheck-details.tax-data';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('TaxData', TaxData);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_TaxData_,_DS_, $q,$rootScope) {
		TaxData = _TaxData_;
		$scope = $rootScope.$new();
		DS=_DS_;
		deferred=$q.defer();

	}));
	it('should return a value',function() {
	});

});
