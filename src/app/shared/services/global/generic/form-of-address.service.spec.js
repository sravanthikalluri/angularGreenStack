'use strict';

var angular = require('angular');


require('angular-mocks');

var FormOfAddresses = require('./form-of-address.service');

describe('FormOfAddresses service', function() {

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

		var moduleName = 'trinet.shared.services.form-of-address';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('FormOfAddresses', FormOfAddresses);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_FormOfAddresses_,_DS_, $q,$rootScope) {
		FormOfAddresses = _FormOfAddresses_;
		$scope = $rootScope.$new();
		DS=_DS_;

		deferred=$q.defer();
		//DS.defineResource=jasmine.createSpy().and.returnValue(deferred.promise);

	}));
	it('should return a value',function() {

	});

});
