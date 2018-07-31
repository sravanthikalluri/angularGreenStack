var healthCounseling = require('./health-and-counseling.component');
var moduleName = 'app.main.benefits.health-and-counseling';

module.exports = moduleName;

angular
	.module(moduleName, [])
	.component('healthAndCounseling', healthCounseling);
