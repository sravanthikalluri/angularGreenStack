'use strict';

var angular = require('angular');
require('angular-mocks');

var tnProxyMessageModalController = require('./tn-proxy-message-modal.component');

describe('tn-proxy-message-modal component', function() {
	var $scope;
	var ctrl;
	var $sce, $filter, $state;
	var deferred;

	beforeEach(function() {
		var mock$sce=function() {

		};
		var mock$filter=function() {
			return {

			}

		};
		var mock$state=function(){
			return {

			}

		};

		var moduleName = 'trinet.shared.components.tn-proxy-message-modal';

		angular
			.module(moduleName, [])
			.service('$sce',mock$sce)
			.service('$filter',mock$filter)
			.service('$state',mock$state)
			.component('tnProxyMessageModalController', tnProxyMessageModalController);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function($rootScope, $componentController,_$sce_,_$filter_,_$state_,$q) {
		var locals;
		$scope = $rootScope.$new();
		$sce=_$sce_;
		$filter=_$filter_;
		$state=_$state_;
		deferred = $q.defer();

		// Set up our dependencies to be injected into $componentController
		locals = {
			$scope: $scope,
			$sce:$sce,
			$filter:$filter,
			$state:$state

		};

		// Initialize Component Controller
		ctrl = $componentController('tnProxyMessageModalController', locals, {
			resolve : { modalData:{}},
		});
		/*	ctrl['data'] = { header: {checkDt: new Date()}};*/
	}));

	it('should closeModal',function () {
		ctrl.modalInstance=
			{
				close:function () {

				},
				dismiss : function(p1){

				}
			};
		ctrl.resolve = {
			modalData : {
				lastName:"sdsadsd",
				firstName:"dfgd"
			}
		}
				ctrl.closeModal()
	});

});

