'use strict';

var angular = require('angular');


require('angular-mocks');

var w2Status = require('./w2-status.service');

describe('w2Status service', function() {

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
		var moduleName = 'trinet.shared.services..money.taxes.w2-status';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.constant('moneyUrlConfig',moneyUrlConfig)
			.service('w2Status', w2Status);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_w2Status_,_DS_, $q,$rootScope,_moneyUrlConfig_) {
		w2Status = _w2Status_;
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
