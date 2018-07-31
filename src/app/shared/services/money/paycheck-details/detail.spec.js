'use strict';

var angular = require('angular');


require('angular-mocks');

var Detail = require('./detail.service');

describe('Detail service', function() {

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
		var moduleName = 'trinet.shared.services.money.paycheck-details.detail';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('Detail', Detail);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_Detail_,_DS_, $q,$rootScope) {
		Detail = _Detail_;
		$scope = $rootScope.$new();
		DS=_DS_;


		deferred=$q.defer();


	}));
	it('should return a value',function() {

	});

});
