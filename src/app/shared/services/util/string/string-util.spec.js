'use strict';

var angular = require('angular');
require('angular-mocks');

var stringUtilService = require('./string-util.service');

describe('string-util service', function() {
	var stringUtil;

	beforeEach(function() {
		var moduleName = 'trinet.shared.services.util.string-util';

		angular
			.module(moduleName, [])
			.service('stringUtil', stringUtilService);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function(_stringUtil_) {
		stringUtil = _stringUtil_;
	}));

	it('should tell if a string is blank', function() {
		expect(stringUtil.isBlank(undefined)).toBeTruthy();
		expect(stringUtil.isBlank('')).toBeTruthy();
		expect(stringUtil.isBlank(' ')).toBeTruthy();
		expect(stringUtil.isBlank('asdf')).toBeFalsy();
		expect(stringUtil.isBlank('     asdf     ')).toBeFalsy();
	});

	it('should join an array of strings with a comma separator by default', function() {
		var strings = ['Allen', 'Lin'];

		expect(stringUtil.join(strings)).toEqual('Allen, Lin');
	});

	it('should join an array of strings given a separator', function() {
		var strings = ['Allen', 'Lin'];

		expect(stringUtil.join(strings, '/')).toEqual('Allen/Lin');
	});

	it('should join an array of strings but ignore blanks, undefined, or null', function() {
		var strings = ['Allen', 'Lin', '', ' ', undefined, null];

		expect(stringUtil.join(strings, '|')).toEqual('Allen|Lin');
	});

	it('should format a string given a dictionary of keys', function() {
		var s = 'path/to/greenstack/{companyId}';
		var dict = { companyId: '3NQ' };

		expect(stringUtil.format(s, dict)).toEqual('path/to/greenstack/3NQ');
	});

	it('should not format a string if a dictionary is not provided', function() {
		var s = 'path/to/greenstack/{companyId}';

		expect(stringUtil.format(s, {})).toEqual(s);
		expect(stringUtil.format(s, undefined)).toEqual(s);
	});
});
