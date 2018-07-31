'use strict';

var angular = require('angular');
require('angular-mocks');

var tnBuildMaintainCustomController = require('./build-maintain-custom.component');

describe('build maintain custom component ', function (){
	var ctrl;
	var $scope;
	var DS;
	var gso;
	var $http;
	var deferred;
	var sharedProperties;

	beforeEach(function() {
		var moduleName = 'app.main.benefits.resources.additional-resources.benefits-summary-view.build-maintain-custom';

		var mockGsoService = function(){ return {
			getAppConfig: function () {
				return {
					peoId: 'AMB'
				}
			}

		}};
		var mockDSService = function(){ return {}};
		var mock$httpService = function(){ return {}};
		var mocksharedPropertiesService = function(){ return {}};

		angular
			.module(moduleName, [])
			.service('gso', mockGsoService)
			.service('DS', mockDSService)
			.service('sharedProperties', mocksharedPropertiesService)
			.service('$http', mock$httpService)
			.component('tnBuildMaintainCustomController', tnBuildMaintainCustomController);

		angular.mock.module(moduleName);
	});


	beforeEach(inject(function($rootScope, $componentController, $q, _DS_, _gso_, _sharedProperties_,_$http_){
		$scope = $rootScope.$new();
		DS = _DS_;
		$http=_$http_;
		gso = _gso_;
		sharedProperties = _sharedProperties_;
		deferred = $q.defer();
		DS.find = jasmine.createSpy('benefits-build-maintain-custom', '').and.returnValue(deferred.promise);

		var locals = {
			$scope: $scope,
			gso: gso,
			DS: DS,
			sharedProperties: sharedProperties,
			$http:$http

		};
		ctrl = $componentController('tnBuildMaintainCustomController', locals ,{
			resolve:{
				modalData:'',
				programData: {
					benefitProgram : " ",
					description : ""
				}
			},
			modalInstance:{
				dismiss:function() {
					return {};
				},
				close:function() {
					return {};
				}
			}
		});

	}));

	it('should initilize the component',function() {
		ctrl.$onInit();
		expect(DS.find).toHaveBeenCalled();
		deferred.resolve({});
		$scope.$digest();
	});
	it('should able to catch exceptions',function() {
		ctrl.$onInit();
		expect(DS.find).toHaveBeenCalled();
		deferred.reject({});
		$scope.$digest();
	});
	it('should close the modal',function() {
		ctrl.closeModal();
	});
	  it('should addRemoveStates and stateValue greater than 0 ', function () {
	  	var stateValue = 2;
		  ctrl.addRemoveStates(stateValue);
	  });
	it('should addRemoveStates', function () {
		var stateValue = " ";
		ctrl.addRemoveStates(stateValue);
	});
	it('should submit the form',function() {
		ctrl.buildmaintainData = {
			company:''
		}
		ctrl.submitForm();
	})


});

