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
          var string1 = 'State Tax';
		 expect($filter('taxWithholdingDescFilter')(string1)).toEqual('State');
	}));
});
