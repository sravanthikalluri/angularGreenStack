/*Description : This is filter class contains different data type filters for employee module
 * Author : Raghavendra Kumar Bonthala
 */

'use strict';
module.exports = status;
function status() {
    return function (statusValue) {
        if (statusValue === "Begin") {
            return 'Ongoing';
        }
        else if (statusValue === "End") {
            return 'Ended';
        }
    };
}

