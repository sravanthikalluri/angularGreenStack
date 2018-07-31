
'use strict';

var angular = require('angular');
var fsaCalculator = require('./fsa-calculator.component');
var dcCalculatorComponent = require('./dc-calculator/dc-calculator.component');
var dcCalculatorService = require('./dc-calculator/dc-calculator.service');
var hcCalculatorComponent = require('./hc-calculator/hc-calculator.component');
var hcCalculatorService = require('./hc-calculator/hc-calculator.service');

var moduleName = 'app.main.benefits.fsa-calculator';

module.exports = moduleName;

angular
	.module(moduleName, [])
	.component('fsaCalculator', fsaCalculator)
	.component('dcCalculator', dcCalculatorComponent)
	.service('dcCalculatorService', dcCalculatorService)
	.component('hcCalculator', hcCalculatorComponent)
	.service('hcCalculatorService', hcCalculatorService)
