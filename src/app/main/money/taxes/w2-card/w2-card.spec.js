/**
 * Created by Sravani on 2/7/2017.
 */

/**
 * Created by Sravani on 2/1/2017.
 */
'use strict';

var angular = require('angular');
require('angular-mocks');

var w2Card = require('./w2-card.component');

describe('w2-card component', function() {
	var obj = {
		'$componentController': '$componentController',
		'ctrl': 'ctrl',
		'$scope': '$scope',
		'moment':'moment',
		'taxWithholdingUrls':' taxWithholdingUrls',
		'url':"abcd.png",
		mockmomentService: function () {
			return {
				moment:function(){

			}
			}
		},


		mocktaxWithholdingUrlsService: function () {
			return {}
		},

		moduleName: 'trinet.main.benefits.w2-card',
		locals: {}
	};

	beforeEach(function() {

		angular
			.module(obj.moduleName, [])
			.service('moment', obj.mockmomentService)
			.service('taxWithholdingUrls', obj.mocktaxWithholdingUrlsService)
			.component('w2Card', w2Card);

		angular.mock.module(obj.moduleName);
	});

	beforeEach(inject(function($rootScope, $componentController,_moment_,_taxWithholdingUrls_) {

		obj['$scope'] = $rootScope.$new();
		obj['$componentController']=$componentController;
		obj['moment']=_moment_
		obj['taxWithholdingUrls']=_taxWithholdingUrls_;
		// Set up our dependencies to be injected into $componentController
		obj.locals = {
			$scope: obj['$scope'],
			moment:obj['moment'],
			taxWithholdingUrls:	obj['taxWithholdingUrls']
		};

		// Initialize Component Controller
		obj['ctrl'] = obj['$componentController']('w2Card', obj.locals, null);
	}));

	it('ctrl variables should be with mock data objects', function () {

		/*obj['ctrl'].$onInit();
		obj['ctrl'].moment=function(){

		};
*/


	});
	it('ctrl variables should be with mock data objects', function () {

		obj['ctrl'].download(obj['url']);

	});
});



