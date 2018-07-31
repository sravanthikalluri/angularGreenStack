'use strict';

var angular = require('angular');
require('angular-mocks');

var tnPdfViewModalController = require('./tn-pdf-view-modal.component');

describe('tn-pdf-view-modal component', function() {
	var $scope;
	var ctrl;
	var DS, $sce, $scope;
	var deferred;

	beforeEach(function() {
		var mock$sce=function() {
			return{
				trustAsResourceUrl : function(p1){

				}
			}

		};
		var mockDS=function() {
			return {

			}

		};


		var moduleName = 'trinet.shared.components.tn-proxy-message-modal';

		angular
			.module(moduleName, [])
			.service('$sce',mock$sce)
			.service('DS',mockDS)
			.component('tnPdfViewModalController', tnPdfViewModalController);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function($rootScope, $componentController,_$sce_,_DS_,$q) {
		var locals;
		$scope = $rootScope.$new();
		$sce=_$sce_;
		DS=_DS_;
		deferred = $q.defer();

		// Set up our dependencies to be injected into $componentController
		locals = {
			$scope: $scope,
			$sce:$sce,
			DS:DS

		};

		// Initialize Component Controller
		ctrl = $componentController('tnPdfViewModalController', locals, null);
		/*	ctrl['data'] = { header: {checkDt: new Date()}};*/
	}));

	it('should Component Initilization',function () {
		ctrl.resolve= {
			"modalData":[
				{
					"cancelText":"modal data message"
				}
			]
		};
		ctrl.$onInit()
	});
	it('should closeModal',function () {
		ctrl.modalInstance=
			{
				close:function () {

				},
				dismiss : function(p1){

				}
			};
		ctrl.cancel()
	});
	it('should ok function',function () {
		ctrl.modalInstance=
			{
				close:function (p1) {

				},
				dismiss : function(p1){

				}
			};
		ctrl.ok()
	});
	it('should setValue function',function () {
		var key="", value="";
		ctrl.setValue(key.value);
	});

	it('should trustSrc function', function() {
		var src="";
		$scope.trustSrc(src);
	})

});

