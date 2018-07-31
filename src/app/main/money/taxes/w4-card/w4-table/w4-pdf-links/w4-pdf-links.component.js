'use strict';

require('./w4-pdf-links.component.scss');

module.exports = {
	template: require('./w4-pdf-links.component.html'),
	controller: W4PDFLinksController,
	bindings: {
		isPdfAvailable: '<',
		pdfData: '<'
	}
};

function W4PDFLinksController(){
	var ctrl = this;

	ctrl.pdfUrls = [];

	ctrl.$onInit = function() {
		Array.isArray(ctrl.pdfData) ? ctrl.pdfUrls = ctrl.pdfData : ctrl.pdfUrls.push(ctrl.pdfData)
	};

}

