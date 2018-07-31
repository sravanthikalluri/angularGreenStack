'use strict';

var angular = require('angular');
require('angular-mocks');

var tnTaxesDataService = require('./taxes-data.service');

describe('TaxesDataService service', function() {

	var DS;
	var deferred;
	var $scope;
	var filter;
	var ctrl;
	var svc={};
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
		var mockFilterService=function() {
			return {

			}
		};

		var moduleName = 'trinet.shared.services.taxes-data';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('filter',mockFilterService)
			.service('tnTaxesDataService',tnTaxesDataService);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_tnTaxesDataService_,_DS_, $q,$rootScope,_filter_) {
		tnTaxesDataService = _tnTaxesDataService_;
		filter=_filter_;
		$scope = $rootScope.$new();
		DS=_DS_;
		deferred=$q.defer();
		//DS.defineResource=jasmine.createSpy().and.returnValue(deferred.promise);
		DS.find=jasmine.createSpy('taxes', '').and.returnValue(deferred.promise);
		DS.find=jasmine.createSpy('i9-status', '').and.returnValue(deferred.promise);
		DS.find=jasmine.createSpy('marital-status', payDedCode).and.returnValue(deferred.promise);
		svc.fetchAllTaxes =jasmine.createSpy().and.returnValue(deferred.promise);
		svc.fetchI9Status =jasmine.createSpy().and.returnValue(deferred.promise);
		svc.fetchMaritalStatus =jasmine.createSpy().and.returnValue(deferred.promise);
		svc.fetchAllTaxesWithDetails =jasmine.createSpy().and.returnValue(deferred.promise);

	}));

	/*it('should return a fetchAllTaxes',inject(function(tnTaxesDataService) {
		tnTaxesDataService.fetchAllTaxes();
	}));*/
/*
	it('should return a fetchI9Status',inject(function(tnTaxesDataService) {
		tnTaxesDataService.fetchI9Status();
	}));
	it('should return a fetchAllTaxesWithDetails',inject(function(tnTaxesDataService) {
		tnTaxesDataService.fetchAllTaxesWithDetails();
	}));
	it('should return a fetchAllTaxesWithDetails',inject(function(tnTaxesDataService) {
		tnTaxesDataService.findTaxDetails(10);
	}));
*/

});



