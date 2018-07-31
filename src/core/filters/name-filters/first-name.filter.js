'use strict';

/* @ngInject */
module.exports = function (){
	return function (fullName){
		if(fullName) {
			return fullName.split(' ')[0];
		} else {
			return '';
		}
	};
};
