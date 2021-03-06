'use strict';

var angular = require('angular');
require('angular-mocks');

var namesFilter = require('./names.filter');

describe('Names filter', function() {
	beforeEach(function() {

		var moduleName = 'trinet.shared.filters.profile';

		angular
			.module(moduleName, [])
			.filter('namesFilter', namesFilter);

		angular.mock.module(moduleName);
	});

 	it('should return each one object of primary and preferred', angular.mock.inject(function($filter) {
        var items = [{nameType: 'PRF'}, {nameType: 'PRI'}, {nameType: 'PRT'}];
        expect($filter('namesFilter')(items)).toEqual([[{nameType: 'PRI'}], [{nameType: 'PRF'}]]);
    }));

    it('should return each one object of primary and preferred', angular.mock.inject(function($filter) {
        var items = [{nameType: 'PRFF'}, {nameType: 'PRII'}, {nameType: 'PRTD'}];
        expect($filter('namesFilter')(items)).toEqual([[], []]);
    }));

    it('should return empty arrays of primary and preferred', angular.mock.inject(function($filter) {
        var items = [];
        expect($filter('namesFilter')(items)).toEqual([[], []]);
    }));

    it('should return one object preferredNames', angular.mock.inject(function($filter) {
        var items = [{nameType: 'PRF'}];
        expect($filter('namesFilter')(items)).toEqual([[], [{nameType: 'PRF'}]]);
    }));

    it('should return one object primaryNames', angular.mock.inject(function($filter) {
        var items = [{nameType: 'PRI'}];
        expect($filter('namesFilter')(items)).toEqual([[{nameType: 'PRI'}], []]);
    }));

});
