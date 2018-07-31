/*
'use strict';

var angular = require('angular');
require('angular-mocks');

var moment = require('moment');
/!*var stringUtil=require('string-util');*!/
/!*
var gso=require('../../services/gso');
*!/

var serviceDate = require('./service-date.filter');
var stringUtil = require('../../services/util/string/string-util.service');

describe('serviceDate filter', function() {
	beforeEach(function() {
		var mockMomentService = function() {
			return function(dateString) {
				return moment(dateString);
			};
		};

		var mockStringUtil=function(){
			return {};
		};

		var mockGso=function(){
			return {};
		};

		var moduleName = 'trinet.shared.filters.service-date';

		angular
			.module(moduleName, [])
			.service('moment', mockMomentService)
			.service('stringUtil',mockStringUtil)
			.service('gso',mockGso)
			.filter('serviceDate', serviceDate);

		angular.mock.module(moduleName);
	});







	it('should return the service date with company', angular.mock.inject(function($filter) {
		var args=[{
			company: "companyName",
			date: "JANUARY 27,2017"
		}];

		/!*var s=stringUtil.format('With {company} since {date}', args);*!/
		expect($filter('serviceDate')('companyName','JANUARY 27,2017')).toEqual('With {company} since {date}') ;


		/!*var s=stringUtil.format('With {company} since {date}', args);
		console.log(s,"stringUtil");
		expect($filter('serviceDate')('2017-02-24')).toEquals('With {company} since {date}') ;*!/





	}));
});
*/
