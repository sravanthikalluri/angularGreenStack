/*Description : Format the phone number for displaying MFA
 * Author : Venkat Masula
 */
'use strict';
module.exports = telMfaFormat;
function telMfaFormat() {
	return function (value) {
		if (!value) { return ''; }

		if (!angular.isUndefined(value) && value != null) {

			var phoneValue = value.replace(/[()\-+ ]/g, '');
			var formattedValue = value;
			var regexp = /^\d+$/;
			if (regexp.test(phoneValue)) {
				if (phoneValue.length == 11) {
					phoneValue = phoneValue.substr(1);
				}
				if (phoneValue.length == 10 && phoneValue[0] != '1' && phoneValue[0] != '0') {
					formattedValue = "(" + phoneValue.substr(0, 3) + ") " + phoneValue.substr(3, 3) + "-" + phoneValue.substr(6);
				}
			}
			return formattedValue;
		}
	};
}
