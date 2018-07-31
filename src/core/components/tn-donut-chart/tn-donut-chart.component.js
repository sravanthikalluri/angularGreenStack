'use strict';

require('./tn-donut-chart.component.scss');
var d3 = require('d3');

module.exports = TnDonutChartDirective;

function TnDonutChartDirective() {
	return {
		template: require('./tn-donut-chart.component.html'),
		scope: {
			values: '=',
			colors: '=',
			label: '@'
		},
		link: function(scope, element, attrs) {
			scope.drawChart = function(data) {
				//If updating look for existing svg and remove it
				if(element[0].childNodes[1]) {
					element[0].removeChild(element[0].childNodes[1]);
				}

				//Calculate the length of the total and adjust the size of the chart. Min = 150px
				var total = data.values.reduce(function(a, b) { return a+b;}).toFixed(2);
				var size = Math.max(total.toString().length / .058888, 150);

				// Attach to SVG element in HTML template
				var svg = d3.select(element[0])
					.append('svg')
					.attr('class', 'tn-donut-chart')
					.attr('width', size)
					.attr('height', size);

				// Dimensions
				var width = +svg.attr('width');
				var height = +svg.attr('height');
				var radius = Math.min(width, height) / 2;
				var g = svg.append('g').attr('transform', 'translate(' + width/2 + ',' + height/2 + ')');

				// Scales
				var color = d3.scaleOrdinal()
					.range(data.colors)
					.domain(data.colors.length);

				// Labels
				var formatCurrency = d3.format('$,.2f');
				var text = g.append('text')
					.style('text-anchor', 'middle');

				text.append('tspan')
					.attr('x', 0)
					.attr('dy', -5)
					.attr('class', 'amount')
					.text(function() { return formatCurrency(total); });

				text.append('tspan')
					.attr('x', 0)
					.attr('dy', 24)
					.attr('class', 'label')
					.text(function() { return data.label; });

				// Pie & Pie Data
				var pie = d3.pie()
					.sort(null)
					.value(function(d) { return d; });
				var pieData = pie(data.values);

				// Determine size of arcs
				var arc = d3.arc()
					.outerRadius(radius)
					.innerRadius(radius-20);

				// Draw arcs
				var i = 0;
				var arcs = g.selectAll('.arc')
					.data(pieData)
					.enter()
					.append('g')
					.attr('class','arc')
					.attr('id',function(d) { return d.data; });

				arcs.append('path')
					.attr('d',arc)
					.attr('fill',function(d) { return data.colors[i++]; });
			}

			scope.init = function() {
				scope.drawChart(scope)
			};

			scope.$watch('values', function(){scope.init()}, true);
		}
	};
}
