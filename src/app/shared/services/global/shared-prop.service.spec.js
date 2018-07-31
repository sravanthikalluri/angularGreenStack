'use strict';

var angular = require('angular');


require('angular-mocks');

var sharedProperties = require('./shared-prop.service');

describe('sharedProperties service', function() {


	beforeEach(function() {

		var moduleName = 'trinet.shared.services.shared-prop';

		angular
			.module(moduleName, [])
			.service('sharedProperties', sharedProperties);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_sharedProperties_) {
		sharedProperties = _sharedProperties_;

		//DS.defineResource=jasmine.createSpy().and.returnValue(deferred.promise);

	}));
	it('should return a value',function() {

	});

});
