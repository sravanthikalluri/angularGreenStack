'use strict';

module.exports = ContactRelationshipFilter;

/* @ngInject */
function ContactRelationshipFilter(DS) {
	var CONTACT_RELATIONSHIPS = DS.getAll('relation-ships')[0].relationShips;
	return function(key) {
		var obj = CONTACT_RELATIONSHIPS.filter(function(d) { return d.key === key; })[0];
		return (obj ? obj.value : key);
	}
}
