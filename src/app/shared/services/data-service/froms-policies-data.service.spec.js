'use strict';

var angular = require('angular');
require('angular-mocks');

var tnFormsPoliciesService = require('./froms-policies-data.service');

describe('formsPoliciesService service', function() {

	var DS;
	var saveDeferred;
	var $scope;
	var gso;
	var me={};
	var ctrl;
	beforeEach(function() {
		var mockDSService=function() {
			return {

			}
		};
		var mockgsoService=function() {
			return {
				getAppConfig : function (){
					return {
						pfClient : "",
						countryCode: "",
						stateCode:""
					}
				}

			}
		};

		var moduleName = 'trinet.shared.services.data-service';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('gso',mockgsoService)
			.service('tnFormsPoliciesService',tnFormsPoliciesService);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_tnFormsPoliciesService_,_DS_, $q,$rootScope,_gso_) {
		tnFormsPoliciesService= _tnFormsPoliciesService_;
		$scope = $rootScope.$new();
		DS=_DS_;
		gso=_gso_;
		saveDeferred=$q.defer();
		DS.defineResource=jasmine.createSpy().and.returnValue(saveDeferred.promise);
		DS.getAll=jasmine.createSpy().and.returnValue(saveDeferred.promise);
		DS.getAll=jasmine.createSpy().and.returnValue(saveDeferred.promise);
		DS.find=jasmine.createSpy().and.returnValue(saveDeferred.promise);
		DS.find=jasmine.createSpy().and.returnValue(saveDeferred.promise);
		me._createArray=jasmine.createSpy().and.returnValue(saveDeferred.promise);
		me.fetch =jasmine.createSpy().and.returnValue(saveDeferred.promise);

	}));
	it('should return a  value of _createArray',inject(function(tnFormsPoliciesService) {
		tnFormsPoliciesService._createArray();
	}));
	/*it('should return a  value of fetch',inject(function(tnFormsPoliciesService) {
		tnFormsPoliciesService.fetch();
	}));
*/

});



