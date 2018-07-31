/*Description : This is filter file contains different data type filters for money module
 * Author : Raghavendra Kumar Bonthala
 */
'use strict';
module.exports = checkFilter;
/* This code for getting stars in account number */
function checkFilter() {
    return function (input) {
        if (typeof input !== 'undefined' && input !== null) {
            input = '**' + input.slice(-4);
            return input;
        }
    };
}
