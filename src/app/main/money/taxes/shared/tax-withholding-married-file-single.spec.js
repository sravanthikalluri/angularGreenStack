'use strict'

var angular = require('angular');
require('angular-mocks');

var taxWithholdingMarriedFileSingleFilter = require('./tax-withholding-married-file-single.filter');
describe('Tax-Withholding-MarriedFileSingle filter', function() {
	beforeEach(function() {
		var moduleName = 'trinet.main.taxes.shared';

		angular
			.module(moduleName, [])
			.filter('taxWithholdingMarriedFileSingleFilter', taxWithholdingMarriedFileSingleFilter);

		angular.mock.module(moduleName);
	});

	it('should return yes if data is true', angular.mock.inject(function($filter){
		var data = true;
		expect($filter('taxWithholdingMarriedFileSingleFilter')(data)).toEqual('Yes');
	}));
});
