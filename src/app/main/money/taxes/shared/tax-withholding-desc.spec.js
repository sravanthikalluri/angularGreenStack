/*
'use strict'

var angular = require('angular');
require('angular-mocks');

var taxWithholdingDescFilter = require('./tax-withholding-desc.filter');
describe('Tax-Withholding-Desc filter', function() {
	beforeEach(function() {
		var moduleName = 'trinet.main.taxes.shared';

		angular
			.module(moduleName, [])
			.filter('taxWithholdingDescFilter', taxWithholdingDescFilter);

		angular.mock.module(moduleName);
	});

	it('should return string splicing tax from it', angular.mock.inject(function($filter){
		var data = {
			type: 'State tax',
			payDedCode:'GA'
		}
		expect($filter('taxWithholdingDescFilter')(data)).toEqual('GA State');
	}));
	it('should return string splicing tax from it for Local tax', angular.mock.inject(function($filter){
		var data = {
			type: 'Local tax',
			payDedCode:'GA',
			desc:'Local'
		}
		expect($filter('taxWithholdingDescFilter')(data)).toEqual('Local');
	}));
});
*/
