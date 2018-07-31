'use strict';

/* @ngInject */
module.exports = function (){
	return function (acronym){
		if (!acronym) { return ''; }

		var matches = acronym.match(/\b(\w)/g);
		return matches.join('');
	};
};



