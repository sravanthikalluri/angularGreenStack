/*
'use strict';

var angular = require('angular');


require('angular-mocks');

var utilService = require('./util.service');
var moment=require('moment');

describe('utilService service', function() {

	var sharedProperties;
	var constants;
	var $filter;

	beforeEach(function() {

		var mocksharedProperties=function() {
				return ;
		};
		var mockConstantsService=function() {

		};
		var mockMomentService=function() {
			return function(dateString) {
				return moment(dateString);
			}
		}

		var moduleName = 'trinet.shared.services.util';

		angular
			.module(moduleName, [])
			.service('sharedProperties',mocksharedProperties)
			.constant('constants',mockConstantsService)
			.service('moment','mockMomentService')
			.service('utilService', utilService);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_utilService_,_sharedProperties_,_constants_,_moment_,_$filter_) {
		utilService = _utilService_;
		sharedProperties=_sharedProperties_;
		moment=_moment_;
		$filter=_$filter_;
		constants=_constants_;

		//DS.defineResource=jasmine.createSpy().and.returnValue(deferred.promise);

	}));
	it('should return a value',function() {

	});

});
*/
