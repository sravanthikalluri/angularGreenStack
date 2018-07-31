'use strict';

var angular = require('angular');


require('angular-mocks');

var EmployerBenefitsNonTaxable = require('./employer-benefits-non-taxable.service');

describe('EmployerBenefitsNonTaxable service', function() {

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
		var moduleName = 'trinet.shared.services.money.paycheck-details.employer-benefits-non-taxable';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('EmployerBenefitsNonTaxable', EmployerBenefitsNonTaxable);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_EmployerBenefitsNonTaxable_,_DS_, $q,$rootScope) {
		EmployerBenefitsNonTaxable = _EmployerBenefitsNonTaxable_;
		$scope = $rootScope.$new();
		DS=_DS_;


		deferred=$q.defer();

	}));
	it('should return a value',function() {
	});

});
