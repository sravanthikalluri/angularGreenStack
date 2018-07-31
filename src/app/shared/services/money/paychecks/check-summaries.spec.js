'use strict';

var angular = require('angular');


require('angular-mocks');

var CheckSummaries = require('./check-summaries.service');

describe('CheckSummaries service', function() {

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
		var moduleName = 'trinet.shared.services.money.paychecks.check-summaries';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('CheckSummaries', CheckSummaries);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_CheckSummaries_,_DS_, $q,$rootScope) {
		CheckSummaries = _CheckSummaries_;
		$scope = $rootScope.$new();
		DS=_DS_;
		deferred=$q.defer();

	}));
	it('should return a value',function() {
	});

});
