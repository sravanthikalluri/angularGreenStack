'use strict';

var angular = require('angular');


require('angular-mocks');

var HolidayList = require('./holiday-list.service');

describe('HolidayList service', function() {

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
		var moduleName = 'trinet.shared.services.time-off.holiday-list';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('HolidayList', HolidayList);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_HolidayList_,_DS_, $q,$rootScope) {
		HolidayList = _HolidayList_;
		$scope = $rootScope.$new();
		DS=_DS_;
		deferred=$q.defer();

	}));
	it('should return a value',function() {

	});

});
