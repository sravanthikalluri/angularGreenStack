'use strict';

var angular = require('angular');
require('angular-mocks');

var tnCompanyOverview = require('./overview.component');

describe('overview component', function (){
	var $componentController;
	var ctrl;
	var $scope;
	var DS;
	var gso;
	var SharedDataService;
	var deferred;

	var results = {
		"data": [{
			"headquarter ":"true",
			"officeHours":"12"
		},
		],
		"locations":[{
			"city" : "NEW YORK",
			"country":"US",
			"headquarter":[ {
				"headquarter":"US",
				"officeHours ":"12"
			}
				,
					{
				"address":{
					"address1":"address1",
					"city":"city",
					"state":"state1"
				}
			}]


		},
			{
				"city" : "Paris",
				"country":"france"
			}],
		"table_data":[{
				"table_data":[{
					"count":"2"
				}]
		}]

	};
	beforeEach(function() {
		var moduleName = 'trinet.main.company.overview';


		var mockDSService = function(){ return {}};
		var mockGsoService = function(){ return {}};
		var mockSharedDataService = function(){ return {
			getAppSharedData: function () {
				return {
					navigationSide: "[{}, {}, {}]"
				};
			}
		}};
		angular
			.module(moduleName, [])
			.service('gso', mockGsoService)
			.service('DS', mockDSService)
			.service('SharedDataService', mockSharedDataService)
			.component('tnCompanyOverview', tnCompanyOverview);

		angular.mock.module(moduleName);
	});


	beforeEach(inject(function($rootScope, _$componentController_, $q, _DS_,_gso_, _SharedDataService_){
		$scope = $rootScope.$new();
		$componentController = _$componentController_;
		DS = _DS_;
		gso=_gso_;
		SharedDataService=_SharedDataService_;
		gso.getAppConfig = jasmine.createSpy().and.returnValue('');

		deferred = $q.defer();
		DS.find = jasmine.createSpy().and.returnValue(deferred.promise);


		var locals = {
			$scope: $scope,
			DS: DS,
		};

		ctrl = $componentController('tnCompanyOverview', locals ,null);
	}));
	it('should initilize the component',function() {

		ctrl.$onInit();

		ctrl.employeesFinished = false;
		expect(DS.find).toHaveBeenCalled();
		deferred.resolve(results);
		$scope.$digest();


	});
	it('failed case',function() {
		ctrl.$onInit();
		expect(DS.find).toHaveBeenCalled();
		var errorData = {
			data:{
				_error: {message:"error"}
			}
		}
		deferred.reject(errorData)
		$scope.$digest();
	});
	it('should return headquater',function() {
		var data=[{
			"officeHours":"12"
		}];
		ctrl.getHeadQuarter(results.locations);
	});

});
