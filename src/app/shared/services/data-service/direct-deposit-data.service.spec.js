'use strict';

var angular = require('angular');
var moment = require('moment');

require('angular-mocks');

var DirectDepositDataService = require('./direct-deposit-data.service');

describe('DirectDepositDataService service', function() {

	var DS;
	var saveDeffered;
	var $scope;
	var svc ={};
	var results = {
		"data":"data"
	};
	var error ={
		"data":"data"
	}
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
		var mockmomentService=function() {
			return {
				/*defineResource: function () {},
				find: function () {
					return {
						data: {
							data: {}
						}
					}
				}*/
			}
		};

		var moduleName = 'trinet.shared.services.data-service';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('moment',mockmomentService)
			.service('DirectDepositDataService',DirectDepositDataService);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_DirectDepositDataService_,_DS_, $q,$rootScope,_moment_) {
		DirectDepositDataService= _DirectDepositDataService_;
		$scope = $rootScope.$new();
		DS=_DS_;
        moment=_moment_;
		saveDeffered=$q.defer();

		DS.find=jasmine.createSpy('direct-deposit', '').and.returnValue(saveDeffered.promise);
		DS.find=jasmine.createSpy('paychecks', '').and.returnValue(saveDeffered.promise);
		svc.fetchAllDirectDepositAccounts = jasmine.createSpy().and.returnValue(saveDeffered.promise);
		svc.fetchPayChecks = jasmine.createSpy().and.returnValue(saveDeffered.promise);
		svc.fetchAllDirectDepositAccountsWithDetails = jasmine.createSpy().and.returnValue(saveDeffered.promise);

	}));
	it('should return fetchAllDirectDepositAccounts and success',inject(function(DirectDepositDataService) {
		DirectDepositDataService.fetchAllDirectDepositAccounts();
		expect(DS.find).toHaveBeenCalled();
		saveDeffered.resolve(results);
		$scope.$digest();
	}));
	it('should return fetchAllDirectDepositAccounts and failure',inject(function(DirectDepositDataService) {
		DirectDepositDataService.fetchAllDirectDepositAccounts();
		expect(DS.find).toHaveBeenCalled();
		deferred.reject({});
		$scope.$digest();
	}));

	it('should return fetchPayChecks and success',inject(function(DirectDepositDataService) {
		DirectDepositDataService.fetchPayChecks();
		expect(DS.find).toHaveBeenCalled();
		saveDeffered.resolve({});
		$scope.$digest();
	}));

});



