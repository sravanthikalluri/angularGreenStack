'use strict';

require('./tn-retirement-card.component.scss');

module.exports = {
	templateUrl: 'app/shared/components/tn-retirement-card/tn-retirement-card.component.html',
	controller: TnRetirementCardController
};

var d3 = require('d3');

function TnRetirementCardController() {
    //Make an SVG Container for Rectangle
    var svgContainer = d3.select("svg.rectangle")
                         .attr("width", 300)
                         .attr("height", 200);
    //Draw Rectangle
    drawRectangle(svgContainer,10,10,170,30,'rgb(114,199,107)');
    //Draw Rectangle
    drawRectangle(svgContainer,180,10,70,30,'rgb(59,153,89)');
    //Draw Rectangle
    drawRectangle(svgContainer,10,90,30,30,'rgb(114,199,107)');
    //Text
    drawText(svgContainer,60,102,"$2,638","600",14);
    //Text
    drawText(svgContainer,60,117,"Your Contribution","normal",14);
    //Draw Rectangle
    drawRectangle(svgContainer,10,150,30,30,'rgb(59,153,89)');
    //Text
    drawText(svgContainer,60,162,"$1,319","600",14);
    //Text
    drawText(svgContainer,60,177,"TriNets's Contribution","normal",14);

    //Make an SVG Container for Circle
    var svgCircle = d3.select('svg.circle')
                    .attr("width",400)
                    .attr("heigth",200);

    //Draw Circle
    svgCircle.append('circle')
             .attr('cx',50)
             .attr('cy',90)
             .attr('r',20)
             .style("fill","rgb(114,199,107)")
    //Draw Boostrap Glyphicon inside circle
    svgCircle.append("svg:foreignObject")
             .attr("width", 20)
             .attr("height", 20)
             .attr("y", 82)
             .attr("x", 43)
             .append("xhtml:span")
	         .attr("class", "glyphicon glyphicon-arrow-up")
             .attr("style","color:white");
    drawText(svgCircle,85,105,"3.26",600,50);
    drawText(svgCircle,190,105,"%","normal",30)

}

function drawRectangle(svgContainer,x_axis,y_axis,width,height,color) {
     svgContainer.append('rect')
                .attr("x", x_axis)
                .attr("y", y_axis)
                .attr("width", width)
                .attr("height", height)
                .attr("fill",color);
}

function drawText(svgContainer,x_axis,y_axis,text,font_weight,size) {
    svgContainer.append("text")
                .attr("x",x_axis)
                .attr("y",y_axis)
                .style("font-weight", font_weight)
                .style("font-size",size)
                .text(text);
}
