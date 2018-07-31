'use strict';

require('./carrier-websites.component.scss');

module.exports = {
	templateUrl: 'app/main/benefits/resources/additional-resources/carrier-websites/carrier-websites.component.html',
	controller: ['DS',CarrierWebsitesController],
	bindings : {
		data:'<'
	}
};
/* @ngInject */
function CarrierWebsitesController(DS) {
	var ctrl = this;
	ctrl.$onInit=function(){

	}
	ctrl.getPdfLink = function (num) {
		return new Array(num);
	};
}
