'use strict';

module.exports = ServiceDateFilter;

/* @ngInject */
function ServiceDateFilter(moment, stringUtil, gso) {
	return function(dateString) {
		var args = {
			company : gso.getAppConfig().companyName,
			date    : moment(dateString).format('MMM D, YYYY')
		};

		return stringUtil.format('With {company} since {date}', args);
	}
}
