/*Description : This is filter file contains different data type filters for home module
 * Author : Raghavendra Kumar Bonthala
 */
'use strict';
module.exports = startFrom;
/* Made changes for pagination and drag and drop [Begin] */
function startFrom() {
    return function (input, id) {
        if (id === 0) {
            id = ++id;
            return input.slice(id);
        }
    };
}
/* Made changes for pagination and drag and drop [End] */
