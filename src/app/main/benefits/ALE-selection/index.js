var aleselection = require('./ale-selection-component');
var moduleName = 'app.main.benefits.ALE-selection';

module.exports = moduleName;

angular
	.module(moduleName, [])
	.component('aleselection', aleselection)
	.component('aleYesSelection', require('./ale-yes-selection/ale-yes-selection.component'))
	.component('aleNoSelection', require('./ale-no-selection/ale-no-selection.component'));
