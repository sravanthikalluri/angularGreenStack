'use strict';

var angular = require('angular');

require('angular-mocks');

var proxiesCard = require('./proxies-card.component');

describe('proxies-card component', function() {

	var $scope;
	var ctrl;
	var saveDeferred;
	var DS;
	var $uibModal;
	var constants;
	var $filter;
	var $timeout;
	var options = {
	/*	params: {
			effectiveDate: {
				proxy :{
					"effectiveDate": " "
				}
			}
		}*/
	}
	var results = [{
		"historyList":[{

		}],
		"activeList":[{

		}]
	}];

	var constantsMock = {
		statusCode: 200
	};
	var mockData = {
		proxie: {
			confirm: {},
			confirmMsg: {},
			confirmYes: {},
			confirmNo: {},

					}
	}
	var modal = {
		data :{
			data : {}
		},
		result : {
          result: {}
		}
	}


	beforeEach(function() {


		var moduleName = 'trinet.main.settings.security-card';
		var mockDSService = function(){ return {}};
		var mock$uibModal = function () {
			return {
				open:function () {
                    return {
						modal : {
							"result": " "
						}
				}
				}
			}
		};
		var mockconstants = function () {
			return {};
		};
		var mock$filter = function () {
			return {};
		};
		var mock$timeout = function () {
			return {};
		};
		angular
			.module(moduleName, [])

			.service('DS', mockDSService)
			.service('$uibModal', mock$uibModal)
			.service('constants', mockconstants)
			.service('$filter', mock$filter)
			.service('$timeout', mock$timeout)
			.component('proxiesCard', proxiesCard)
		angular.mock.module(moduleName);
	});

	beforeEach(inject(function($q,$rootScope, $componentController,  _DS_, _$uibModal_, _constants_, _$filter_, _$timeout_) {
		var locals;
		$scope = $rootScope.$new();
		DS = _DS_;
		$uibModal = _$uibModal_;
		constants=_constants_;
		$filter=_$filter_;
		$timeout=_$timeout_;
		$uibModal.open = jasmine.createSpy();
		saveDeferred = $q.defer();

		DS.find=jasmine.createSpy().and.returnValue(saveDeferred.promise);
		DS.findAll=jasmine.createSpy().and.returnValue(saveDeferred.promise);
		DS.destory=jasmine.createSpy('ProxyDelete', '', options).and.returnValue(saveDeferred.promise);

		// Set up our dependencies to be injected into $componentController
		locals = {
			$scope: $scope,
			DS: DS,
			$uibModal: $uibModal,
			constants:constants,
			$filter:$filter,
			$timeout:$timeout
		};
		// Initialize Component Controller
		ctrl = $componentController('proxiesCard', locals, null);
	}));
	it('should initilize the controller',function() {
		ctrl.$onInit();
		expect(DS.findAll).toHaveBeenCalled();
		saveDeferred.resolve(results);
		$scope.$digest();
	});
	it('should initilize the controller',function() {
		ctrl.$onInit();
		var errorData = {
			data:{
				_error: {message:"error"}
			}
		}
		expect(DS.findAll).toHaveBeenCalled();
		saveDeferred.reject(errorData);
		$scope.$digest();
	});

	it('should cancel the controller',function() {
		ctrl.onCancelProxy();
	});

	it('should be prompt with success', function(){
		ctrl.prompt();
		var data = {
			"data":"data"
		};
		saveDeferred.resolve(data);
		$scope.$digest();
	});
/*	it('should be prompt with failure', function(){
		ctrl.prompt();
		var errr = {
			"data":"data"
		};
		saveDeferred.reject(error);
		$scope.$digest();
	});*/

	it('should delete the proxy  adn success',function() {

		 var data = {
           "data":"data"
		 };
		 var modal = {
		 	"result": ""
		 }
		ctrl.deleteProxy(data);
		saveDeferred.resolve(data);
		$scope.$digest();
	});

	it('should delete the proxy and failure exception',function() {

		var data = {
			"data":"data"
		};
		var modal = {
			"result": ""
		}
		ctrl.deleteProxy(data);
		saveDeferred.reject(data);
		$scope.$digest();
	});


/*	it('should save the controller',function() {
	 ctrl.proxy= {effectiveDate: ''}
	 ctrl.save();
		expect(DS.destroy).toHaveBeenCalled();
		saveDeferred.resolve(results);
		$scope.$digest();
	 });
	it('should save the controller',function() {
		ctrl.proxy= {effectiveDate: ''}
		ctrl.save();
		var err = {
			data:{
				_error: {message:"error"}
			}
		}
		expect(DS.destroy).toHaveBeenCalled();
		saveDeferred.reject(err);
		$scope.$digest();
	});*/

	it('should reload card the controller',function() {
		ctrl.reloadCard();
	});

	it('should reload card',function() {
		ctrl.reloadCard();
		expect(DS.find).toHaveBeenCalled();
		saveDeferred.resolve(results);
		$scope.$digest();
	});
	it('should throw error if reloads fails',function() {
		ctrl.reloadCard();
		var error = {

			data:{
				status : "404",
				_error: {message:"error"}
			}
		}
		expect(DS.find).toHaveBeenCalled();
		saveDeferred.reject(error);
		$scope.$digest();
	});

});
