'use strict';

var angular = require('angular');
require('angular-mocks');

var tnSwitchViewModalController = require('./tn-switch-view-modal.component');

describe('tn-switch-view-modal component', function() {
	var $scope;
	var ctrl;
	var DS, $location, $window;
	var deferred;

	beforeEach(function() {
		var mockDSService=function() {

		};
		var mock$location=function() {
			return {
				protocol: function() {

				},
				host: function()
				{

				}
			}

		};
		var mock$window=function(){
			return {
				open : function()
				{

				}
			}

		};

		var moduleName = 'trinet.shared.components.tn-switch-view-modal';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('$location',mock$location)
			.service('$window',mock$window)
			.component('tnSwitchViewModalController', tnSwitchViewModalController);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function($rootScope, $componentController,_$window_,_DS_,_$location_,$q) {
		var locals;
		$scope = $rootScope.$new();
		$window=_$window_;
		DS=_DS_;
		$location=_$location_;
		deferred = $q.defer();

		// Set up our dependencies to be injected into $componentController
		locals = {
			$scope: $scope,
			DS:DS,
			$window:$window,
			$location:$location

		};

		DS.update=jasmine.createSpy().and.returnValue(deferred.promise);
		// Initialize Component Controller
		ctrl = $componentController('tnSwitchViewModalController', locals, null);
		/*	ctrl['data'] = { header: {checkDt: new Date()}};*/
	}));

	it('should closeSwitchViewModal',function () {
		ctrl.modalInstance=
			{
				close:function () {

				},
				dismiss : function(p1){

				}
			};
		ctrl.closeSwitchViewModal();
	});
	it('should setViewAdmin function',function () {
        var preference="sdfds";
		ctrl.setViewAdmin(preference);
	});
	it('should saveViewPreference function',function () {
		ctrl.saveViewSetting=true;
		ctrl.saveViewPreference();
		var results = {
			"data":"data"
		};
		ctrl.modalInstance=
			{
				close:function(cancel) {

				},
				dismiss : function(cancel){

				}
			};
		expect(DS.update).toHaveBeenCalled();
		deferred.resolve(results);
		$scope.$digest();
	});
	it('should saveViewPreference function and else condition',function () {
		ctrl.saveViewSetting=false;
		ctrl.modalInstance=
			{
				close:function (cancel) {

				},
				dismiss : function(cancel){

				}
			};
		ctrl.saveViewPreference();
	});


	it('should saveViewPreference function and exception raised',function () {
		ctrl.saveViewSetting=true;
		ctrl.saveViewPreference();
		var results = {
			"data":"data"
		};
		ctrl.modalInstance=
			{
				close:function (cancel) {

				}
			};
		expect(DS.update).toHaveBeenCalled();
		deferred.reject(results);
		$scope.$digest();
	});

	it('should redirectToView function', function()
	{
		ctrl.viewAdminPreference = "Y";
		ctrl.redirectToView()
	})

});

