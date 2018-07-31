
'use strict';

var angular = require('angular');
require('angular-mocks');

var newHolidayList= require('./new-holiday-list.service');

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
			.service('newHolidayList', newHolidayList);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function (_newHolidayList_,_DS_, $q,$rootScope,_globalUrlConfig_) {
		newHolidayList = _newHolidayList_;
		globalUrlConfig=_globalUrlConfig_;
		$scope = $rootScope.$new();
		DS=_DS_;

		deferred=$q.defer();
		//DS.defineResource=jasmine.createSpy().and.returnValue(deferred.promise);

	}));
	it('should return a value',function() {

	});

});


