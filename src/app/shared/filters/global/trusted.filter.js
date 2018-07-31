/*Description : This is filter is used to return the trusted url
 * Author : Raghavendra Kumar Bonthala
 */
'use strict';
module.exports = trusted;
/**@ngInject**/
function trusted($sce) {
	return function (url) {
		return $sce.trustAsResourceUrl(url);
	};
}
