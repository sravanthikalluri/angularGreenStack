'use strict';

var angular = require('angular');
require('angular-mocks');

var formsPoliciesAcc = require('./forms-policies-acc.component');

describe('forms-policies-acc component', function (){
	var ctrl;
	var $scope;
	var deferred;
	var DS,gso, $state;
	var result={
		"formsDetails": [
		{
			"forms":"forms",
			"activeStatus":"false"
		}
	],
		"policiesDetails":[{
			"corporateBrand":"",
			"forms":"forms"
		}],
		"url":"/trinetGateway/trinet"


	};


	beforeEach(function() {
		var mockDSService=function() {
			return {};
		};
		var mockgsoService=function() {
			return {

			};
		};
		var mock$stateService = function () {
			return {
				go: function () {
					return {
					}
				}
			};
		};

		var moduleName = 'app.main.company.forms-policies-acc';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('gso',mockgsoService)
			.service('$state',mock$stateService)
			.component('formsPoliciesAcc', formsPoliciesAcc);

		angular.mock.module(moduleName);
	});


	beforeEach(inject(function($rootScope,$componentController,$q,_DS_,_gso_, _$state_){
		$scope = $rootScope.$new();
		DS=_DS_;
		gso=_gso_;
		$state=_$state_;

		deferred = $q.defer();
		DS.find = jasmine.createSpy().and.returnValue(deferred.promise);
		DS.get = jasmine.createSpy().and.returnValue(deferred.promise);


		gso.getAppConfig = jasmine.createSpy().and.returnValue('');

		var locals = {
			$scope: $scope,
			DS:DS,
			gso:gso
		};

		ctrl = $componentController('formsPoliciesAcc', locals ,null);
	}));

	it('should initilize the component', function() {
		ctrl.$onInit();
		expect(DS.find).toHaveBeenCalled();
		deferred.resolve(result)
		$scope.$digest();
	});
	it('should show error message if status is not active', function() {
		ctrl.$onInit();
		expect(DS.find).toHaveBeenCalled();
		var errorData = {
			data:{
				_error: {message:"error"}
			}
		}
		deferred.reject(errorData);
		$scope.$digest();
	});

	it('catch block', function() {
		ctrl.$onInit();
		expect(DS.find).toHaveBeenCalled();
		var errorData = {
			data:{
				_error: {message:"error"}
			}
		}
		deferred.reject(errorData);
		$scope.$digest();
	});
	it('should test window open event',function() {
		var url=result.url;
		ctrl.corporateBrand = "AMBROSE";
		ctrl.openPdf(url);

	});

	it('should redirect to data page',function() {
		var data={
			urlType:"",
		};
		ctrl.label=null;
		ctrl.redirectTo(data);
	});
	it('should redirect to State Specific Forms page',function() {
		var data={
			urlType:"State Specific Forms",
		};
		ctrl.label=null;
		ctrl.redirectTo(data);
	});

	it('should open the pdf',function() {
		var url="";
		ctrl.openAMBPDF(url);
	});

	it('should goToCompanyAcknowledgements',function() {
		ctrl.goToCompanyAcknowledgements();
	});
	it('should redirect',function() {
		ctrl.redirect();
	});
	/*it('should timeOffUrl ',function() {
		var item={}
		ctrl.timeOffUrl(item);
	});*/

});
