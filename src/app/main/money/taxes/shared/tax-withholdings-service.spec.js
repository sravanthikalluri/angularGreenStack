/**/'use strict';

var angular = require('angular');
require('angular-mocks');

var taxWithholdingsService = require('./tax-withholdings.service');

describe('Tax-Withholdings-Service component', function() {
	var $scope;
	var ctrl;
	var DS;
	var me ;
	var saveDeferred;
	var mockData = { data: {} };

	beforeEach(function() {

		var moduleName = 'trinet.main.money.taxes.shared';
		var mockDSService = function () {
			return {

			}
		};
		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('taxWithholdingsService', taxWithholdingsService);

		angular.mock.module(moduleName);
	});

		beforeEach(inject(function($rootScope,$q,_DS_) {
			DS = _DS_;
			saveDeferred = $q.defer();
			DS.find = jasmine.createSpy('w2-status').and.returnValue(saveDeferred.promise);
			DS.find = jasmine.createSpy('taxes').and.returnValue(saveDeferred.promise);
			DS.find = jasmine.createSpy('i9-status').and.returnValue(saveDeferred.promise);
		}));
		it('should fetch the controller',inject(function(taxWithholdingsService){
			var results = [
				{},
				{}
			];
			taxWithholdingsService._create(results);
			taxWithholdingsService._getW2Information();
			taxWithholdingsService.fetch();
		}));
});

