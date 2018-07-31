'use strict';

var angular = require('angular');


require('angular-mocks');

var translationService = require('./translation.service');

describe('translationService service', function() {


	beforeEach(function() {

		var moduleName = 'trinet.shared.services.translation';

		angular
			.module(moduleName, [])
			.service('translationService', translationService);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_translationService_) {
		translationService = _translationService_;

		//DS.defineResource=jasmine.createSpy().and.returnValue(deferred.promise);

	}));
	it('should return a value',function() {

	});

});
