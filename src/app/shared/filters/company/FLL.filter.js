/*Description : This is filter file contains different data type filters for company module
 * Author : Raghavendra Kumar Bonthala
 */
'use strict';
module.exports = FLLFilters;
function FLLFilters() {
    return function (collectName) {
        if (typeof collectName === 'undefined') {
            return '';
        }
        var headerNameSplit = collectName.split(' ');
        return headerNameSplit[0].charAt(0).toUpperCase() + "  " + headerNameSplit[1].charAt(0).toUpperCase();
    };
}
