'use strict';

var angular = require('angular');


require('angular-mocks');

var navigationService = require('./navigation.service');

describe('navigationService service', function() {


	beforeEach(function() {

		var moduleName = 'trinet.shared.services.navigation';

		angular
			.module(moduleName, [])
			.service('navigationService', navigationService);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_navigationService_) {
		navigationService = _navigationService_;

		//DS.defineResource=jasmine.createSpy().and.returnValue(deferred.promise);

	}));
	it('should return a value',function() {

	});

});
