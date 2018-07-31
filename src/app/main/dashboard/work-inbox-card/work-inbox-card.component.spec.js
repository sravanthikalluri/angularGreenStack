'use strict';

var angular = require('angular');
require('angular-mocks');

var tnWorkInboxCardController = require('./work-inbox-card.component');

describe('work-inbox-card component', function () {
	var deffered;
	var $scope;
	var ctrl;
	var DS;
	var $window;
	var $location;


	beforeEach(function () {
		var moduleName = 'app.main';
		var mockDSService = function () {
			return {};
		};

		var mock$window = function () {
			return {
				sessionStorage:{

					setItem:function(data,data1) {

					}
				},
				open: function(protocol,host) {

				}

			};
		};

		var mock$location = function () {
			return {
				protocol:function() {

				},
				host:function () {

				}
			};
		};


		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('$window',mock$window)
			.service('$location',mock$location)
			.component('tnWorkInboxCardController', tnWorkInboxCardController);
		angular.mock.module(moduleName);
	});

	beforeEach(inject(function ($rootScope, $componentController, _DS_,_$window_, _$location_,$q) {
		$scope = $rootScope.$new();
		DS=_DS_;
		$window = _$window_;
		$location=_$location_;
		deffered = $q.defer();

		var locals = {
			$scope : $scope,
			DS:DS,
			$window:$window,
			$location:_$location_,

		};

		DS.find = jasmine.createSpy('work-inbox', '/items?task=assignedToMe').and.returnValue(deffered.promise)
		DS.find = jasmine.createSpy('work-inbox', '/items?task=UnAssigned').and.returnValue(deffered.promise)


		ctrl = $componentController('tnWorkInboxCardController', locals, null);
	}));

	it('should initilise the component',function(){
		ctrl.$onInit();
		var response = {
			workInbox:[{
				catagory:[{
					data:[{

					}],
					headerName:''
				}],
				name:''
			}],
			catagory:[{
				data:[{

				}],
				headerName:''
			}]
		}
		expect(DS.find).toHaveBeenCalled();
		deffered.resolve(response);
		$scope.$digest();
	});
	it('should initilise the component, if no data exists',function(){
		ctrl.$onInit();
		var response = {
			workInbox:[{
				catagory:[{
					data:[],
					headerName:''
				}],
				name:''
			}],
			catagory:[{
				data:[{

				}],
				headerName:''
			}]
		}
		expect(DS.find).toHaveBeenCalled();
		deffered.resolve(response);
		$scope.$digest();
	});
	it('should initilise the component,able to catch exceptions',function(){
		ctrl.$onInit();
		expect(DS.find).toHaveBeenCalled();
		deffered.reject({});
		$scope.$digest();
	});
	it('should show assigned items',function(){
		ctrl.showAssignedItems();
	});
	it('should show unassigned items ',function(){
		ctrl.showUnAssignedItems();
	});


});
