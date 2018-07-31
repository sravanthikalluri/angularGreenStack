'use strict';

var angular = require('angular');
require('angular-mocks');

var additionalResources = require('./additional-resources.component');

describe('additional-resources component', function () {
	var $componentController;
	var ctrl;
	var $scope;
	var DS;
	var gso;
	var num = 0;
	var deferred;
	/*var employmentStatus="T";*/
	var mockData = {};

	var errorData = {
		data: {
			_error: {message: "error"}
		}
	};
	var data = {
		return: {imageUrl: "abcd.jpg"}
	};
	/*var modalData={
	 return:{}
	 }*/
	beforeEach(function () {
		var moduleName = 'app.main.benefits.resources.additional-resources-additional-resources';

		var mockGsoService = function () {
			return {}
		};
		var mockDSService = function () {
			return {}
		};


		angular
			.module(moduleName, [])
			.service('gso', mockGsoService)
			.service('DS', mockDSService)

			.component('additionalResources', additionalResources);

		angular.mock.module(moduleName);
	});


	beforeEach(inject(function ($rootScope, _$componentController_, $q, _DS_, _gso_) {
		$scope = $rootScope.$new();
		$componentController = _$componentController_;
		DS = _DS_;

		deferred = $q.defer();
		DS.find = jasmine.createSpy().and.returnValue(deferred.promise);

		gso = _gso_;
		gso.getAppConfig = jasmine.createSpy().and.returnValue('');


		var locals = {
			$scope: $scope,
			DS: DS,
			gso: gso,

		};

		ctrl = $componentController('additionalResources', locals, null);
	}));

	it('ctrl variables should be with mock data objects', function () {
		ctrl.$onInit();
	});

	var url = " ";
	it('should test window open event', inject(function ($window) {
		spyOn($window, 'open').and.callFake(function () {
			return true;
		});
		ctrl.openWin();
		expect($window.open).toHaveBeenCalled();
		//expect( $window.open ).toHaveBeenCalledWith(url);
	}));
	/*var url="abcd.png";
	 it( 'should test window open event', inject( function( $window ) {
	 spyOn( $window, 'open' ).and.callFake( function() {
	 return true;
	 } );
	 ctrl.openPdf(url);
	 expect( $window.open ).toHaveBeenCalled();
	 var urlLink = "/api-content"+url;
	 expect( $window.open ).toHaveBeenCalledWith(urlLink,'_blank');
	 } ) );*/

});
