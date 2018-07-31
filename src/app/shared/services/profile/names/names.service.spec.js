'use strict';

var angular = require('angular');


require('angular-mocks');

var Names = require('./names.service');

describe('Names service', function () {

	var DS;
	var deferred;
	var $scope;
	var profileUrlConfig;
	var ctrl;
	beforeEach(function () {
		var mockDSService = function () {
			return {
				defineResource: function () {},
			}
		};

		var mockprofileUrlConfigConstant = {
			resources: {
				address: {}
			}

		};

		var moduleName = 'trinet.shared.services.Names';

		angular
			.module(moduleName, [])
			.service('DS', mockDSService)
			.constant('profileUrlConfig', mockprofileUrlConfigConstant)
			.service('Names', Names);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_Names_, _DS_, $q, $rootScope, _profileUrlConfig_) {
		Names = _Names_;
		Names.deserialize = jasmine.createSpy().and.returnValue(function () { return {}} );
		$scope = $rootScope.$new();
		DS = _DS_;
		profileUrlConfig = _profileUrlConfig_;
		deferred = $q.defer();
		DS.defineResource = jasmine.createSpy().and.returnValue({
			deserialize: function () {

			}
		});
		DS.deserialize = jasmine.createSpy().and.returnValue(deferred.promise);
	}));

	it('should return a value', function () {
		DS.defineResource().deserialize();
		expect(Names.deserialize).toEqual(jasmine.any(Function));

		var key = {};
		var result = Names.deserialize(key);

		expect(result).toEqual(jasmine.any(Function));
		//expect(result()).toBe(key);
	});

});


