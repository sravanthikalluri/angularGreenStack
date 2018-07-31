'use strict'

var angular = require('angular');
require('angular-mocks');

var ContactRelationshipFilter = require('./contact-relationship.filter');

describe('contact-relationship filter', function() {
	beforeEach(function() {
		var obj = {
			'DS': 'DS',
			moduleName: 'trinet.shared.filters.contact-relationship',
			mockDSservice: function(){
				return{}
			},
			locals: {}
		};

		angular
			.module(obj.moduleName, [])
			.service(obj['DS'],obj.mockDSservice)
			.filter('ContactRelationshipFilter', ContactRelationshipFilter);

		angular.mock.module(obj.moduleName);
	});

	it('should return checked unchecked items', angular.mock.inject(function($filter,DS) {

	}));
});
