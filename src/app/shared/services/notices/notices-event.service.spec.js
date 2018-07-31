'use strict';

var angular = require('angular');
require('angular-mocks');

var noticesEvent = require('./notices-event.service');

describe('notices-event service', function() {

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

		var moduleName = 'trinet.shared.services.org-chart';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('noticesEvent', noticesEvent);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_noticesEvent_,_DS_, $q,$rootScope) {
		noticesEvent = _noticesEvent_;
		$scope = $rootScope.$new();
		DS=_DS_;

		deferred=$q.defer();

	}));
	it('should return a value',function() {
	});

});
