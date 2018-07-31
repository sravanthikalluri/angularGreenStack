/**
 * Created by Krishnam Raju on 2/16/2017.
 */
'use strict';

var angular = require('angular');
var acaMarketplace = require('./aca-marketplace.component');

var moduleName = 'app.main.benefits.aca-marketplace';

module.exports = moduleName;

angular
	.module(moduleName, [])
	.component('acaMarketPlace', acaMarketplace);
