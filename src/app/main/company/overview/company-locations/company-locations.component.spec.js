'use strict';

var angular = require('angular');
require('angular-mocks');

var tnCompanyLocations = require('./company-locations.component');

describe('company-locations component', function (){
	var $componentController;
	var ctrl;
	var $scope;
	var DS;
	var US_STATES;
	var CA_PROVINCES;
	var SharedDataService;
	var deferred;

	var results = {
		"data":[{
			"headquarter":[{
				"address":{
					"address1":"",
					"city":"",
					"state":""
				}
			}],
			"locations":[{

			}]
		}],
		"headquarter":[{
			"address":{
				"address1":"",
				"city":"",
				"state":""
			}
		}]

	};

	beforeEach(function() {
		var moduleName = 'trinet.main.company.company-locations';


		var mockDSService = function(){ return {}};
		var mockUsStatesService = function(){
			var states=[{
				"key":"",
				"locations":[{

				}]
			}];

			return states;
		};
		var mockCAPROVINCESService = function () {
			return {};
		};
		var mockSharedDataServiceService = function () {
			return {
				getAppSharedData: function () {
					return {
						/*countryCode : "CA"*/
					}
				}
			};
		};
		angular
			.module(moduleName, [])
			.service('US_STATES',mockUsStatesService)
			.service('CA_PROVINCES',mockCAPROVINCESService)
			.service('SharedDataService',mockSharedDataServiceService)
			.service('DS', mockDSService)
			.component('tnCompanyLocations',tnCompanyLocations);

		angular.mock.module(moduleName);
	});


	beforeEach(inject(function($rootScope, _$componentController_, $q, _DS_,_US_STATES_, _CA_PROVINCES_, _SharedDataService_){
		$scope = $rootScope.$new();
		$componentController = _$componentController_;
		DS = _DS_;
		US_STATES=_US_STATES_;
		CA_PROVINCES=_CA_PROVINCES_;
		SharedDataService=_SharedDataService_;

		deferred = $q.defer();
		DS.find = jasmine.createSpy().and.returnValue(deferred.promise);


		var locals = {
			$scope: $scope,
			DS: DS,
			US_STATES:US_STATES
		};

		ctrl = $componentController('tnCompanyLocations', locals ,null);

	}));
	it('should initilize the component',function() {
		ctrl.$onInit();
		ctrl.headquarter={
			"address":{
				"address1":"",
				"city":"",
				"state":""
			}
		};

		expect(DS.find).toHaveBeenCalled();
		deferred.resolve(results)
		$scope.$digest();
	});
	it('should display error message if location is empty', function() {
		ctrl.$onInit();
		var errorData = {
			data:{
				_statusText: {message:"error"}
			}
		}
		expect(DS.find).toHaveBeenCalled();
		deferred.reject(errorData)
		$scope.$digest();
	});
	it('should return states based on the locations',function() {
		var data={
			"address":[{
				"address1":"address1",
				"city":"city",
			}],
			"officeHours":"21",
			"isRemote":"false",
			"fullStateName":"true"
		};
		var groups = {};
		ctrl.groupByStates=function(data) {

		};
		ctrl.groupByStates(data);
	});

	/*it('should getHeadQuarter',function () {
		var data = {
			headquarter:true,
			officeHours:"12"
		};
		ctrl.getHeadQuarter(data)
	});
	it('should getOtherLocations',function () {
		var data = {
				headquarter:false,
				officeHours:"12"
			};
		ctrl.getOtherLocations(data)
	})*/


});
