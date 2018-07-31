'use strict';

var angular = require('angular');


require('angular-mocks');

var CompensationStatements = require('./compensation-statements.service');

describe('CompensationStatements service', function() {

	var DS;
	var deferred;
	var $scope;
	var moneyUrlConfig={
		resources:{
			directDeposit:{}
		}
	};

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
		var moduleName = 'trinet.shared.services.money.paychecks.compensation-statements';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.constant('moneyUrlConfig',moneyUrlConfig)
			.service('CompensationStatements',CompensationStatements);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_CompensationStatements_,_DS_, $q,$rootScope,_moneyUrlConfig_) {
		CompensationStatements = _CompensationStatements_;
		$scope = $rootScope.$new();
		DS=_DS_;
		moneyUrlConfig=_moneyUrlConfig_;
		deferred=$q.defer();

	}));
	it('should return a value',function() {
	});

});
