
'use strict';

var angular = require('angular');
require('angular-mocks');

var tnCobraSummaryController = require('./cobra-summary.component');

describe('cobra-summary component', function (){
	var $componentController;
	var ctrl;
	var $scope;
	var DS;
	var gso;
	var deferred;
	beforeEach(function() {

		var moduleName = 'app.main.benefits.resources.additional-resources.benefits-summary-view.cobra-summary';


		var mockDSService = function(){ return {}};
		var mockGsoService = function(){ return {}};

		angular
			.module(moduleName, [])
			.service('DS', mockDSService)
			.service('gso', mockGsoService)

			.component('tnCobraSummaryController', tnCobraSummaryController);

		angular.mock.module(moduleName);
	});


	beforeEach(inject(function($rootScope, _$componentController_, _DS_,_gso_,$q){
		$scope = $rootScope.$new();
		$componentController = _$componentController_;
		DS = _DS_;
		gso =_gso_;
		deferred = $q.defer();

		DS.find = jasmine.createSpy().and.returnValue(deferred.promise);
		var locals = {
			$scope: $scope,
			DS: DS,
			gso:gso,
		};
		ctrl = $componentController('tnCobraSummaryController', locals ,{
			resolve:{
				modalData:''
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
		var err = {
			"data":"data"
		};
		deferred.reject(err);
		$scope.$digest();
	});

	it('should close the modal',function() {
		ctrl.closeModal();
	});
	it('should print the documents',function() {
		ctrl.printSection();
	});

});

