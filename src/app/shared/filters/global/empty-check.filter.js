/*Description : This is filter file contains empty check filter
 * Author : Raghavendra Kumar Bonthala
 */
'use strict';
module.exports = emptyCheckFilter;
/* To filter relative urls from absolute urls */
function emptyCheckFilter() {
	return function (data, defaultVal) {
		var returnVal = true;
		if (defaultVal) {
			returnVal = defaultVal;
		}
		try {
			if (data === null) {
				return returnVal;
			}
			else if (typeof(data) === 'undefined') {
				return returnVal;
			}
			else if (data.length === 0) {
				return returnVal;
			}
			else if (typeof (data) === 'string') {
				if (data === '' || data === '-' || data === 'Data Unavailable' || data === "Unknown") {
					return returnVal;
				}
				else {
					return defaultVal ? data : false;
				}
			}
			else if (typeof(data) === 'object') {
				if (Object.prototype.toString.call(data) === '[object Date]') {
					return defaultVal ? data : false;
				}
				var count = 0;
				for (var k in data) {
					if (data.hasOwnProperty(k)) {
						count++;
					}
				}
				if (count === 0) {
					return defaultVal ? data : false;
				}
			}
			return defaultVal ? data : false;
		} catch (e) {
		}

		return returnVal;
	};
}
