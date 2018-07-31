
'use strict';

var angular = require('angular');
require('angular-mocks');

var activeHolidayCompany= require('./activeCompany.service');

describe('activeCompany service', function() {

	var DS;
	var deferred;
	var $scope;
	var globalUrlConfig;

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

		var mockglobalUrlConfig= function () {
			return {
				resources :
					{
						holidayCalender : ''
					}
			};
		};

		var moduleName = 'trinet.shared.services.time-off.holiday';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('globalUrlConfig',mockglobalUrlConfig)
			.service('activeHolidayCompany', activeHolidayCompany);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function (_activeHolidayCompany_,_DS_, $q,$rootScope,_globalUrlConfig_) {
		activeHolidayCompany = _activeHolidayCompany_;
		globalUrlConfig=_globalUrlConfig_;
		$scope = $rootScope.$new();
		DS=_DS_;

		deferred=$q.defer();
		//DS.defineResource=jasmine.createSpy().and.returnValue(deferred.promise);

	}));
	it('should return a value',function() {

	});

});


