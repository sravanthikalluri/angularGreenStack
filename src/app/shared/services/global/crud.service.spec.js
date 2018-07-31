'use strict';

var angular = require('angular');


require('angular-mocks');

var crudService = require('./crud.service');

describe('crudService service', function() {
	var operationService;
	beforeEach(function() {
		var mockOperationService=function() {

		};


		var moduleName = 'trinet.shared.services.crud';

		angular
			.module(moduleName, [])
			.service('operationService',mockOperationService)
			.service('crudService', crudService);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_crudService_,_operationService_) {
		crudService = _crudService_;
		operationService=_operationService_;
	}));
	it('should return a value',function() {

	});

});
