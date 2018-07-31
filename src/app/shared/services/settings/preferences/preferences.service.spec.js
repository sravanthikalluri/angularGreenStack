

'use strict';

var angular = require('angular');


require('angular-mocks');

var Preferences= require('./preferences.service');

describe('Preferences service', function() {

	var DS;
	var deferred;
	var $scope;
	var profileUrlConfig;
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


		var moduleName = 'trinet.shared.services.preferences';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('Preferences', Preferences);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_Preferences_,_DS_, $q,$rootScope) {
		Preferences= _Preferences_;
		$scope = $rootScope.$new();
		DS=_DS_;
		deferred=$q.defer();
		//DS.defineResource=jasmine.createSpy().and.returnValue(deferred.promise);

	}));
	it('should return a value',function() {

	});

});






