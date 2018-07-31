'use strict';

module.exports = StringUtilService;

/* @ngInject */
function StringUtilService() {
	var me = this;

	me.isBlank = function(s) {
		if (!s) {
			return true;
		}

		if (s.trim().length < 1) {
			return true;
		}

		return false;
	};

	me.join = function(strings, separator) {
		separator = separator || ', ';

		return strings
			.filter(function(s) { return !me.isBlank(s); })
			.join(separator);
	};

	me.format = function(s, args) {
		//utilService.toggleDIV('appLoader', true);
		for (var arg in args) {
			s = s.replace(RegExp("\\{" + arg + "\\}", "gi"), args[arg]);
		}
       	return s;
	};

	return me;
}
