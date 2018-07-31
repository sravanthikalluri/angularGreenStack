'use strict';

var angular = require('angular');
var moment = require('moment')
require('angular-mocks');

var EditProfilePersonalService = require('./edit-profile-personal.service');

describe('edit-profile-personal service', function () {
	var ctrl;
	var $scope;
	var me = {};
	var $filter, DS, US_STATES, CA_PROVINCES, profileUrlConfig, gso, $uibModal;
	var saveDeferred;
	beforeEach(function () {

		var moduleName = 'app.main.edit-profile.edit-profile-personal';
		var mockDSService = function() {
			return {

			}
		};
		var mock$filter = function () {

		};
		var mockUS_STATES = function () {

		};
		var mockCA_PROVINCES = function () {

		};
		var mockmoment = function () {
             return {
                 moment : function () {

				 }
			 }

		};
		var mockprofileUrlConfig = function () {

		};
		var mockgso= function () {

		};
		var mock$uibModal = function() {
			return {};
		};

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('$filter',mock$filter)
			.service('US_STATES',mockUS_STATES)
			.service('CA_PROVINCES',mockCA_PROVINCES)
			.service('gso',mockgso)
			.service('moment',mockmoment)
			.service('profileUrlConfig',mockprofileUrlConfig)
			.service('$uibModal',mock$uibModal)
			.service('EditProfilePersonalService', EditProfilePersonalService);
		angular.mock.module(moduleName);
	});

	beforeEach(inject(function (_EditProfilePersonalService_,$rootScope, $componentController,_$filter_, _DS_,
								_US_STATES_, _CA_PROVINCES_, _moment_, _profileUrlConfig_, _gso_, _$uibModal_,$q) {
		$scope = $rootScope.$new();
		EditProfilePersonalService=_EditProfilePersonalService_;
		DS=_DS_;
		$filter = _$filter_;
		US_STATES = _US_STATES_;
		CA_PROVINCES = _CA_PROVINCES_;
		moment =_moment_;
		$uibModal = _$uibModal_;
		profileUrlConfig =_profileUrlConfig_;
		gso=_gso_;
		saveDeferred = $q.defer();
		DS.find = jasmine.createSpy().and.returnValue(deferred.promise);
		DS.getAll = jasmine.createSpy().and.returnValue(deferred.promise);
		DS.update = jasmine.createSpy().and.returnValue(deferred.promise);
		DS.destroy = jasmine.createSpy().and.returnValue(deferred.promise);
		DS.bulkEjectAll = jasmine.createSpy().and.returnValue(deferred.promise);
		me.fetch= jasmine.createSpy().and.returnValue(saveDeferred.promise);
		me.save= jasmine.createSpy().and.returnValue(saveDeferred.promise);
		me._getPersonalInfo = jasmine.createSpy().and.returnValue(saveDeferred.promise);
		me._create= jasmine.createSpy().and.returnValue(saveDeferred.promise);
		me._adjust= jasmine.createSpy().and.returnValue(saveDeferred.promise);
		me._getAddress= jasmine.createSpy().and.returnValue(saveDeferred.promise);
		me._getDropdownData= jasmine.createSpy().and.returnValue(saveDeferred.promise);
		/*		$http.get = jasmine.createSpy('',{}).and.returnValue(deferred.promise);
        $http.put =  jasmine.createSpy('').and.returnValue(deferred.promise);*/

		/*var locals = {
			$scope: $scope,
			DS:DS,
			$filter:$filter,
			US_STATES:US_STATES,
			CA_PROVINCES:CA_PROVINCES,
			moment:moment,
			$uibModal:$uibModal,
			profileUrlConfig:profileUrlConfig,
			gso:gso
		};*/
	}));
/*	it('should perform the fetch',inject(function(EditProfilePersonalService) {
		EditProfilePersonalService.fetch();
	}));
	it('should perform the fetch',inject(function(EditProfilePersonalService) {
		var data = { }
		EditProfilePersonalService._adjust(data);
	}));

	it('should perform the fetch',inject(function(EditProfilePersonalService) {
		var data = { }
		EditProfilePersonalService._getDropdownData (data);
	}));*/

});
