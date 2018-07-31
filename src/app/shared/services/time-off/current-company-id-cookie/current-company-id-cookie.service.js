'use strict';

module.exports = CurrentCompanyIdCookieService;

/* @ngInject */
function CurrentCompanyIdCookieService($cookies) {
	var me = this;
	var cookieName = 'CurrentCompanyId';
	var cookieOptions = {
		path: '/',
		domain: '.hrpassport.com'
	};

	me.createCurrentCompanyIdCookie = function(companyId) {
		me.deleteCurrentCompanyIdCookie();
		$cookies.put(cookieName, companyId, cookieOptions);
	};

	me.deleteCurrentCompanyIdCookie = function() {
		$cookies.remove(cookieName, cookieOptions);
	};

	return me;
}
