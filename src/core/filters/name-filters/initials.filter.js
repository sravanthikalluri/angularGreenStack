'use strict';

/* @ngInject */
module.exports = function (){
	return function (fullName){
		if (!fullName) {
			return '';
		}else{
			var str = fullName.replace(/\s+/g, " ");
			str = str.split(' ');
				if (str.length >= 3) {
					str = ((str[0])[0] + (str[2])[0]).toUpperCase();
				} else if (str.length >= 2) {
					str = ((str[0])[0] + (str[1])[0]).toUpperCase();
				}

			return str;
		}
	};
};
