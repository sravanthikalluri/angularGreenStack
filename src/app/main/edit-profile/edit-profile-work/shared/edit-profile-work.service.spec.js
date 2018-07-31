/*
'use strict';

var angular = require('angular');
require('angular-mocks');
 var moment = require('moment');

var tnEditProfileWorkService = require('./edit-profile-work.service');

describe('edit-profile-work service', function() {

	var DS;
	var deferred;
	var $scope;
	var $filter;
	var me = {}

	beforeEach(function() {
		var mockDSService=function() {
			return {
				defineResource: function () {},
				find: function () {
					return {
						data: {
							data: {}
						}
					}
				}
			}
		};

		var mock$filter= function () {
			return {}
		};
		var mockmoment = function () {
			return {};
		};
		var moduleName = 'app.main.sso';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('$filter',mock$filter)
			.service('moment',mockmoment)
			.service('tnEditProfileWorkService', tnEditProfileWorkService);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_tnEditProfileWorkService_,_DS_, $q,$rootScope,_$filter_,_moment_) {
		tnEditProfileWorkService = _tnEditProfileWorkService_;
		$filter=_$filter_;
		moment=_moment_;
		$scope = $rootScope.$new();
		DS=_DS_;

		deferred=$q.defer();
		DS.bulkEjectAll=jasmine.createSpy().and.returnValue(deferred.promise);
		DS.update=jasmine.createSpy().and.returnValue(deferred.promise);
		me._getDropdownData  = jasmine.createSpy().and.returnValue(deferred.promise);
		me._getContacts  = jasmine.createSpy().and.returnValue(deferred.promise);
		me._create  = jasmine.createSpy().and.returnValue(deferred.promise);
		me._adjust  = jasmine.createSpy().and.returnValue(deferred.promise);
		me.fetch   = jasmine.createSpy().and.returnValue(deferred.promise);
		me.save    = jasmine.createSpy().and.returnValue(deferred.promise);

	}));
	it('should fetch ',inject(function(tnEditProfileWorkService) {
		tnEditProfileWorkService.fetch();
	}));

	it('should fetch ',inject(function(tnEditProfileWorkService) {
	    var data = {};
		tnEditProfileWorkService._getDropdownData(data);
	}));

	it('should fetch ',inject(function(tnEditProfileWorkService) {
		var contacts = {};
		tnEditProfileWorkService._getContacts(contacts);
	}));
	it('should fetch ',inject(function(tnEditProfileWorkService) {
		var results = {"data":"data"};
		tnEditProfileWorkService._create(results);
	}));

});
*/
