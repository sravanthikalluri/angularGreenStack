/**
 * Created by Krishnam Raju on 8/18/2017.
 */
'use strict';

module.exports = {
	template: require('./tca-us.component.html'),
	controller: [tcaUsController],
	bindings: {
		accoridon:'&',
		data:'<',
		handbook:'&'
	}
};

function tcaUsController() {
	var ctrl = this;
	ctrl.accordionList =[
		{ id:1, name: "Co-Employment vs. Standard Employment", isOpen: false},
		{ id:2, name: "Privacy, Accuracy, Use, And Exchange Of Information", isOpen: false},
		{ id:3, name: "TriNet Payroll Services", isOpen: false},
		{ id:4, name: "TriNet Benefits",  isOpen: false},
		{ id:5, name: "TriNet's Employee Handbook",  isOpen: false},
		{ id:6, name: "At-Will Relationship", isOpen: false},
		{ id:7, name: "Confirmation Of Roles",  isOpen: false},
		{ id:8, name: "The TriNet Platform, Indemnification And Limits of Liability",  isOpen: false},
		{ id:9, name: "Dispute Resolution Protocol (&quot;DRP&quot;)", isOpen: false},
		{ id:10, name: "Acknowledgement",  isOpen: false}
	];
}
