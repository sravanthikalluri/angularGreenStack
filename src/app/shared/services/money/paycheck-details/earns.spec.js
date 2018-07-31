'use strict';

var angular = require('angular');


require('angular-mocks');

var Earns = require('./earns.service');

describe('Earns service', function() {

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
		var moduleName = 'trinet.shared.services.money.paycheck-details.earns';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('Earns', Earns);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_Earns_,_DS_, $q,$rootScope) {
		Earns = _Earns_;
		$scope = $rootScope.$new();
		DS=_DS_;


		deferred=$q.defer();

	}));
	it('should return a value',function() {
	});

});
