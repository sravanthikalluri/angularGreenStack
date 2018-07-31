'use strict';

var angular = require('angular');
require('angular-mocks');

var tnSsoRedirectModalController = require('./tn-sso-redirect-modal.component');

describe('tn-sso-redirect-modal component', function() {
	var $scope;
	var ctrl,deferred;
	var DS, SharedDataService, $window;


	beforeEach(function() {

		var moduleName = 'trinet.shared.components.tn-sso-redirect-modal';
		var mockDSService=function() {

		};
		var mockSharedDataService = function() {
			return  {
				getAppSharedData :function() {
					suppressRedirectModal: ""
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


		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('SharedDataService',mockSharedDataService)
			.service('$window',mock$window)
			.component('tnSsoRedirectModalController', tnSsoRedirectModalController);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function($rootScope, $componentController,_DS_,_SharedDataService_,_$window_,$q) {
		var locals;
		$scope = $rootScope.$new();
		DS=_DS_;
		SharedDataService=_SharedDataService_;
		$window=_$window_;
		deferred = $q.defer();
		// Set up our dependencies to be injected into $componentController
		locals = {
			$scope: $scope,
			DS:DS,
			SharedDataService:SharedDataService,
			$window:$window,

		};
		DS.update=jasmine.createSpy().and.returnValue(deferred.promise);
		// Initialize Component Controller
		ctrl = $componentController('tnSsoRedirectModalController', locals, {
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

	it('should closeSsoModa',function () {
		ctrl.modalInstance=
			{
				close:function (cancel) {

				},
				dismiss : function(cancel){

				}
			};
		ctrl.closeSsoModal();
	});

            it('should suppressModal function and exception', function () {

				ctrl.resolve.modalData = {
					"data":[
						{
							"message":"modal data message"
						}
					]
				};
				ctrl.suppressModal();

                expect(DS.update).toHaveBeenCalled();
				var results = {
					"data":"data"
				};
                deferred.reject(results);
                $scope.$digest()
            });


});

