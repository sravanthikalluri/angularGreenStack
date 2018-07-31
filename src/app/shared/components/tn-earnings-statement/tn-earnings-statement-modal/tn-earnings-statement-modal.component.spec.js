
'use strict';

var angular = require('angular');
require('angular-mocks');

var tnEarningsStatementModalController = require('./tn-earnings-statement-modal.component');

describe('tn-earnings-statement-modal component', function () {
	var ctrl;
	var $scope,DS, moneyUrlConfig, $http, $timeout,deferred;

	beforeEach(function () {

		var moduleName = 'trinet.shared.components.tn-earnings-statement.tn-earnings-statement-modal';
		var mockDSService = function () {
			return  {};
		};
		var mockmoneyUrlConfig = function () {
			return {
				moneyApi : {

				},
				resources:{
					payroll : ''
				},
				moneyBaseUrl : {

				}
			};
		};

		var mock$http = function () {
			return {
				get : function ( ) {

				},
				success : ''
			};
		};

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('moneyUrlConfig',mockmoneyUrlConfig)
			.service('$http',mock$http)
			.component('tnEarningsStatementModalController', tnEarningsStatementModalController);
		angular.mock.module(moduleName);
	});

	beforeEach(inject(function ($rootScope, $componentController,_DS_,_moneyUrlConfig_,_$http_,_$timeout_,$q) {
		$scope = $rootScope.$new();
		DS=_DS_;
		moneyUrlConfig=_moneyUrlConfig_;
		$timeout=_$timeout_;
		$http=_$http_;

		deferred = $q.defer();
		var locals = {
			$scope: $scope,
			DS:DS,
			moneyUrlConfig:moneyUrlConfig,
			$timeout:$timeout,
			$http:$http
		};
		DS.find=jasmine.createSpy( ).and.returnValue(deferred.promise);
		ctrl = $componentController('tnEarningsStatementModalController', locals, null);
	}));
	it('ctrl variables should be with mock data objects',inject(function( $timeout ){
		var data = {};
		ctrl.modalHeader = true;
		ctrl.$onInit();
		$timeout.flush();
	}));
	it('ctrl variables should be with mock data objects',inject(function( $timeout ){
		var data = {};
		ctrl.modalHeader = "adf";
		ctrl.$onInit();
		$timeout.flush();
	}));

	it('should move focus to close',function(){
		ctrl.moveFocusToClose ();
	});

	it('should to close with index value',function(){
		ctrl.selectedIndex = "1";
		ctrl.onClose();
	});

	it('should to close with index value is undefined',function(){
		ctrl.selectedIndex;
		ctrl.onClose();
	});
	it('should to onClick',function(){
		ctrl.data.header = {
			companyId : "001"
		};
		ctrl.onClick();
	});
});
