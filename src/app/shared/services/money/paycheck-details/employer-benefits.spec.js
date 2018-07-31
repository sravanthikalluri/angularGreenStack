'use strict';

var angular = require('angular');


require('angular-mocks');

var EmployerBenefits = require('./employer-benefits.service');

describe('EmployerBenefits service', function() {

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
		var moduleName = 'trinet.shared.services.money.paycheck-details.employer-benefits';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('EmployerBenefits', EmployerBenefits);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_EmployerBenefits_,_DS_, $q,$rootScope) {
		EmployerBenefits = _EmployerBenefits_;
		$scope = $rootScope.$new();
		DS=_DS_;


		deferred=$q.defer();

	}));
	it('should return a value',function() {
	});

});
