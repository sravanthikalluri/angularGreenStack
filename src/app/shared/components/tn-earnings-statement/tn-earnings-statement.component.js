'use strict';

require('./tn-earnings-statement.component.scss');

module.exports = {
	template: require('./tn-earnings-statement.component.html'),
	controller: ['DS','$anchorScroll','$filter',TnEarningsStatementController],
	bindings: {
		dates: '<',
		load: '<',
		data: '<',
		showSpinner: '<'
	}
};

/* @ngInject */
function TnEarningsStatementController(DS,$anchorScroll,$filter) {
	var ctrl = this;
	ctrl.imageUrl = 'assets/images/Transamerica_logo.png';
	ctrl.witholdingTitles = ['Description', 'Current Taxes', 'Year to Date'];
		ctrl.ptoTitles = ['Description', 'Year to Date'];
		ctrl.totralGross = ['', 'Total Gross','Fed Taxable Gross','Total Taxes','Total Deductions','Net Pay'];
		ctrl.employerBenefitsTitles = ['Description', 'Current', 'Year To Date'];
		ctrl.direcitDepositTitles = ['Account Type', 'Account Number', 'Deposit Amount'];
		ctrl.earnTitles = ['Description', 'Rate', 'Hours', 'Units', 'Earnings', 'Hours', 'Units', 'Earnings'];
		ctrl.taxTitles = ['Description', 'Current', 'Year To Date', 'PLNTD'];
		ctrl.taxTitlesPost = ['Description', 'Current', 'Year To Date'];
		ctrl.taxDeductionsTitles = ['Description','Marital Status','Additional Amount','Additional Percentage','Allowances'];
		ctrl.taxAllowancesleftTitles = {
			taxWithHolding: 'TAX DATA',
			maritalStatus: 'Marital Status:',
			allowances: 'Allowances:',
			addlPct: 'Addl. Pct:',
			addlAmt: 'Addl. Amt:'
		};
		ctrl.titles = ['taxWithHolding','maritalStatus','allowances','addlPct','addlAmt'];


	ctrl.$onInit = function() {
		ctrl.date = ctrl.data.header.checkDt;
		ctrl.enableToolTips = true;
	};

	ctrl.onToggle = function(item,key){
		ctrl.enableToolTips = key;
	};
	ctrl.$onChanges = function () {
		$anchorScroll('main-content');
		ctrl.witholdingData = [];
		ctrl.ptosData = [];
		ctrl.employerBenefitsData = [];
		ctrl.directDepositData = [];
		ctrl.earnsData = [];
		ctrl.totals = [];
		ctrl.taxPre = [];
		ctrl.taxPost = [];
		ctrl.taxDeductions = [];
		ctrl.taxAllowances = [];
		ctrl.taxTotals = [];
		ctrl.totalsCurYDT = [];
		ctrl.netPayDistribution = [];

		if(ctrl.data !== undefined && ctrl.data.detail !== undefined){
			ctrl.header = ctrl.data.header;
			var obj = ctrl.data.detail.taxWithholdings;
			for (var i = obj.length - 1; i >= 0; i--) {
			    ctrl.witholdingData.push({
			    	taxDesc : obj[i].taxDesc,
			    	curTaxes : $filter('currency')(obj[i].curTaxes),
					ytdTaxes : $filter('currency')(obj[i].ytdTaxes)
			    });
			}
			ctrl.witholdingData.push({
				taxDesc  : "Total:",
				curTaxes : $filter('currency')(ctrl.data.detail.totals.curTaxes),
				ytdTaxes : $filter('currency')(ctrl.data.detail.totals.ytdTaxes)
			});

			if(ctrl.header.companyObj == null ){
				var peoAddress = "TriNet HR Corporation, 1100 San Leandro Blvd, Suite #400, San Leandro, CA 94577";
			}else{
				var peoAddress = ctrl.header.companyObj;
			}
			ctrl.peoAddress = peoAddress.split(",");
			// peoAddress[1] for example like Inc or Inc. or Ltd then return true else false
			ctrl.peoAbbreviateName = ctrl.peoAddress[1].length <= 4 ? true : false;

			var peoDesc = ctrl.header.peoDesc;
			var phoneNumIndex = peoDesc.indexOf("(");
			var fullLength = peoDesc.length;
			ctrl.peoDesc1 = peoDesc.substring(0,phoneNumIndex);
			ctrl.peoDesc2 = peoDesc.substring(phoneNumIndex,fullLength);

			obj = ctrl.data.detail.ptos;
			var myColData = [
               {value:"begBal",name: "Start Balance:"},
               {value:"earned", name: "+ Earned"},
			   {value:"taken",name: "- Taken"},
               {value:"adjust",name: "+ Adjustments"},
               {value:"endBal",name: "End Balance"}
			];

			for(var i=0;i<obj.length;i++)
			{
				ctrl.ptosData[i]=new Array();
				ctrl.ptosData[i].Title=obj[i].desc;
				for (var property in obj[i]) {
                  var data =  myColData.filter(function(item){return item.value == property;});
			      if(data.length > 0){
			     		ctrl.ptosData[i].push({
			        	desc : data[0].name,
				    	value: obj[i][property]
			       });
					}
				}
			}

			obj = ctrl.data.detail.employerBenefits.reverse();
			for (var i = obj.length - 1; i >= 0; i--) {
			    ctrl.employerBenefitsData.push({
			    	desc : obj[i].desc,
			    	curEmpBenf :$filter('currency')(obj[i].curEmpBenf),
					ytdEmpBenf : $filter('currency')(obj[i].ytdEmpBenf)
			    });
			}
			ctrl.employerBenefitsData.push({
				taxDesc  : "Total:",
				curEmpBenf : $filter('currency')(ctrl.data.detail.totals.curEmpBenf),
				ytdEmpBenf : $filter('currency')(ctrl.data.detail.totals.ytdEmpBenf)
			});
			obj = ctrl.data.detail.directDepositDistributions;
			for (var i = obj.length - 1; i >= 0; i--) {
			    ctrl.directDepositData.push({
			    	acctType : obj[i].acctType,
					acctNum : obj[i].acctNum,
					depositAmount : $filter('currency')(obj[i].depositAmount)
			    });
			}
			ctrl.directDepositData.push({
			    acctType : "Total:",
					acctNum : "",
					depositAmount : $filter('currency')(ctrl.data.detail.totals.totDirectDeposit)
			});
			ctrl.earnsData.push(ctrl.earnTitles);
			obj = ctrl.data.detail.earns;
			var curEarnUnits="0.0",curytdEarnsUnits="0.0",curTotals="0",ytdTotals="0",pieceRateFlag = 'N',ytdUnitsTotals="0.0",curUnitsTotals="0.0";
			for (var i = obj.length - 1; i >= 0; i--) {
				if(obj[i].pieceRateHours === 'Y' || obj[i].pieceRateHours === 'y'){
					pieceRateFlag = 'Y'
					curEarnUnits = obj[i].curEarnsHours;
					curytdEarnsUnits = obj[i].ytdEarnsHours;
					curUnitsTotals = parseFloat(curUnitsTotals) + parseFloat(obj[i].curEarnsHours);
					ytdUnitsTotals = parseFloat(ytdUnitsTotals) + parseFloat(obj[i].ytdEarnsHours);
					obj[i].curEarnsHours = "0.0";
					obj[i].ytdEarnsHours = "0.0";
				}else{
					curEarnUnits="0.0";
					curytdEarnsUnits="0.0";
					curTotals = parseFloat(curTotals) + parseFloat(obj[i].curEarnsHours);
					ytdTotals = parseFloat(ytdTotals) + parseFloat(obj[i].ytdEarnsHours);
				}
			    ctrl.earnsData.push({
			    	desc : obj[i].curEarnsDesc,
			    	curEarnsRate : $filter('currency')(obj[i].curEarnsRate),
			    	curEarnsHours : $filter('number')(obj[i].curEarnsHours),
			    	curEarnsUnits : $filter('number')(curEarnUnits),
			    	curEarnsEarn : $filter('currency')(obj[i].curEarnsEarn),
					ytdEarnsHours : $filter('number')(obj[i].ytdEarnsHours),
					ytdEarnsUnits : $filter('number')(curytdEarnsUnits),
					ytdEarnsEarn : $filter('currency')(obj[i].ytdEarnsEarn)
			    });
			}
			ctrl.earnsData.push({
				desc: 'Total:',
				blank: '',
				curHour: (pieceRateFlag === 'Y') ? curTotals : ctrl.data.detail.totals.curHour,
				blank1: curUnitsTotals,
				curGross: $filter('currency')(ctrl.data.detail.totals.curGross),
				blank2:  (pieceRateFlag === 'Y') ? ytdTotals : ctrl.data.detail.totals.ytdHrsEarn,
				blank3: ytdUnitsTotals,
				ytdGross: $filter('currency')(ctrl.data.detail.totals.ytdGross),

			});

			/*ctrl.earnsData.push({
				desc: 'Fed Taxable Gross',
				blank: '',
				blank2: '',
				curGross: $filter('currency')(ctrl.data.detail.totals.curFedTaxableGross),
				blank3: '',
				ytdGross: $filter('currency')(ctrl.data.detail.totals.ytdFedTaxableGross),
			});*/
			ctrl.totals.push(ctrl.data.detail.totals);
			ctrl.taxPre.push(ctrl.taxTitles);
			ctrl.taxPost.push(ctrl.taxTitlesPost);

			obj = ctrl.data.detail.preTaxDedns.reverse();
			for (var i = obj.length - 1; i >= 0; i--) {
			    ctrl.taxPre.push({
			    	desc : obj[i].desc,
			    	curDedns : $filter('currency')(obj[i].curDedns),
					ytdDedns : $filter('currency')(obj[i].ytdDedns),
					pytdDedns : $filter('currency')(obj[i].pytdDedns)
			    });
			}
			ctrl.taxPre.push({
				desc: 'Total:',
				curPreDedn: $filter('currency')(ctrl.data.detail.totals.curPreDedn),
				ytdPreDedn: $filter('currency')(ctrl.data.detail.totals.ytdPreDedn),
				ytdPreDDedn: $filter('currency')(ctrl.data.detail.totals.ytdPreDDedn),
			});

			obj = ctrl.data.detail.postTaxDedns.reverse();
			for (var i = obj.length - 1; i >= 0; i--) {
			    ctrl.taxPost.push({
			    	desc : obj[i].desc,
			    	curDedns : $filter('currency')(obj[i].curDedns),
					ytdDedns : $filter('currency')(obj[i].ytdDedns)
			    });
			}
			ctrl.taxPost.push({
				desc: 'Total:',
				curDedns: $filter('currency')(ctrl.data.detail.totals.curPostDedn),
				ytdPostDedn: $filter('currency')(ctrl.data.detail.totals.ytdPostDedn)
			});
			ctrl.taxTotals.push({
				desc: 'Total:',
				curTotalDedn: $filter('currency')(ctrl.data.detail.totals.curTotalDedn),
				ytdTotalDedn: $filter('currency')(ctrl.data.detail.totals.ytdTotalDedn),
				ytdPreDDedn: $filter('currency')(ctrl.data.detail.totals.ytdPreDDedn),
			});

			var getObj = function (key) {
               return ctrl.data.detail.taxData.map(function (obj) {
                  return obj[key];
               });
            }
            ctrl.titles.map(function (title) {
               var obj = {};
               getObj(title).map(function (value, index) {
                 obj['header'] = ctrl.taxAllowancesleftTitles[title];
                 obj['section'+index] = value;
               })
               ctrl.taxAllowances.push(obj);
            })


            obj = ctrl.data.detail.totals;
            ctrl.totalsCurYDT.push({
				taxDesc  : "Current",
				curGross : $filter('currency')(ctrl.data.detail.totals.curGross),
				curFedTaxableGross : $filter('currency')(ctrl.data.detail.totals.curFedTaxableGross),
				curTaxes : $filter('currency')(ctrl.data.detail.totals.curTaxes),
				curTotalDedn : $filter('currency')(ctrl.data.detail.totals.curTotalDedn),
				curNetPay : $filter('currency')(ctrl.data.detail.totals.curNetPay),

			});
			ctrl.totalsCurYDT.push({
				taxDesc  : "YTD",
				ytdGross : $filter('currency')(ctrl.data.detail.totals.ytdGross),
				ytdFedTaxableGross : $filter('currency')(ctrl.data.detail.totals.ytdFedTaxableGross),
				ytdTaxes : $filter('currency')(ctrl.data.detail.totals.ytdTaxes),
				ytdTotalDedn : $filter('currency')(ctrl.data.detail.totals.ytdTotalDedn),
				ytdNetPay : $filter('currency')(ctrl.data.detail.totals.ytdNetPay),
			});

            obj = ctrl.data.detail.netPayDistributions;
			for (var i = obj.length - 1; i >= 0; i--) {
			    ctrl.netPayDistribution.push({
			    	desc : obj[i].desc +" #"+ obj[i].refNum,
			        depositAmt:obj[i].depositAmt
			    });
			}
			ctrl.netPayDistribution.push({
				desc  : "Total:",
				depositAmt : $filter('currency')(ctrl.data.detail.totals.curNetPay),
			});

		}
	};
	ctrl.getColors = function(color){
		return color + "," + LightenDarkenColor(color, 30);
	}
	 ctrl.updateHeadingsBackground = function(color) {
		  var styles = {};
		  styles['background'] =  '+ ctrl.color+ ';
		  styles['background'] = '-webkit-linear-gradient(to right,'+ctrl.getColors(color)+')';
		  styles['background'] = '-o-linear-gradient(to right,'+ctrl.getColors(color)+')';
		  styles['background'] = '-moz-linear-gradient(to right,'+ctrl.getColors(color)+')';
		  styles['background'] = 'linear-gradient(to right,'+ctrl.getColors(color)+')';
		  styles['color'] = 'white';
		  return styles;
	  };
	  function LightenDarkenColor(col, amt) {

      	var usePound = false;

      	if (col && col[0] == "#") {
      		col = col.slice(1);
      		usePound = true;
      	}

      	var num = parseInt(col,16);

      	var r = (num >> 16) + amt;

      	if (r > 255) r = 255;
      	else if  (r < 0) r = 0;

      	var b = ((num >> 8) & 0x00FF) + amt;

      	if (b > 255) b = 255;
      	else if  (b < 0) b = 0;

      	var g = (num & 0x0000FF) + amt;

      	if (g > 255) g = 255;
      	else if (g < 0) g = 0;

      	return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
      }
}
