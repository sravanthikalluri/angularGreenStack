'use strict';

var angular = require('angular');


require('angular-mocks');

var operationService = require('./operation.service');

describe('operationService service', function() {

		var utilService;
	beforeEach(function() {

		var mockUtilService=function() {
			return {};
		}

		var moduleName = 'trinet.shared.services.operation';

		angular
			.module(moduleName, [])
			.service('utilService',mockUtilService)
			.service('operationService', operationService);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_operationService_,_utilService_) {
		operationService = _operationService_;
		utilService=_utilService_;

		//DS.defineResource=jasmine.createSpy().and.returnValue(deferred.promise);

	}));
	it('should return a value',function() {

	});

});
