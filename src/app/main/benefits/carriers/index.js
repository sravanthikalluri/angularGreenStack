var carriers = require('./carriers.component');
var moduleName = 'app.main.benefits.carriers';

module.exports = moduleName;

angular
	.module(moduleName, [])
	.component('carriers', carriers);
