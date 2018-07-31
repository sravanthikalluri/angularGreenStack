'use strict';

var angular = require('angular');


require('angular-mocks');

var I9Status = require('./i9-status.service');

describe('I9Status service', function() {

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
		var moduleName = 'trinet.shared.services..money.taxes.I9Status';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.constant('moneyUrlConfig',moneyUrlConfig)
			.service('I9Status', I9Status);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_I9Status_,_DS_, $q,$rootScope,_moneyUrlConfig_) {
		I9Status = _I9Status_;
		$scope = $rootScope.$new();
		DS=_DS_;
		moneyUrlConfig=_moneyUrlConfig_;

		deferred=$q.defer();
		//DS.defineResource=jasmine.createSpy().and.returnValue(deferred.promise);

	}));
	it('should return a value',function() {
		//DS.find('benefit-options','').then(function(response) {})
		/*expect(DS.defineResource).toHaveBeenCalled();
		 deferred.resolve({});
		 $scope.$digest();*/
	});

});
