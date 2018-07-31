'use strict';

var angular = require('angular');

require('angular-mocks');

var GetPayGroupService = require('./paygroup.service');

describe('paygroup service', function() {

	var DS;
	var deferred;
	var $scope;

	beforeEach(function() {
		var mockDSService=function() {
			return {
				defineResource: function () {

					/*	deserialize = function (resourceConfig, response) {

						}*/

				},
				find: function () {
					return {
						data: {
							data: {}
						}
					}
				}
			}
		};

		var moduleName = 'trinet.shared.services.settings.roles';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('GetPayGroupService',GetPayGroupService)

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_GetPayGroupService_,_DS_, $q,$rootScope) {
		GetPayGroupService = _GetPayGroupService_;
		$scope = $rootScope.$new();
		DS=_DS_;
		deferred=$q.defer();

		//	DS.find=jasmine.createSpy().and.returnValue(deferred.promise);

	}));
	it('should return a value',function() {

	});

});



