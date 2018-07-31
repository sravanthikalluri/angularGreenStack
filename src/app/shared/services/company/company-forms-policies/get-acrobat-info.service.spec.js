
'use strict';

var angular = require('angular');
require('angular-mocks');

var GetAcrobatInfoService= require('./get-acrobat-info.service');

describe('get-acrobat-info service', function() {

	//var DS;
	var deferred;
	var $scope;
	var ctrl;

	beforeEach(function() {
	/*	var mockDSService=function() {
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
		};*/


		var moduleName = 'trinet.shared.services.company.company-forms-policies';

		angular
			.module(moduleName, [])
			.service('GetAcrobatInfoService', GetAcrobatInfoService);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function (_GetAcrobatInfoService_, $q,$rootScope) {
		GetAcrobatInfoService = _GetAcrobatInfoService_;
		$scope = $rootScope.$new();

		deferred=$q.defer();
		//DS.defineResource=jasmine.createSpy().and.returnValue(deferred.promise);

	}));
	it('should get browser name a value', inject(function(GetAcrobatInfoService) {
         var userAgent="xxx";
		var browser = "IE"
		GetAcrobatInfoService.getBrowserName();
	}));
	/*it('should get PDF plugin', inject(function(GetAcrobatInfoService) {
		GetAcrobatInfoService.getPDFPlugin();
	}));
	it('should get is Acrobat Installed', inject(function(GetAcrobatInfoService) {
		GetAcrobatInfoService.isAcrobatInstalled();
	}));

	it('should get Acrobat Version', inject(function(GetAcrobatInfoService) {
		GetAcrobatInfoService.getAcrobatVersion();
	}));

	it('should get Acrobat Version', inject(function(GetAcrobatInfoService) {
		var name='AcroPDF.PDF';
		GetAcrobatInfoService.getActiveXObject(name);
	}));
*/

});


