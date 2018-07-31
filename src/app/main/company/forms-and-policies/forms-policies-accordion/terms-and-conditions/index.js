'use strict';

var angular = require('angular');
var moduleName = 'app.main.company.terms-and-conditions';

module.exports = moduleName;

angular.module(moduleName, [])
	.component('termsAndConditions', require('./terms-and-conditions.component'))
	.component('tcaAllOther', require("./tca-all-other/tca-all-other.component"))
	.component('tcaSoi', require("./tca-soi/tca-soi.component"))
	.component('tcaCa', require("./tca-ca/tca-ca.component"))
	.component('tcaK1eK1d', require("./tca-k1e-k1d/tca-k1e-k1d.component"))
	.component('tcaUS',  require("./tca-us/tca-us.component"))
	.component('tcaUsAcd', require("./tca-us-acd/tca-us-acd.component"))
	.component('tcaUsAmd', require("./tca-us-amd/tca-us-amd.component"))
	.component('tcaUsk1', require("./tca-us-k1/tca-us-k1.component"))
	.component('tcaCpeo', require("./tca-cpeo/tca-cpeo.component"))
	.component('tcaCpeoSpecta', require("./tca-cpeo-specta/tca-cpeo-specta.component"))
	.component('tcaCpeoTa', require("./tca-cpeo-ta/tca-cpeo-ta.component"))
	.component('tcaUniversal', require("./tca-universal/tca-universal.component"));
