'use strict';

var angular = require('angular');


require('angular-mocks');

var Ptos = require('./ptos.service');

describe('Ptos service', function() {

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
		var moduleName = 'trinet.shared.services.money.paycheck-details.ptos';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('Ptos', Ptos);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_Ptos_,_DS_, $q,$rootScope) {
		Ptos = _Ptos_;
		$scope = $rootScope.$new();
		DS=_DS_;
		deferred=$q.defer();

	}));
	it('should return a value',function() {
	});

});
