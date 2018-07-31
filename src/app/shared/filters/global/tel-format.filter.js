/*Description : This is filter is used to format the phone number
 * Author : Raghavendra Kumar Bonthala
 */
'use strict';
module.exports = telFormat;
function telFormat() {
	return function (tel) {
		if (!tel) { return ''; }

		var value = tel.toString().trim().replace(/^\+/, '');

		if (value.match(/[^0-9]/)) {
			return tel;
		}

		var country, city, number,formatNumber;

		switch (value.length) {
			case 10:
				country = '';
				city = value.slice(0, 3);
				number = value.slice(3);
				break;

			case 11:
				country = value[0];
				city = value.slice(1, 4);
				number = value.slice(4);
				break;

			case 12:
				country = value.slice(0, 3);
				city = value.slice(3, 5);
				number = value.slice(5);
				break;

			default:
				return tel;
		}

		number = number.slice(0, 3) + '-' + number.slice(3);

		if (country === '') {
			formatNumber = (city +'-'+ number).trim();
		}else{
			formatNumber = (country + "-" + city + "-" + number).trim();
		}

		return formatNumber;


	};
}
