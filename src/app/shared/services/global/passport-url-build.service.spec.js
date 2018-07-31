'use strict';

var angular = require('angular');


require('angular-mocks');

var passportUrlBuildService = require('./passport-url-build.service');

describe('passportUrlBuildService service', function() {


	beforeEach(function() {

		var moduleName = 'trinet.shared.services.passport-url-build';

		angular
			.module(moduleName, [])
			.service('passportUrlBuildService', passportUrlBuildService);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_passportUrlBuildService_) {
		passportUrlBuildService = _passportUrlBuildService_;

		//DS.defineResource=jasmine.createSpy().and.returnValue(deferred.promise);

	}));
	it('should return a value',function() {

	});

});
