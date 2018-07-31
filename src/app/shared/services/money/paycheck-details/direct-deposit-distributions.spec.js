'use strict';

var angular = require('angular');


require('angular-mocks');

var DirectDepositDistributions = require('./direct-deposit-distributions.service');

describe('DirectDepositDistributions service', function() {

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
		var moduleName = 'trinet.shared.services.money.paycheck-details.direct-deposit-distributions';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('DirectDepositDistributions', DirectDepositDistributions);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_DirectDepositDistributions_,_DS_, $q,$rootScope) {
		DirectDepositDistributions = _DirectDepositDistributions_;
		$scope = $rootScope.$new();
		DS=_DS_;


		deferred=$q.defer();


	}));
	it('should return a value',function() {

	});

});
