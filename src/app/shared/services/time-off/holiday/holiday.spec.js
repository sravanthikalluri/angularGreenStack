'use strict';

var angular = require('angular');


require('angular-mocks');

var Holiday = require('./holiday.service');

describe('Holiday service', function() {

	var DS;
	var deferred;
	var $scope;
	var globalUrlConfig={
		resources:{
			company:{}
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
		var moduleName = 'trinet.shared.services.time-off.holiday';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.constant('globalUrlConfig',globalUrlConfig)
			.service('Holiday', Holiday);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_Holiday_,_DS_, $q,$rootScope,_globalUrlConfig_) {
		Holiday = _Holiday_;
		$scope = $rootScope.$new();
		DS=_DS_;
		globalUrlConfig=_globalUrlConfig_;

		deferred=$q.defer();

	}));
	it('should return a value',function() {

	});

});
