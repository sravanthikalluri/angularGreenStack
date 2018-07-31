'use strict';

var angular = require('angular');
require('angular-mocks');

var moneyForms = require('./money-forms.component');

describe('Money Forms Component', function (){
	var $componentController;
	var ctrl;
	var $scope;
	var DS;
	var gso;
	var $state;
	var $stateParams;
	var deferred;
	var mockData = { "data":{
		"formsDetails":{"forms":[
			{
			 "title": "Federal Tax",
			 "category": null,
			 "desc": null,
			 "body": null,
			 "urlType": "federalTax",
			 "pdfs": {
				 "sub": [
					 {
						 "description": "Calculate your allowance for federal tax withholding.",
						 "label": "Form W-4",
						 "url": "https://www.irs.gov/pub/irs-pdf/fw4.pdf"
					 },
					 {
						 "description": "Calculate your allowance and exemption for tax withholding.",
						 "label": "Puerto Rico Form 499 R-4.1",
						 "url": "http://www.hacienda.gobierno.pr/downloads/pdf/formularios/499%20r-4.1.pdf"
					 }
				 ],
				 "urlType": "federalTax",
				 "text": "Federal Tax Forms"
			 },
			 "additional-details": null,
			 "docMeta": null
		 }

		]

		},
		"PoliciesDetails":{"forms":[
			{
			 "title": "Federal Tax",
			 "category": null,
			 "desc": null,
			 "body": null,
			 "urlType": "federalTax",
			 "pdfs": {
				 "sub": [
					 {
						 "description": "Calculate your allowance for federal tax withholding.",
						 "label": "Form W-4",
						 "url": "https://www.irs.gov/pub/irs-pdf/fw4.pdf"
					 },
					 {
						 "description": "Calculate your allowance and exemption for tax withholding.",
						 "label": "Puerto Rico Form 499 R-4.1",
						 "url": "http://www.hacienda.gobierno.pr/downloads/pdf/formularios/499%20r-4.1.pdf"
					 }
				 ],
				 "urlType": "federalTax",
				 "text": "Federal Tax Forms"
			 },
			 "additional-details": null,
			 "docMeta": null
		 }

		]

		}

	}};
	var errorData = {
		data:{
			_error: {message:"error"}
		}
	}

	beforeEach(function() {
		var moduleName = 'app.main.money.money-forms';

		var mock$state = function () {
			return {
				go: function () {
					//return app.main.money.paychecks-and-statements;
				}
			}
		};
		var mock$stateparams = function () {
			return {
				data: 'taxes',
				go: function () {
					//return app.main.money.paychecks-and-statements;
				}
			}
		};
		var mock$filter = function () {

		};
		var mockDSService = function(){ return {}};
		var mockgsoService = function(){ return {}};
		angular
			.module(moduleName, [])
			.service('DS', mockDSService)
			.service('$state',mock$state)
			.service('$stateParams',mock$stateparams)
			.service('gso',mockgsoService)
			.component('moneyForms', moneyForms);

		angular.mock.module(moduleName);
	});


	beforeEach(inject(function($rootScope, _$componentController_, $q, _DS_, _gso_, _$state_, _$stateParams_){
		$scope = $rootScope.$new();
		$componentController = _$componentController_;
		DS = _DS_;
		gso = _gso_;
		$stateParams = _$stateParams_;
		$state = _$state_;

		deferred = $q.defer();
		DS.find = jasmine.createSpy('moneyPolicies','/stateTaxForms').and.returnValue(deferred.promise);
		gso.getAppConfig = jasmine.createSpy().and.returnValue('');

		var locals = {
			$scope: $scope,
			DS: DS,
			gso:gso,
			$state:$state,
			$stateParams:$stateParams,


		};

		ctrl = $componentController('moneyForms', locals ,null);
	}));

	it('on init function call', function() {
		ctrl.$onInit();
		expect(DS.find).toHaveBeenCalled();
		deferred.resolve(mockData)
	});

	it('openPdf function call',function(){
		var url = '/state/us.pdf';
		ctrl.openPdf(url);
	});

	it('redirectTo function call with url',function(){
		var data = {'url':'/state/us.pdf'};
		ctrl.redirectTo(data);
	});

	it('redirectTo function call without url',function(){
		var data = {};
		ctrl.redirectTo(data);
	});

	it('should showDownloadTex and true condition',function () {
		var state= "Indiana";
		ctrl.showDownloadText(state);
	});
	it('should showDownloadTex and false condition',function () {
		var state= "alabama";
		ctrl.showDownloadText(state);
	});

	it('should checkDocUrl', function () {
		var url="/abc";
		ctrl.checkDocUrl(url);
	});

	it('should displayAllState and success', function () {
		ctrl.displayState="true";
		var item = "";
		ctrl.displayAllState(item);
		/*expect(DS.find).toHaveBeenCalled();
		var result = {
             "data":"data"
		};
		deferred.resolve(result);
		$scope.$digest();*/
	});
/*
	it('should displayAllState and failure', function () {
		ctrl.displayState="true";
		var item = "";
		ctrl.displayAllState(item);
		expect(DS.find).toHaveBeenCalled();
		var error = {
			"data":"data"
		};
		deferred.reject(error);
		$scope.$digest();
	});
*/


	/*it('toggle function call',function(){
		var index = 0;
		var value = 'value';
		ctrl.itemShow = null;
		ctrl.toggle(index,value);
	});

	it('toggle function call with value',function(){
		var index = 0;
		var value = 'value';
		ctrl.itemShow = 'value';
		ctrl.toggle(index,value);
	});

	it('toggle function call with value not equal to utemshow',function(){
		var index = 0;
		var value = 'state';
		ctrl.itemShow = 'value';
		ctrl.toggle(index,value);
	});*/

});
