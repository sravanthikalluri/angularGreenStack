/**
 * Created by Krishnam Raju on 8/18/2017.
 */
'use strict';

module.exports = {
	template: require('./tca-all-other.component.html'),
	controller: [tcaAllOtherController],
	bindings: {
		accoridon:'&',
		data:'<'
	}
};

function tcaAllOtherController() {
	var ctrl = this;
	ctrl.accordionList =[
			{ id:1, name: "Privacy, Accuracy, Use, And Exchange Of Information", isOpen: false},
			{ id:2, name: "The TriNet Platform, Indemnification And Limits of Liability",isOpen: false},
			{ id:3, name: "Dispute Resolution Protocol (&quot;DRP&quot;)", isOpen: false},
			{ id:4, name: "Acknowledgement", isOpen: false}
		];
}
