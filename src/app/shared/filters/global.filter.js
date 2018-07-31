/*Description : This is filter file contains different common type filters for all modules
 * Author : Raghavendra Kumar Bonthala
 */
'use strict';
module.exports = contentUrlFilter;
/* To filter relative urls from absolute urls */
function contentUrlFilter() {
    return function (docUrl) {
        if (docUrl !== undefined) {
            if (docUrl !== null && docUrl.startsWith('/')) {
                docUrl = "/api-content" + docUrl;
            }
        }
        return docUrl;
    };
}
