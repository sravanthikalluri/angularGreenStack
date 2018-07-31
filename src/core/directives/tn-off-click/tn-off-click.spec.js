
'use strict'

var angular = require('angular');
require('angular-mocks');

var tnOffClick = require('./tn-off-click.directive');
var rootScope,compile,element,$document/*,elemClickHandler ,docClickHandler*/;

describe('tn OffClick directive', function() {
	beforeEach(function() {

		var moduleName = 'trinet.core.directives.tn-off-click';

		angular
			.module(moduleName, [])

			.directive('tnOffClick',tnOffClick);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function($rootScope,$compile,_$document_){
		rootScope = $rootScope;
		compile = $compile;
		$document=_$document_;


	}));

	it('tn-link-button testing',function(){
		element = angular.element('<input type="text" value="off" ng-model="off" tn-off-click></input>');
		compile(element)(rootScope.$new());
		/*element.elemClickHandler('input');
		element.docClickHandler();*/
		rootScope.$digest();
	});

});


