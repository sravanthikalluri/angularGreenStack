'use strict';

var angular = require('angular');


require('angular-mocks');

var NetPayDistributions = require('./net-pay-distributions.service');

describe('NetPayDistributions service', function() {

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
		var moduleName = 'trinet.shared.services.money.paycheck-details.net-pay-distributions';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('NetPayDistributions', NetPayDistributions);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_NetPayDistributions_,_DS_, $q,$rootScope) {
		NetPayDistributions = _NetPayDistributions_;
		$scope = $rootScope.$new();
		DS=_DS_;


		deferred=$q.defer();

	}));
	it('should return a value',function() {
	});

});
