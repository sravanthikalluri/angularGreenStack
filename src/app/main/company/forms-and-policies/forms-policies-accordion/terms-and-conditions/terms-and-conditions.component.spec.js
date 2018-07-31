'use strict';

var angular = require('angular');
require('angular-mocks');

var termsAndConditions = require('./terms-and-conditions.component');

describe('terms-and-conditions component', function () {

	var $componentController;
	var ctrl;
	var $scope;
	var DS;
	var $sce;
	var deferred;
	var $window;
	var $http;
	var $stateParams;

	var handbookData = {
		policiesDetails: {
			eula: {},
			desc: 'string'
		}
	};

	var mock$sce = function () {
		return {

		}
	};
	var mock$window = function () {
		return {
			open : function () {

			}
		}

	};
	 var mock$http = function () {

	 };
	 var mockDSService = function () {
	 	return {

		}

	 };

	var $stateParamsService = function () {
		return {
			data: [
				{title: 'TriNet Policies',pdfs: [{label: 'Employee Handbook' }]}
			]
		}
	};
	beforeEach(function () {

		var moduleName = 'trinet.main.company.terms-and-conditions';
		angular
			.module(moduleName, [])

			.service('DS', mockDSService)
			.service('$stateParams', $stateParamsService)
			.service('$window', mock$window)
			.service('$http', mock$http)
			.service('$sce', mock$sce)
			.component('termsAndConditions', termsAndConditions);

		angular.mock.module(moduleName);
	});


	beforeEach(inject(function ($rootScope, _$componentController_, $q, _DS_, _$stateParams_,_$window_,_$http_,_$sce_) {
		$scope = $rootScope.$new();
		$componentController = _$componentController_;
		DS = _DS_;
		$stateParams = _$stateParams_;
		$window=_$window_;
		$http=_$http_;
		$sce=_$sce_;
		deferred = $q.defer();

		DS.find = jasmine.createSpy("policiesService","/eula").and.returnValue(deferred.promise);
		$http.get = jasmine.createSpy().and.returnValue(deferred.promise);

		var locals = {
			$scope: $scope,
			DS: DS,
			$window:$window,
			$http:$http,
			$sce:$sce,
			$stateParams: $stateParams
		};

		ctrl = $componentController('termsAndConditions', locals, null);
	}));

	it('onInit function test', function ($compile) {
        var ele = '/(\\<div id="tacHeader".*?\\<p\\>)/g';
		$compile(ele);
		$scope.$digest();
		ctrl.$onInit();
		var response = {
			"data":"data",
			policiesDetails : {
				path : "",
				eula : { effectiveDate :" "},
				desc : { indexOf : function(_US_K1){

					} }
			}
		};

		expect(DS.find).toHaveBeenCalled();
		deferred.resolve(response);
		$scope.$digest();
		expect($http.get).toHaveBeenCalled();
		deferred.resolve(response);
		$scope.$digest();
		expect($http.get).toHaveBeenCalled();
		deferred.resolve(response);
		$scope.$digest();

	});

	it('ctrl variables should be with mock data objects', function () {
		ctrl.empHandbookStatus();
		//expect(DS.find).toHaveBeenCalled();
	/*	deferred.resolve(handbookData);
		$scope.$digest();*/
	});
	it('should show an error', function () {
		ctrl.empHandbookStatus();
		var errorData = {
			data:{
				_error: {message:"error"}
			}
		}
		//expect(DS.find).toHaveBeenCalled();
		deferred.reject(errorData);
		$scope.$digest();
	});

	it('setAccordion function test', function () {
		ctrl.setAccordion(0);
	});

	it('closeAll function test', function () {
		ctrl.closeAll([{}]);
	});

	it('cleanAck function test', function () {
		ctrl.cleanAck('<p>a string </p> of values<h3>Vlaue</h3> small ');
	});

	/*it('cleanTCA function test', function () {

		ctrl.cleanTCA('<p>a string </p> <div id="tacHeader">of values</div><h3>Vlaue</h3> small ');
		var tcaHeading = [{ }];
	});*/
});
