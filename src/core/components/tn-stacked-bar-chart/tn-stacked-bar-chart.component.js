'use strict';

require('./tn-stacked-bar-chart.component.scss');
var d3 = require('d3');

module.exports = TnStackedBarChartDirective;

function TnStackedBarChartDirective() {
	return {
		template: require('./tn-stacked-bar-chart.component.html'),
		scope: {
			data: '='
		},
		link: function(scope, elem, attrs) {
			scope.createTooltip = function() {
				var tooltipTpl = [
					'<div class="tsbc-tooltip is-hidden">',
						'<div class="tsbc-tooltip-date"></div>',
						'<div class="tsbc-tooltip-amount"></div>',
					'</div>'
				].join('');

				elem.append(tooltipTpl);
			};

			scope.drawChart = function(data) {
				var svg = d3.select(elem[0]).append('svg')
					.attr('class', 'tn-stacked-bar-chart')
					.attr('width', 400)
					.attr('height', 250);

				// Dimensions
				var margin = {top: 20, right: 20, bottom: 30, left: 40};
				var width = +svg.attr('width') - margin.left - margin.right;
				var height = +svg.attr('height') - margin.top - margin.bottom;
				var g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

				// Data
				var formatTime = d3.timeFormat('%b %e');
				var formatCurrency = d3.format('$.2s');
				var keys = ['netPay', 'bonus'];
				var stack = d3.stack().keys(keys);
				var dataset = stack(data);

				// Scales
				var amtOffset = 1000;
				var xData = data.map(function(d) { return d.date; });
				xData.sort(function(a, b) { return a > b; });

				var x = d3.scaleBand()
				    .rangeRound([0, width])
				    .padding(0.6)
				    .align(0.1)
				    .domain(xData);
				var maxY = d3.max(data, function(d) { return d.netPay + d.bonus + amtOffset; });
				var y = d3.scaleLinear()
				    .rangeRound([height, 0])
				    .domain([0, maxY]).nice();
				var z = d3.scaleOrdinal()
				    .range(['#46B26D', '#8ACF75'])
				    .domain(keys.length);

				// Tooltip
				var tooltip = d3.select('.tsbc-tooltip');

				// Bars
				g.append('g').attr('class', 'series-bg')
					.selectAll('.series-bg')
					.data(data)
					.enter().append('rect')
						.attr('x', function(d) { return x(d.date); })
						.attr('y', 0)
						.attr('width', x.bandwidth())
						.attr('height', height);

				g.selectAll('.series')
				    .data(dataset)
				    .enter().append('g')
						.attr('class', 'series')
						.attr('fill', function(d) { return z(d.key); })
				    .selectAll('rect')
				    .data(function(d) { return d; })
				    .enter().append('rect')
						.attr('x', function(d) { return x(d.data.date); })
						.attr('y', function(d) { return y(d[1]); })
						.attr('height', function(d) { return y(d[0]) - y(d[1]); })
						.attr('width', x.bandwidth())
						.on('mouseover', function(d) {
							//Get this bar's x/y values, then augment for the tooltip
							var xPos = parseFloat(d3.select(this).attr('x')) + x.bandwidth() / 2;
							var yPos = y(d.data.netPay + d.data.bonus);
							var date = formatTime(d.data.date);
							var netPay = formatCurrency(d.data.netPay);
							var bonus = ', ' + formatCurrency(d.data.bonus) + ' bonus';

							//Update the tooltip position and value
							tooltip
								.style('left', xPos + 'px')
								.style('top', yPos + 'px')

							tooltip.select('.tsbc-tooltip-date')
							  	.text(date);
							tooltip.select('.tsbc-tooltip-amount')
							  	.text(netPay);

							//Show the tooltip
							tooltip.classed('is-hidden', false);
						})
						.on('mouseout', function(d) {
							tooltip.classed('is-hidden', true);
						});

				// X Axis
				g.append('g')
					.attr('class', 'axis axis-x')
					.attr('transform', 'translate(0,' + height + ')')
					.call(d3.axisBottom(x).tickFormat(formatTime));

				// Y Axis
				g.append('g')
					.attr('class', 'axis axis-y')
					.call(d3.axisLeft(y).ticks(5, 's'))
					.append('text')
						.attr('x', 2)
						.attr('y', y(y.ticks(5).pop()))
						.attr('dy', '0.35em')
						.attr('text-anchor', 'start');
			};

			scope.init = function() {
				scope.createTooltip();
				scope.drawChart(scope.data);
			};

			scope.init();
		}
	};
}
