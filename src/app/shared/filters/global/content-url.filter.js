/*Description : This is filter to add break tag in html content filters
 * Author : Raghavendra Kumar Bonthala
 */
'use strict';
module.exports = contentUrlFilter;
/* To filter relative urls from absolute urls */
function contentUrlFilter() {
	return function (docUrl) {
		/* You'll need to implement .startsWith yourself for  Internet Explorer*/
		if (!String.prototype.startsWith) {
			String.prototype.startsWith = function(searchString, position) {
				position = position || 0;
				return this.indexOf(searchString, position) === position;
			};
		}

		if (docUrl !== undefined) {
			if (docUrl !== null && docUrl.startsWith('/')) {
				docUrl = "/api-content" + docUrl;
			}
		}
		return docUrl;
	};
}
