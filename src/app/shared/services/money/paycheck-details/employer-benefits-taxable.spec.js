'use strict';

var angular = require('angular');


require('angular-mocks');

var EmployerBenefitsTaxable = require('./employer-benefits-taxable.service');

describe('EmployerBenefitsTaxable service', function() {

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
		var moduleName = 'trinet.shared.services.money.paycheck-details.employer-benefits-taxable';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('EmployerBenefitsTaxable', EmployerBenefitsTaxable);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_EmployerBenefitsTaxable_,_DS_, $q,$rootScope) {
		EmployerBenefitsTaxable = _EmployerBenefitsTaxable_;
		$scope = $rootScope.$new();
		DS=_DS_;


		deferred=$q.defer();

	}));
	it('should return a value',function() {
	});

});
