'use strict';

var angular = require('angular');
var moment=require('moment');
require('angular-mocks');

var tnPaycheckDataService = require('./paycheck-data.service');

describe('PaycheckDataService service', function() {

	var DS;
	var saveDeffered;
	var $scope;
	var SharedDataService;
	var ctrl;
	var svc = {};
	var results = {
		"data":"data"
	};
	var error ={
		data : " "
	}

	beforeEach(function() {
		var mockDSService=function() {
			return {

			}
		};
		var mockMomentService=function() {
			return {

			}
		};
		var mockSharedDataService = function () {
			return {
				getAppSharedData : function () {
					return {
						payCheckBackUp :" "
					}
				}
			}
		};

		var moduleName = 'trinet.shared.services.data-service';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('moment',mockMomentService)
			.service('SharedDataService',mockSharedDataService)
			.service('tnPaycheckDataService',tnPaycheckDataService );

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_tnPaycheckDataService_,_DS_, $q,$rootScope,_moment_,_SharedDataService_) {
		tnPaycheckDataService = _tnPaycheckDataService_;
		$scope = $rootScope.$new();
		DS=_DS_;
		SharedDataService=_SharedDataService_
		moment=_moment_;
		saveDeffered=$q.defer();
		//DS.defineResource=jasmine.createSpy().and.returnValue(deferred.promise);
		DS.find=jasmine.createSpy('paychecks', '').and.returnValue(saveDeffered.promise);
		DS.find=jasmine.createSpy().and.returnValue(saveDeffered.promise);
		$q.all=jasmine.createSpy().and.returnValue(saveDeffered.promise);
		svc.fetchAllPaychecks=jasmine.createSpy().and.returnValue(saveDeffered.promise);
		svc.fetchAllPaycheckDetails=jasmine.createSpy().and.returnValue(saveDeffered.promise);
		svc.fetchAllPaychecksWithDetails=jasmine.createSpy().and.returnValue(saveDeffered.promise);
	}));
	it('should return fetchAllDirectDepositAccounts and success',inject(function(tnPaycheckDataService) {
		tnPaycheckDataService.fetchAllPaychecks();
		expect(DS.find).toHaveBeenCalled();
		saveDeffered.resolve(results);
		$scope.$digest();
	}));
	it('should return fetchAllDirectDepositAccounts and failure',inject(function(tnPaycheckDataService) {
		tnPaycheckDataService.fetchAllPaychecks();
		expect(DS.find).toHaveBeenCalled();
		saveDeffered.resolve(error);
		$scope.$digest();
	}));

});



