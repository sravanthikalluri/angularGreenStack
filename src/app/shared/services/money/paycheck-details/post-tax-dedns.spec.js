'use strict';

var angular = require('angular');


require('angular-mocks');

var PostTaxDedns = require('./post-tax-dedns.service');

describe('PostTaxDedns service', function() {

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
		var moduleName = 'trinet.shared.services.money.paycheck-details.post-tax-dedns';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('PostTaxDedns', PostTaxDedns);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_PostTaxDedns_,_DS_, $q,$rootScope) {
		PostTaxDedns = _PostTaxDedns_;
		$scope = $rootScope.$new();
		DS=_DS_;


		deferred=$q.defer();

	}));
	it('should return a value',function() {
	});

});
