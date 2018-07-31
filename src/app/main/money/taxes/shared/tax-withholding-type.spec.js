'use strict'

var angular = require('angular');
require('angular-mocks');

var taxWithholdingTypeFilter = require('./tax-withholding-type.filter');
describe('Tax-Withholding-Type filter', function() {
	beforeEach(function() {
		var moduleName = 'trinet.main.taxes.shared';

		angular
			.module(moduleName, [])
			.filter('taxWithholdingTypeFilter', taxWithholdingTypeFilter);

		angular.mock.module(moduleName);
	});

	it('should return string splicing tax from it', angular.mock.inject(function($filter){
		var data = {
			type: 'State tax',
			payDedCode:'GA'
		}
		expect($filter('taxWithholdingTypeFilter')(data)).toEqual('GA State');
	}));
});
