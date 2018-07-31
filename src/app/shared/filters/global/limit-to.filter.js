/*Description : This is filter is used to slice the tiles array
 * Author : Raghavendra Kumar Bonthala
 */
'use strict';
module.exports = limitTo;
function limitTo() {
	return function (input, from, to) {
		return (input !== undefined) ? input.slice(from, to) : '';
	};
}
